import { Component } from '@angular/core';
import { Movie } from '../../../core/interfaces/movie.interface';
import { ActivatedRoute } from '@angular/router';

import { HttpService } from '../../../core/services/httpService/http.service';
import { CommonModule } from '@angular/common';
import { NgxToastPosition, NgxToastService } from '@angular-magic/ngx-toast';

@Component({
  selector: 'app-movie-details-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-details-component.component.html',
  styleUrl: './movie-details-component.component.scss'
})
export class MovieDetailsComponentComponent {
  movie: Movie | null = null;
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpService,
    private ngxToastService: NgxToastService
  ) { 
    this.ngxToastService.setPosition(NgxToastPosition.TOP_CENTER);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.fetchMovie(id);
    });
  }

  fetchMovie(id: string): void {
    this.loading = true;
    this.http.get(`api/movies/${id}`).subscribe(
      (data: any) => {
        this.movie = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching movie:', error);
        this.error = 'Failed to load movie details. Please try again later.';
        this.loading = false;
        this.ngxToastService.error({
          title: 'Failed',
          messages: ['Failed to load movie details!',`${error.message}`],
        });
      }
    );
  }
}
