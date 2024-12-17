import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../../core/services/httpService/http.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-individual-shows',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './individual-shows.component.html',
  styleUrl: './individual-shows.component.scss'
})
export class IndividualShowsComponent {
  showId!: string;
  theaterId!: string;
  bulkShow!: BulkShow;
  availableDates: Date[] = [];
  selectedDate!: Date|null;
  individualShows: IndividualShow[] = [];
  selectedShow!: IndividualShow|null;

  isLoadingBulkShow: boolean = false;
  isLoadingIndividualShows: boolean = false;
  isLoadingShowDetails: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpService: HttpService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.showId = params['showId'];
      this.theaterId = params['theaterId'];
      console.log("loaded");
      
      this.fetchBulkShow();
    });
  }

  fetchBulkShow() {
    this.isLoadingBulkShow = true;
    this.httpService.get<BulkShow>(`api/shows/bulk/${this.showId}`).subscribe(
      (data) => {
        this.bulkShow = data;
        console.log(data);
        
        this.generateAvailableDates();
        this.isLoadingBulkShow = false;
      },
      (error) => {
        console.error('Error fetching bulk show:', error);
        this.isLoadingBulkShow = false;
      }
    );
  }

  generateAvailableDates() {
    const start = new Date(this.bulkShow.startDate);
    const end = new Date(this.bulkShow.endDate);
    for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
      this.availableDates.push(new Date(d));
    }
  }

  onDateSelect(date: Date) {
    this.selectedDate = date;
    this.fetchIndividualShows();
  }

  fetchIndividualShows() {
    this.isLoadingIndividualShows = true;
    const formattedDate = this.selectedDate?.toISOString().split('T')[0];
    this.httpService.get<IndividualShow[]>(`api/shows/movie/${this.bulkShow.movie._id}/date/${formattedDate}/theater/${this.theaterId}`).subscribe(
      (data) => {
        this.individualShows = data;
        this.isLoadingIndividualShows = false;
      },
      (error) => {
        console.error('Error fetching individual shows:', error);
        this.isLoadingIndividualShows = false;
      }
    );
  }

  onShowSelect(show: IndividualShow) {
    this.isLoadingShowDetails = true;
    this.httpService.get<IndividualShow>(`api/shows/${show._id}`).subscribe(
      (data) => {
        this.selectedShow = data;
        this.isLoadingShowDetails = false;
      },
      (error) => {
        console.error('Error fetching show details:', error);
        this.isLoadingShowDetails = false;
      }
    );
  }

  isSeatBooked(row: number, seatNumber: number): boolean| undefined {
    return this.selectedShow?.bookedSeats.some(
      seat => seat.row === row && seat.seatNumber === seatNumber
    );
  }
  rowString(i:any){
    return String.fromCharCode(65 + i)
  }
  goBack() {
    if (this.selectedShow) {
      this.selectedShow = null;
    } else if (this.individualShows.length) {
      this.individualShows = [];
      this.selectedDate = null;
    } else {
      this.router.navigate(['/shows']);
    }
  }

}
interface BulkShow {
  _id: string;
  movie: any;
  theaters: string[];
  seatPrice: number;
  startDate: Date;
  endDate: Date;
}

interface IndividualShow {
  _id: string;
  movie: any;
  theater: any;
  seatPrice: number;
  showTime: string[];
  date: Date;
  availableSeats: number;
  bookedSeats: { row: number; seatNumber: number }[];
}
