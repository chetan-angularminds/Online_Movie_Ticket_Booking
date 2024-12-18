import { NgxToastPosition, NgxToastService } from '@angular-magic/ngx-toast';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../../core/services/httpService/http.service';
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-booking-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-details.component.html',
  styleUrl: './booking-details.component.scss',
})
export class BookingDetailsComponent {
  @ViewChild('ticketCard') ticketCard!: ElementRef;

  booking: Booking | null = null;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpService,
    private ngxToastService: NgxToastService
  ) {
    this.ngxToastService.setPosition(NgxToastPosition.TOP_CENTER);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.fetchBookingDetails(id);
    });
  }
  rowName(rowIndex: any): string {
    return String.fromCharCode(65 + rowIndex);
  }
  fetchBookingDetails(id: string): void {
    this.http.get<Booking>(`api/bookings/${id}`).subscribe({
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
          messages: ['Unable to fetch booking details!', `${error.message}`],
        });
      },
    });
  }

  downloadTicket(): void {
    try {
      const ticket = this.ticketCard.nativeElement;
      const options = {
        margin: 1, // Margin in mm
        filename: 'movie-ticket.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      };
      // Use html2pdf to generate the PDF
      html2pdf().set(options).from(ticket).save();
      this.ngxToastService.success({
        title: 'Success',
        messages: ['Ticket Download Started!'],
      });
    } catch (error: any) {
      this.ngxToastService.error({
        title: 'Failed',
        messages: ['Unable to Download ticket!',`${error.message}`],
      });
    }
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
