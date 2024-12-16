import { Component, OnInit } from '@angular/core';
import { MovieDetailsComponentComponent } from "../../../shared/reusableComponents/movie-details-component/movie-details-component.component";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie-details-user',
  standalone: true,
  imports: [MovieDetailsComponentComponent],
  templateUrl: './movie-details-user.component.html',
  styleUrl: './movie-details-user.component.scss'
})
export class MovieDetailsUserComponent implements OnInit {
  movieId: string = ''
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
       this.movieId = params['id'];
      
    });
  }
  bookTicket(){
    this.router.navigateByUrl(`book-ticket/${this.movieId}`)
  }
}
