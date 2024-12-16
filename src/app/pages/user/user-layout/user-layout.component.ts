import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.scss'
})
export class UserLayoutComponent {
  @Output() switchMode  = new EventEmitter();
  router = inject(Router);
  title = 'CineTix';
}
