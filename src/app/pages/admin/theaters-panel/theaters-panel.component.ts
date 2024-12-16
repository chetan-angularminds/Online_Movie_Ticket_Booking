import { Component, inject } from '@angular/core';
import { TheatersListComponent } from "../../../shared/reusableComponents/theaters-list/theaters-list.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-theaters-panel',
  standalone: true,
  imports: [TheatersListComponent],
  templateUrl: './theaters-panel.component.html',
  styleUrl: './theaters-panel.component.scss'
})
export class TheatersPanelComponent {
 router = inject(Router)
}
