import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MovieDetailsComponentComponent } from "../../../shared/reusableComponents/movie-details-component/movie-details-component.component";
import { ActivatedRoute, Router } from '@angular/router';
import { NgxToastPosition, NgxToastService } from '@angular-magic/ngx-toast';
import { FormArray, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpService } from '../../../core/services/httpService/http.service';

@Component({
  selector: 'app-movie-manage',
  standalone: true,
  imports: [MovieDetailsComponentComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './movie-manage.component.html',
  styleUrl: './movie-manage.component.scss'
})
export class MovieManageComponent implements OnInit {
  @ViewChild(MovieDetailsComponentComponent) movieDetailsComp!: MovieDetailsComponentComponent;
  router = inject(Router);
  movieId: any;
  movie: any;
  updateForm: any;
  showUpdateForm = false;

  constructor(
    private route: ActivatedRoute,
    private ngxToastService: NgxToastService,
    private http: HttpService,
    private fb: FormBuilder
  ) {
    this.ngxToastService.setPosition(NgxToastPosition.TOP_CENTER);
    this.updateForm = this.fb.group({
      title: [''],
      description: [''],
      duration: [''],
      releaseDate: [''],
      genre: this.fb.array([]),
      language: this.fb.array([]),
      poster: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.movieId = params['id'];
      this.fetchMovieDetails();
    });
  }

  addShows() {
    this.router.navigateByUrl(`admin/add-shows/${this.movieId}`);
  }

  viewShows() {
    this.router.navigateByUrl(`admin/movie-shows/${this.movieId}`)
  }

  fetchMovieDetails() {
    this.http.get(`api/movies/${this.movieId}`).subscribe(
      (response: any) => {
        this.movie = response;
        this.updateForm.patchValue({
          title: this.movie.title,
          description: this.movie.description,
          duration: this.movie.duration,
          releaseDate: this.movie.releaseDate.split('T')[0],
        });
        this.setGenres(this.movie.genre);
        this.setLanguages(this.movie.language);
      },
      (error) => {
        console.error('Error fetching movie details:', error);
        this.ngxToastService.error({
          title: 'Failed',
          messages: ['Failed to load movie details!', `${error.message}`],
        });
      }
    );
  }

  setGenres(genres: string[]) {
    const genreFormArray = this.updateForm.get('genre') as FormArray;
    genreFormArray.clear();
    genres.forEach(genre => {
      genreFormArray.push(this.fb.control(genre));
    });
  }

  setLanguages(languages: string[]) {
    const languageFormArray = this.updateForm.get('language') as FormArray;
    languageFormArray.clear();
    languages.forEach(language => {
      languageFormArray.push(this.fb.control(language));
    });
  }

  get genreControls() {
    return (this.updateForm.get('genre') as FormArray).controls;
  }

  get languageControls() {
    return (this.updateForm.get('language') as FormArray).controls;
  }

  addGenre() {
    const genre = this.updateForm.get('genre') as FormArray;
    genre.push(this.fb.control(''));
  }

  removeGenre(index: number) {
    const genre = this.updateForm.get('genre') as FormArray;
    genre.removeAt(index);
  }

  addLanguage() {
    const language = this.updateForm.get('language') as FormArray;
    language.push(this.fb.control(''));
  }

  removeLanguage(index: number) {
    const language = this.updateForm.get('language') as FormArray;
    language.removeAt(index);
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.updateForm.patchValue({
      poster: file
    });
  }

  updateMovie() {
    if (this.updateForm.valid) {
      const formData = new FormData();
      Object.keys(this.updateForm.controls).forEach(key => {
        const control = this.updateForm.get(key);
        if (control) {
          console.log("cntrols dirty");
          
          if (key === 'genre' || key === 'language') {
            formData.append(key, JSON.stringify(control.value));
          } else if (key === 'poster') {
            const file = control.value;
            if (file instanceof File) {
              formData.append('poster', file);
            }
          } else {
            formData.append(key, control.value);
          }
        }
      });
      console.log(formData);
      
      this.http.patchWithFormData(`api/movies/${this.movieId}`, formData).subscribe(
        (response) => {
          this.ngxToastService.success({
            title: 'Success',
            messages: ['Movie updated successfully'],
          });
          this.showUpdateForm = false;
          this.fetchMovieDetails();
          this.movieDetailsComp?.fetchMovie(this.movie._id)
        },
        (error) => {
          console.error('Error updating movie:', error);
          this.ngxToastService.error({
            title: 'Failed',
            messages: ['Failed to update movie', `${error.message}`],
          });
        }
      );
    } else {
      this.ngxToastService.error({
        title: 'Validation Error',
        messages: ['Please fill all required fields'],
      });
    }
  }

  deleteMovie() {
    if (confirm('Are you sure you want to delete this movie?')) {
      this.http.delete(`api/movies/${this.movieId}`).subscribe(
        (response) => {
          this.ngxToastService.success({
            title: 'Success',
            messages: ['Movie deleted successfully'],
          });
          this.router.navigateByUrl('/admin/movies');
        },
        (error) => {
          console.error('Error deleting movie:', error);
          this.ngxToastService.error({
            title: 'Failed',
            messages: ['Failed to delete movie', `${error.message}`],
          });
        }
      );
    }
  }

  toggleUpdateForm() {
    this.showUpdateForm = !this.showUpdateForm;
  }


}
