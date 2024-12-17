import { Component, inject, OnInit, signal } from '@angular/core';
import { SelectCityFormComponent } from "../../../../shared/reusableComponents/select-city-form/select-city-form.component";
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxToastPosition, NgxToastService } from '@angular-magic/ngx-toast';
import { HttpService } from '../../../../core/services/httpService/http.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, SelectCityFormComponent, ReactiveFormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent implements OnInit{
  movieId: string = '';
  selectedCity: string = '';
  theaters: any[] = [];
  selectedTheater: any = null;
  selectedDate: string = '';
  selectedTime: string = '';
  seatLayout: any[][] = [];
  selectedSeats: any[] = [];
  selectedShow: any;
  dates: any[]=[];
  showTimes: any[]=[];
  userDetailsForm: FormGroup;
  showUserForm=  signal<boolean>(false);
  router = inject(Router);

  isLoadingTheatres = false;
  isLoadingDates = false;
  isLoadingTimings = false;
  isLoadingSeatsLayout = false;
  constructor(
    private route: ActivatedRoute,
    private http: HttpService,
    private fb: FormBuilder,
    private ngxToastService: NgxToastService
  ) {
    this.userDetailsForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });

    this.ngxToastService.setPosition(NgxToastPosition.TOP_CENTER);
  }

  ngOnInit() {
    this.movieId = this.route.snapshot.paramMap.get('id') || '';
    console.log(this.movieId);
    
  }

  onCitySelected(city: string) {
    this.selectedCity = city;
    console.log(this.selectedCity);
    
    this.loadTheaters();
  }

  loadTheaters() {
    this.isLoadingTheatres = true;
    this.http.get<any[]>(`api/shows/all/movie/${this.movieId}`).subscribe(
      (shows) => {

        console.log(shows);
        

        this.theaters = shows[0].theaters.filter((theater: any) => theater?.city == this.selectedCity)
          console.log(this.theaters);
          this.isLoadingTheatres = false;
      },
      (error) => {console.error('Error loading theaters:', error)
        this.ngxToastService.error({
          title: 'Failed',
          messages: ['Unable to fetch theaters!',`${error.message}`],
        });
      }
    );
  }

  selectTheater(theater: any) {
    this.selectedTheater = theater;
    this.loadDates();
  }

  loadDates() {
    this.isLoadingDates = true;
    this.http.get<any>(`api/shows/all/movie/${this.movieId}`).subscribe(
      (bulkShow) => {
        console.log(bulkShow);
        
        const startDate = new Date(bulkShow[0].startDate);
        const endDate = new Date(bulkShow[0].endDate);
        const dates = [];
        for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
          dates.push(new Date(d));
          console.log(d);
          
        }
        this.dates = dates;
        this.isLoadingDates= false;
      },
      (error) => {console.error('Error loading dates:', error)
        this.ngxToastService.error({
          title: 'Failed',
          messages: ['Unable to fetch dates!',`${error.message}`],
        });
      }
    );
  }

  selectDate(date: string) {
    this.selectedDate = date;
    this.loadShowTimes();
  }

  loadShowTimes() {
    this.isLoadingTimings = true;
    console.log(this.selectTheater);
    
    this.http.get<any[]>(`api/shows/movie/${this.movieId}/date/${this.selectedDate}/theater/${this.selectedTheater._id}`).subscribe(
      (shows) => {
        console.log(shows);
        
        this.showTimes = shows;
        this.isLoadingTimings = false;
      },
      (error) => {console.error('Error loading show times:', error)
        this.ngxToastService.error({
          title: 'Failed',
          messages: ['Unable to fetch Shows!',`${error.message}`],
        });
      }
    );
   
  }

  selectTime(time: string) {
    this.selectedTime = time;
    this.loadSeatLayout();
  }

  loadSeatLayout() {
    this.isLoadingSeatsLayout = true;
    this.http.get<any>(`api/shows/${this.selectedTime}`).subscribe(
      (show) => {
        console.log(show);
        this.selectedShow = show
        const rows = show.theater.numberOfRows;
        const seatsPerRow = show.theater.seatsPerRow;
        this.seatLayout = Array(rows).fill(null).map((_, rowIndex) =>
          Array(seatsPerRow).fill(null).map((_, seatIndex) => ({
            row: rowIndex + 1,
            seat: seatIndex + 1,
            isBooked: show.bookedSeats.some((bookedSeat: any) => 
              bookedSeat.row === rowIndex + 1 && bookedSeat.seatNumber === seatIndex + 1
            ),
            isSelected: false
          }))
        );
        this.isLoadingSeatsLayout = false;
      },
      (error) => {console.error('Error loading seat layout:', error)
        this.ngxToastService.error({
          title: 'Failed',
          messages: ['Unable to fetch seats data!',`${error.message}`],
        });
      }
    );
  }

  toggleSeat(row: number, seat: number) {
    if (!this.seatLayout[row][seat].isBooked) {
      this.seatLayout[row][seat].isSelected = !this.seatLayout[row][seat].isSelected;
      const seatInfo = { row: row + 1, seatNumber: seat + 1 };
      
      if (this.seatLayout[row][seat].isSelected) {
        this.selectedSeats.push(seatInfo);
      } else {
        this.selectedSeats = this.selectedSeats.filter(s => !(s.row === seatInfo.row && s.seatNumber === seatInfo.seatNumber));
      }
    }
  }
  rowName(rowIndex: any): string{
    return String.fromCharCode(65 + rowIndex)
  }
  showUserDetailsForm() {
    this.showUserForm.set(true);
  }
  bookTickets() {
    console.log(this.userDetailsForm.value);
    
    if (this.userDetailsForm.valid) {
      const bookingData = {
        showId: this.selectedShow._id,
        seats: this.selectedSeats,
        totalPrice: this.selectedSeats.length * this.selectedShow.seatPrice,
        ...this.userDetailsForm.value
      };
      console.log(bookingData);
      
      this.http.post('api/bookings', bookingData).subscribe(
        (response: any) => {
          console.log('Booking successful:', response);
          
          this.router.navigateByUrl(`booking-details/${response._id}`)
        },
        (error) => {
          console.error('Booking failed:', error);
          
          this.ngxToastService.error({
            title: 'Failed',
            messages: ['Seat Booking Failed!',`${error.message}`],
          });
        }
      );
    }
  }


}

