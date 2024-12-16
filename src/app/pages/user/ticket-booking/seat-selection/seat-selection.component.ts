import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookingService } from '../../../../core/services/bookingService/booking.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seat-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seat-selection.component.html',
  styleUrl: './seat-selection.component.scss'
})
export class SeatSelectionComponent {
  @Input() showId!: string;
  @Output() seatsSelected = new EventEmitter<any[]>();

  seatLayout: any[][] = [];
  selectedSeats: any[] = [];

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.bookingService.getSeatLayout(this.showId).subscribe(
      (layout) => {
        this.seatLayout = layout;
      },
      (error) => {
        console.error('Error fetching seat layout:', error);
      }
    );
  }

  toggleSeat(row: number, seat: number) {
    if (!this.seatLayout[row][seat].isBooked) {
      this.seatLayout[row][seat].isSelected = !this.seatLayout[row][seat].isSelected;
      const seatInfo = { row: row + 1, seatNumber: seat + 1 };
      
      if (this.seatLayout[row][seat].isSelected) {
        this.selectedSeats.push(seatInfo);
      } else {
        this.selectedSeats = this.selectedSeats.filter(s => !(s.row === seatInfo.row && s.seatNumber === seatInfo.seatNumber));
      }
    }
  }
  rowText(rowIndex: any): string{
    return String.fromCharCode(65 + rowIndex)
  }
  confirmSelection() {
    this.seatsSelected.emit(this.selectedSeats);
  }
}
