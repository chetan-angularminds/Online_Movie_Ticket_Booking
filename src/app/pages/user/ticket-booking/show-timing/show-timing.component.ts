import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookingService } from '../../../../core/services/bookingService/booking.service';

@Component({
  selector: 'app-show-timing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-timing.component.html',
  styleUrl: './show-timing.component.scss'
})
export class ShowTimingComponent {
  @Input() movieId!: string;
  @Input() theaterId!: string;
  @Input() date!: string;
  @Output() timeSelected = new EventEmitter<string>();

  showTimings: string[] = [];

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.bookingService.getShowTimings(this.movieId, this.theaterId, this.date).subscribe(
      (timings) => {
        this.showTimings = timings;
      },
      (error) => {
        console.error('Error fetching show timings:', error);
      }
    );
  }

  onTimeSelect(time: string) {
    this.timeSelected.emit(time);
  }
}
