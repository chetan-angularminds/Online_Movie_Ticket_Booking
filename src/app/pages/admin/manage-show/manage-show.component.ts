import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-manage-show',
  standalone: true,
  imports: [CommonModule  ],
  templateUrl: './manage-show.component.html',
  styleUrl: './manage-show.component.scss'
})
export class ManageShowComponent implements OnInit {
  bulkShow: BulkShow | null = null;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    const bulkShowId = this.route.snapshot.paramMap.get('id');
    if (bulkShowId) {
      this.fetchBulkShowDetails(bulkShowId);
    } else {
      this.error = 'No bulk show ID provided';
      this.loading = false;
    }
  }

  fetchBulkShowDetails(bulkShowId: string) {
    this.http.get<BulkShow>(`http://localhost:3000/api/shows/bulk/${bulkShowId}`).subscribe({
      next: (data) => {
        this.bulkShow = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to fetch bulk show details';
        this.loading = false;
        console.error(err);
      }
    });
  }

  deleteShow() {
    if (this.bulkShow) {
      if (confirm('Are you sure you want to delete this show?')) {
        this.http.delete(`http://localhost:3000/bulk/${this.bulkShow._id}`).subscribe({
          next: () => {
            alert('Show deleted successfully');
            this.router.navigate(['/bulk-shows']); // Assuming you have a list page
          },
          error: (err) => {
            alert('Failed to delete the show');
            console.error(err);
          }
        });
      }
    }
  }

}
interface Movie {
  _id: string;
  title: string;
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

interface BulkShow {
  _id: string;
  movie: Movie;
  theaters: Theater[];
  seatPrice: number;
  startDate: string;
  endDate: string;
}
