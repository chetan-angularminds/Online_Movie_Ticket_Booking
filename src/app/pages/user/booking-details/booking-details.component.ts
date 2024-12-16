import { NgxToastPosition, NgxToastService } from '@angular-magic/ngx-toast';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-details.component.html',
  styleUrl: './booking-details.component.scss'
})
export class BookingDetailsComponent {
  booking: Booking | null = null;
  loading = true;
  error = '';
  rowName(rowIndex: any): string{
    return String.fromCharCode(65 + rowIndex)
  }
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private ngxToastService: NgxToastService
  ) { this.ngxToastService.setPosition(NgxToastPosition.TOP_CENTER);}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.fetchBookingDetails(id);
    });
  }

  fetchBookingDetails(id: string): void {
    this.http.get<Booking>(`http://localhost:3000/api/bookings/${id}`)
      .subscribe({
        next: (data) => {
          this.booking = data;
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Failed to load booking details. Please try again.';
          this.loading = false;
          console.error('Error fetching booking details:', error);
          this.ngxToastService.error({
            title: 'Failed',
            messages: ['Unable to fetch booking details!',`${error.message}`],
          });
        }
      });
  }

}
interface Seat {
  row: number;
  seatNumber: number;
}

interface Show {
  _id: string;
  title: string;
  // Add other show properties as needed
}

interface Booking {
  _id: string;
  show: Show;
  seats: Seat[];
  totalPrice: number;
  bookingDate: Date;
  email: string;
  name: string;
  phoneNumber: string;
}
