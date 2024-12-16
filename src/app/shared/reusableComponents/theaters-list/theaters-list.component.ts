import { Component, inject, Input, input } from '@angular/core';
import { HttpService } from '../../../core/services/httpService/http.service';
import { SelectCityFormComponent } from "../select-city-form/select-city-form.component";
import { CommonModule } from '@angular/common';
import { NgxToastPosition, NgxToastService } from '@angular-magic/ngx-toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-theaters-list',
  standalone: true,
  imports: [SelectCityFormComponent, CommonModule],
  templateUrl: './theaters-list.component.html',
  styleUrl: './theaters-list.component.scss'
})
export class TheatersListComponent {
  @Input() callFrom: string = 'user'
  selectedCity: string = '';
  theaters: Theater[] = [];
  loading: boolean = false;
  router= inject(Router)
  constructor(private httpService: HttpService, private ngxToastService: NgxToastService) {
    this.ngxToastService.setPosition(NgxToastPosition.TOP_CENTER);
  }

  ngOnInit(): void {}

  citySelector(city: string): void {
    this.selectedCity = city;
    this.fetchTheaters();
  }

  fetchTheaters(): void {
    this.loading = true;
    this.httpService.get<Theater[]>(`api/theaters/city/${this.selectedCity}`).subscribe({
      next: (data) => {
        this.theaters = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching theaters:', error);
        this.loading = false;
        this.ngxToastService.error({
          title: 'Failed',
          messages: ['Unable to fetch theaters!',`${error.message}`],
        });
      }
    });
  }
  navigator(theaterId: string){
    this.router.navigateByUrl(`/admin/manage-theater/${theaterId}`)
  }
}
interface Theater {
  _id: string;
  name: string;
  seatsCapacity: number;
  numberOfRows: number;
  seatsPerRow: number;
  address: string;
  city: string;
  showTimings: string[];
}
