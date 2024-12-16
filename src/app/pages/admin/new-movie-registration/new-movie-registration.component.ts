import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpService } from '../../../core/services/httpService/http.service';
import { NgxToastPosition, NgxToastService } from '@angular-magic/ngx-toast';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-new-movie-registration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-movie-registration.component.html',
  styleUrls: ['./new-movie-registration.component.scss'],
})
export class NewMovieRegistrationComponent {
  movieForm: any;

  constructor(private fb: FormBuilder, private http: HttpService,private ngxToastService: NgxToastService) {
    this.ngxToastService.setPosition(NgxToastPosition.TOP_CENTER);
  }

  ngOnInit() {
    this.movieForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(1)]],
      releaseDate: ['', Validators.required],
      genre: this.fb.array([this.fb.control('', Validators.required)]),
      language: this.fb.array([this.fb.control('', Validators.required)]),
      poster: ['', Validators.required]
    });
  }

  get genreControls() {
    return (this.movieForm.get('genre') as FormArray).controls;
  }

  get languageControls() {
    return (this.movieForm.get('language') as FormArray).controls;
  }

  addGenre() {
    const genre = this.movieForm.get('genre') as FormArray;
    genre.push(this.fb.control('', Validators.required));
  }

  removeGenre(index: number) {
    const genre = this.movieForm.get('genre') as FormArray;
    genre.removeAt(index);
  }

  addLanguage() {
    const language = this.movieForm.get('language') as FormArray;
    language.push(this.fb.control('', Validators.required));
  }

  removeLanguage(index: number) {
    const language = this.movieForm.get('language') as FormArray;
    language.removeAt(index);
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.movieForm.patchValue({
      poster: file
    });
  }

  onSubmit() {
    if (this.movieForm.valid) {
      const formData = new FormData();
      Object.keys(this.movieForm.value).forEach(key => {
        if (key === 'genre' || key === 'language') {
          formData.append(key, JSON.stringify(this.movieForm.value[key]));
        } else if (key === 'poster') {
          const file = this.movieForm.get('poster')?.value;
          if (file) {
            formData.append('poster', file, file.name);
          }
        } else {
          formData.append(key, this.movieForm.value[key]);
        }
      });

      this.http.post('api/movies', formData)
        .subscribe(
          (response) => {
            console.log('Movie added successfully', response);
            this.movieForm.reset();
            this.ngxToastService.success({
              title: 'Success',
              messages: ['New Movie Registered Successfully!'],
            });
          },
          (error) => {
            console.error('Error adding movie', error);
            // Handle error (e.g., show error message to user)
            this.ngxToastService.error({
              title: 'Failed',
              messages: ['New Movie Registration Failed!',`${error.message}`],
            });
          }
        );
    }
  }
}
