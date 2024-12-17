import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgxToastPosition, NgxToastService } from '@angular-magic/ngx-toast';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {
  @Output() switchMode = new EventEmitter();
  router = inject(Router);
  title = 'CineTix';
  constructor(private ngxToastService: NgxToastService ){
    this.ngxToastService.setPosition(NgxToastPosition.TOP_CENTER);
  }
}
