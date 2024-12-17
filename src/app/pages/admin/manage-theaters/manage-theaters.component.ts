import { NgxToastPosition, NgxToastService } from '@angular-magic/ngx-toast';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../../core/services/httpService/http.service';

@Component({
  selector: 'app-manage-theaters',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manage-theaters.component.html',
  styleUrl: './manage-theaters.component.scss'
})
export class ManageTheatersComponent {
  theaterId!: string|null;
  theater!: Theater;
  updateForm: any;
  isEditing = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpService,
    private fb: FormBuilder,
    private router: Router,
    private ngxToastService: NgxToastService
  ) {
    this.ngxToastService.setPosition(NgxToastPosition.TOP_CENTER);
  }

  ngOnInit() {
    this.theaterId = this.route.snapshot.paramMap.get('id');
    this.fetchTheaterDetails();
    this.initForm();
  }

  fetchTheaterDetails() {
    this.http.get<Theater>(`api/theaters/${this.theaterId}`).subscribe(
      (data) => {
        this.theater = data;
        this.updateForm.patchValue(this.theater);
      },
      (error) => {console.error('Error fetching theater details:', error)
        this.ngxToastService.error({
          title: 'Failed',
          messages: ['Failed to load theater details!',`${error.message}`],
        });
      }
    );
  }

  initForm() {
    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      numberOfRows: ['', [Validators.required, Validators.min(1)]],
      seatsPerRow: ['', [Validators.required, Validators.min(1)]],
      address: ['', Validators.required]
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.updateForm.patchValue(this.theater);
    }
  }

  updateTheater() {
    if (this.updateForm.valid) {
      const updatedTheater = this.updateForm.value;
      const theaterData = { seatsCapacity: updatedTheater.numberOfRows * updatedTheater.seatsPerRow, ...updatedTheater}
      this.http.patchWithFormData(`api/theaters/${this.theaterId}`, theaterData).subscribe(
        (response) => {
          console.log('Theater updated successfully');
          this.fetchTheaterDetails();
          this.isEditing = false;
          this.ngxToastService.success({
            title: 'Success',
            messages: ['Theater Details updated succeessfully!'],
          });
        },
        (error) => {console.error('Error updating theater:', error)
          this.ngxToastService.error({
            title: 'Failed',
            messages: ['Failed to update details!',`${error.message}`],
          });
        }
      );
    }
  }

  deleteTheater() {
    if (confirm('Are you sure you want to delete this theater?')) {
      this.http.delete(`api/theaters/${this.theaterId}`).subscribe(
        (response) => {
          console.log('Theater deleted successfully');
          this.router.navigate(['/admin/theaters']); 
        },
        (error) => console.error('Error deleting theater:', error)
      );
    }
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
