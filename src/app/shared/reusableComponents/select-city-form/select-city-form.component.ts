import { Component, EventEmitter, Output } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { NgxToastPosition, NgxToastService } from '@angular-magic/ngx-toast';
import { HttpService } from '../../../core/services/httpService/http.service';

@Component({
  selector: 'app-select-city-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './select-city-form.component.html',
  styleUrl: './select-city-form.component.scss'
})
export class SelectCityFormComponent {
  @Output() citySelected = new EventEmitter();
  selectedCity:string = '';
  allCities: any;
  citySelector(){
    console.log(this.selectedCity);
    
    if(this.selectedCity){
      this.citySelected.emit(this.selectedCity);
    }
  }

  constructor(private ngxToastService: NgxToastService, private http: HttpService){
    this.ngxToastService.setPosition(NgxToastPosition.TOP_CENTER);
    http.get('api/cities').subscribe(
      (data: any) => {
        this.allCities = data;
        console.log(this.allCities);
        

      },
      (error: any) => {
        this.ngxToastService.warning({title: 'Failed', messages: ['Unable to get cities data!']})
      }
    )
  }
}
