import { Component, OnInit } from '@angular/core';
import { SelectCityFormComponent } from '../../../shared/reusableComponents/select-city-form/select-city-form.component';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpService } from '../../../core/services/httpService/http.service';
import { NgxToastPosition, NgxToastService } from '@angular-magic/ngx-toast';
import { Router } from '@angular/router';
@Component({
  selector: 'app-new-theater-registration',
  standalone: true,
  imports: [SelectCityFormComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './new-theater-registration.component.html',
  styleUrl: './new-theater-registration.component.scss',
})
export class NewTheaterRegistrationComponent implements OnInit {
  selectedCity = '';
  citySelector(city: string) {
    this.selectedCity = city;
  }
  theaterForm: any;

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private ngxToastService: NgxToastService,
    private router: Router
  ) {
    this.ngxToastService.setPosition(NgxToastPosition.TOP_CENTER);
  }

  ngOnInit() {
    this.theaterForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      numberOfRows: ['', [Validators.required, Validators.min(1)]],
      seatsPerRow: ['', [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit() {
    if (this.theaterForm.valid) {
      console.log(this.theaterForm.value);
      // Here you would typically send the form data to a service
      const data = { ...this.theaterForm.value, city: this.selectedCity };
      this.http.post('api/theaters', data).subscribe(
        (data) => {
          this.ngxToastService.success({
            title: 'Success',
            messages: ['New Theater Registered Successfully!'],
          });
          this.router.navigateByUrl('/admin/theaters')
        },
        (error) => {
          console.log(error);
          
          this.ngxToastService.error({
            title: 'Failed',
            messages: ['New Theater Registration Failed!',`${error.message}`],
          });
        }
      );
    } else {
      this.markFormGroupTouched(this.theaterForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
