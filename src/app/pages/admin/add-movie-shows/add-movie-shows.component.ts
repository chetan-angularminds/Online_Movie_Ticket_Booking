import { Component } from '@angular/core';
import { Movie, Show, Theater } from '../../../core/interfaces/movie.interface';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../../core/services/httpService/http.service';
import { NgxToastPosition, NgxToastService } from '@angular-magic/ngx-toast';

@Component({
  selector: 'app-add-movie-shows',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-movie-shows.component.html',
  styleUrl: './add-movie-shows.component.scss'
})
export class AddMovieShowsComponent {
  movieId: any;
  movie: any;
  cities: any[] = [];
  theaters: any[] = [];
  showForm: any;
  selectedTheaters: any[] = [];

  isLoadingMovie = false;
  isLoadingCities = false;
  isLoadingTheaters = false;
  isSubmitting = false;

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
    private fb: FormBuilder,
    private ngxToastService: NgxToastService
  ) {
    this.showForm = this.fb.group({
      movie: ['', Validators.required],
      city: ['', Validators.required],
      seatPrice: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
    this.ngxToastService.setPosition(NgxToastPosition.TOP_CENTER);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.movieId = params['id'];
      this.fetchMovieData();
    });

    this.fetchCities();
  }

  fetchMovieData() {
    this.isLoadingMovie = true;
    this.httpService.get<any>(`api/movies/${this.movieId}`).subscribe(
      (data) => {
        this.movie = data;
        this.showForm.patchValue({ movie: this.movie._id });
        this.isLoadingMovie = false;

      },
      (error) => {
        console.error('Error fetching movie data:', error);
        this.isLoadingMovie = false;
        this.showError('Failed to load movie data');
        this.ngxToastService.error({
          title: 'Failed',
          messages: ['Unable to fetch Movie Data!',`${error.message}`],
        });
      }
    );
  }

  fetchCities() {
    this.isLoadingCities = true;
    this.httpService.get<string[]>('api/cities').subscribe(
      (data) => {
        this.cities = data;
        this.isLoadingCities = false;
      },
      (error) => {
        console.error('Error fetching cities:', error);
        this.isLoadingCities = false;
        this.showError('Failed to load cities');
        this.ngxToastService.error({
          title: 'Failed',
          messages: ['Unable to fetch cities data!',`${error.message}`],
        });
      }
    );
  }

  onCityChange(event: any) {
    this.isLoadingTheaters = true;
    this.theaters = [];
    this.httpService.get<any[]>(`api/theaters/city/${event.target.value}`).subscribe(
      (data) => {
        this.theaters = data;
        this.isLoadingTheaters = false;
      },
      (error) => {
        console.error('Error fetching theaters:', error);
        this.isLoadingTheaters = false;
        this.showError('Failed to load theaters');
        this.ngxToastService.error({
          title: 'Failed',
          messages: ['Unable to fetch theaters!',`${error.message}`],
        });
      }
    );
  }

  onSubmit() {
    if (this.showForm.valid && this.selectedTheaters.length > 0) {
      this.isSubmitting = true;
      const formData = {
        ...this.showForm.value,
        theaters: this.selectedTheaters
      };
      this.httpService.post<any>('api/shows/bulk', formData).subscribe(
        (response) => {
          console.log('Shows created successfully:', response);
          this.isSubmitting = false;
          this.showSuccess('Shows created successfully');
          // Handle success (e.g., navigate to a different page)
          this.ngxToastService.success({
            title: 'Success',
            messages: ['Shows created successfully!'],
          });
        },
        (error) => {
          console.error('Error creating shows:', error);
          this.isSubmitting = false;
          this.showError('Failed to create shows');
          this.ngxToastService.error({
            title: 'Failed',
            messages: ['Show Creation Failed!',`${error.message}`],
          });
        }
      );
    }
  }

  toggleTheater(theaterId: string) {
    const index = this.selectedTheaters.indexOf(theaterId);
    if (index > -1) {
      this.selectedTheaters.splice(index, 1);
    } else {
      this.selectedTheaters.push(theaterId);
    }
  }

  showSuccess(message: string) {
    // Implement a success message display method (e.g., using a Bootstrap alert)
    console.log('Success:', message);
  }

  showError(message: string) {
    // Implement an error message display method (e.g., using a Bootstrap alert)
    console.error('Error:', message);
  }



}
