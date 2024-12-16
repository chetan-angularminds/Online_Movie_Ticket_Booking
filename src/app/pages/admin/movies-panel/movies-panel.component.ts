import { Component, inject } from '@angular/core';
import { MoviesListComponentComponent } from "../../../shared/reusableComponents/movies-list-component/movies-list-component.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies-panel',
  standalone: true,
  imports: [MoviesListComponentComponent],
  templateUrl: './movies-panel.component.html',
  styleUrl: './movies-panel.component.scss'
})
export class MoviesPanelComponent {
  router = inject(Router)
}
