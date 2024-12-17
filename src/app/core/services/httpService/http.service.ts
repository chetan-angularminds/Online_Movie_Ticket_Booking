import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private API_HOST_URL = 'https://movie-ticket-booking-backend-mjx1.onrender.com';
  constructor(private http: HttpClient) {}
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage: string;

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = error.error.message;
    }

    // Log the error (optional)
    console.error('Error occurred:', errorMessage);
    console.log(error);
    
    // Return the error message to the caller
    return throwError(() => new Error(errorMessage));
  }
  get<T>(endpoint: string): Observable<T> {
    return this.http
      .get<T>(`${this.API_HOST_URL}/${endpoint}`)
      .pipe(catchError(this.handleError));
  }
  GetWithQueryParams<T>(
    endpoint: string,
    params: any
  ): Observable<T> {
    return this.http
      .get<T>(`${this.API_HOST_URL}/${endpoint}`, { params })
      .pipe(catchError(this.handleError));
  }

  post<T>(endpoint: string, data: any): Observable<T> {
    console.log(endpoint, data, );
    let httpParams = new HttpParams();
    return this.http
      .post<T>(`${this.API_HOST_URL}/${endpoint}`, data)
      .pipe(catchError(this.handleError));
  }

 
  securePostWithFormData<T>(endpoint: string, data: FormData): Observable<T> {
    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    });
    return this.http
      .post<T>(`${this.API_HOST_URL}/${endpoint}`, data, { headers })
      .pipe(catchError(this.handleError));
  }
  patchWithFormData<T>(endpoint: string, data: FormData): Observable<T> {
    return this.http
      .patch<T>(`${this.API_HOST_URL}/${endpoint}`, data)
      .pipe(catchError(this.handleError));
  }
  
  delete<T>(endpoint: string): Observable<T> {
    return this.http
      .delete<T>(`${this.API_HOST_URL}/${endpoint}`)
      .pipe(catchError(this.handleError));
  }
}


