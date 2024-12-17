import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../../../pages/user/my-bookings/my-bookings.component';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'https://movie-ticket-booking-backend-mjx1.onrender.com/api';

  constructor(private http: HttpClient) {}

  getTheaters(movieId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/shows/movie/${movieId}`);
  }

  getShowTimings(movieId: string, theaterId: string, date: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/shows/movie/${movieId}/date/${date}/theater/${theaterId}`);
  }

  getSeatLayout(showId: string): Observable<any[][]> {
    return this.http.get<any[][]>(`${this.apiUrl}/shows/${showId}`);
  }

  bookTicket(bookingData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/bookings`, bookingData);
  }
  searchBookings(email: string): Observable<Booking[]> {
    return this.http.post<Booking[]>(`${this.apiUrl}/bookings/booking/email`, { email });
  }

}

