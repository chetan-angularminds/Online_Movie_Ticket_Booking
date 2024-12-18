import { NgxToastPosition, NgxToastService } from '@angular-magic/ngx-toast';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../../core/services/httpService/http.service';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-booking-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-details.component.html',
  styleUrl: './booking-details.component.scss'
})
export class BookingDetailsComponent {
  @ViewChild('ticketCard') ticketCard!: ElementRef;
  
  booking: Booking | null = null;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.fetchBookingDetails(id);
    });
  }
  rowName(rowIndex: any): string{
    return String.fromCharCode(65 + rowIndex)
  }
  fetchBookingDetails(id: string): void {
    this.http.get<Booking>(`api/bookings/${id}`)
      .subscribe({
        next: (data) => {
          this.booking = data;
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Failed to load booking details. Please try again.';
          this.loading = false;
          console.error('Error fetching booking details:', error);
        }
      });
  }

  downloadTicket(): void {
    const ticket = this.ticketCard.nativeElement;
    html2canvas(ticket, {
      allowTaint: true,
      useCORS: true,
      scale: 2
    }).then((canvas) => {
      canvas.toBlob((blob) => {
        if (blob) {
          saveAs(blob, 'movie-ticket.png');
        }
      });
    });
  }


}
interface Movie {
  _id: string;
  title: string;
  description: string;
  duration: number;
  releaseDate: string;
  genre: string[];
  language: string[];
  poster: string;
}

interface Theater {
  _id: string;
  name: string;
  seatsCapacity: number;
  numberOfRows: number;
  seatsPerRow: number;
  address: string;
  city: string;
  showTimings: string[];
}

interface Show {
  _id: string;
  movie: Movie;
  theater: Theater;
  showTime: string[];
  date: string;
}

interface Seat {
  row: number;
  seatNumber: number;
  _id: string;
}

interface Booking {
  _id: string;
  show: Show;
  seats: Seat[];
  totalPrice: number;
  email: string;
  name: string;
  phoneNumber: string;
  bookingDate: string;
}

