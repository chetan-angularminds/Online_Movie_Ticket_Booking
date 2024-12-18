import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookingService } from '../../../core/services/bookingService/booking.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { NgxToastPosition, NgxToastService } from '@angular-magic/ngx-toast';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DatePipe],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.scss'
})
export class MyBookingsComponent {
  searchForm: any;
  bookings: Booking[] = [];
  isLoading = false;
  error: string | null = null;
  router= inject(Router)
  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private ngxToastService: NgxToastService
  ) {
    this.searchForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
    this.ngxToastService.setPosition(NgxToastPosition.TOP_CENTER);
  }
  rowName(rowIndex: any): string{
    return String.fromCharCode(65 + rowIndex)
  }
  onSubmit() {
    if (this.searchForm.valid) {
      this.isLoading = true;
      this.error = null;
      this.bookingService.searchBookings(this.searchForm.value.email)
        .subscribe(
          (data) => {
            this.bookings = data;
            console.log(data);
            
            this.isLoading = false;
          },
          (error) => {
            this.error = 'An error occurred while fetching bookings. Please try again.';
            this.isLoading = false;
            this.ngxToastService.error({
              title: 'Failed',
              messages: ['Unable to fetch bookings!',`${error.message}`],
            });
          }
        );
    }
  }
  navigate(bookingId: string){
    this.router.navigateByUrl(`booking-details/${bookingId}`)
  }

}
export interface Booking {
  _id: string;
  show: any;
  seats: Array<{ row: number; seatNumber: number }>;
  totalPrice: number;
  bookingDate: Date;
  email: string;
  name: string;
  phoneNumber: string;
}

