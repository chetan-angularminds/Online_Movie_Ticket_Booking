import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../../core/services/httpService/http.service';
import { CommonModule } from '@angular/common';
import { NgxToastService } from '@angular-magic/ngx-toast';

@Component({
  selector: 'app-movie-shows-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-shows-list.component.html',
  styleUrl: './movie-shows-list.component.scss'
})
export class MovieShowsListComponent {
  shows: Show[] = [];
  movieId: string = '';
  router = inject(Router)
  loading = false;
  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
    private ngxToastService: NgxToastService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.movieId = params['id'];
      this.loadShows();
    });
  }

  loadShows(): void {
    this.loading = true;
    this.httpService.get(`api/shows/bulk/movie/${this.movieId}`).subscribe({
      next: (data: any) => {
        this.shows = data;
        console.log(data);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching shows:', error);
        this.ngxToastService.error({
          title: 'Failed',
          messages: ['Failed to load movie shows!',`${error.message}`],
        });
      }
    });
  }
  navigator(id: string){
    this.router.navigateByUrl(`/admin/manage-show/${id}`);
  }
}
export interface Show {
  _id: string;
  movie: {
    _id: string;
    title: string;
  };
  theaters:  any[];
  seatPrice: number;
  startDate: Date;
  endDate: Date;
}