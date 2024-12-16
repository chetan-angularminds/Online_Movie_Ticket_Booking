import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { UserLayoutComponent } from "./pages/user/user-layout/user-layout.component";
import { AdminLayoutComponent } from "./pages/admin/admin-layout/admin-layout.component";
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { NgxToastModule } from "@angular-magic/ngx-toast";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, UserLayoutComponent, AdminLayoutComponent, NgxToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'onlineMovieTicketBookingApp';
  mode = 'user';
  routerSubscription: any;
  currentRoute: any;
  modeSwitcher(newMode: string){
    this.mode = newMode;
  }
  ngOnInit() {
    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkRoute();
      });

  }
  private checkRoute() {
    this.currentRoute = this.router.url;
    console.log(this.currentRoute);
    if(this.currentRoute.includes('admin')){
      this.modeSwitcher('admin');
    } else{
      this.modeSwitcher('user');
    }
  }
  constructor(private route: ActivatedRoute, private router: Router){

  }
}
