import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-date-selection',
  standalone: true,
  imports: [],
  templateUrl: './date-selection.component.html',
  styleUrl: './date-selection.component.scss'
})
export class DateSelectionComponent {
  @Input() startDate!: Date;
  @Input() endDate!: Date;
  @Output() dateSelected = new EventEmitter<string>();

  minDate: string|undefined;
  maxDate: string|undefined;

  ngOnInit() {
    this.minDate = this.formatDate(new Date(Math.max(this.startDate.getTime(), new Date().getTime())));
    this.maxDate = this.formatDate(this.endDate);
  }

  onDateSelect(event: Event) {
    const date = (event.target as HTMLInputElement).value;
    this.dateSelected.emit(date);
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}
