import { Component, inject, Input, OnInit } from '@angular/core';
import { HttpService } from '../../../core/services/httpService/http.service';
import { Movie } from '../../../core/interfaces/movie.interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxToastPosition, NgxToastService } from '@angular-magic/ngx-toast';

@Component({
  selector: 'app-movies-list-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './movies-list-component.component.html',
  styleUrl: './movies-list-component.component.scss'
})
export class MoviesListComponentComponent implements OnInit {
  @Input() callFrom: string = 'user';
  movies: Movie[] = [];
  router = inject(Router);
  loading = false
  // Pagination
  currentPage: number = 1;
  totalPages: number = 1;
  limit: number = 4;

  // Sorting
  sortBy: string = 'title';
  sortOrder: 'asc' | 'desc' = 'asc';

  // Search
  searchQuery: string = '';

  constructor(private http: HttpService, private ngxToastService: NgxToastService) {
    this.ngxToastService.setPosition(NgxToastPosition.TOP_CENTER);
  }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.loading = true;
    const params = {
      page: this.currentPage,
      limit: this.limit,
      sortBy: this.sortBy,
      sortOrder: this.sortOrder,
      search: this.searchQuery
    };

    this.http.GetWithQueryParams('api/movies', params ).subscribe(
      (data: any) => {
        this.movies = data.movies;
        this.totalPages = data.totalPages;
        this.currentPage = data.currentPage;
        console.log(data);
        this.loading = false;
        
      },
      (error) => {
        console.error('Error fetching movies:', error);
        this.ngxToastService.error({
          title: 'Failed',
          messages: ['Unable to fetch movies!',`${error.message}`],
        });
      }
    );
  }

  movieDetails(movie: Movie): void {
    this.router.navigate([this.callFrom === 'admin' ? `admin/movie-details/${movie._id}` : `/movie-details/${movie._id}`]);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadMovies();
  }

  onSortChange(sortBy: string): void {
    if (this.sortBy === sortBy) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = sortBy;
      this.sortOrder = 'asc';
    }
    this.loadMovies();
  }

  onSearch(): void {
    this.currentPage = 1;
    this.loadMovies();
  }
}

