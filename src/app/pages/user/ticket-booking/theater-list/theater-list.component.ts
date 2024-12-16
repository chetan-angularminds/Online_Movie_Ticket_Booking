import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookingService } from '../../../../core/services/bookingService/booking.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-theater-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theater-list.component.html',
  styleUrl: './theater-list.component.scss'
})
export class TheaterListComponent {
  @Input() movieId!: string;
  @Input() selectedCity!: string;
  @Output() theaterSelected = new EventEmitter<any>();

  theaters: any[] = [];

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.bookingService.getTheaters(this.movieId).subscribe(
      (theaters) => {
        this.theaters = theaters;
      },
      (error) => {
        console.error('Error fetching theaters:', error);
      }
    );
  }

  onTheaterSelect(theater: any) {
    this.theaterSelected.emit(theater);
  }
}
