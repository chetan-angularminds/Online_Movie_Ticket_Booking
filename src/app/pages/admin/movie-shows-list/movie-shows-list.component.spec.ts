import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieShowsListComponent } from './movie-shows-list.component';

describe('MovieShowsListComponent', () => {
  let component: MovieShowsListComponent;
  let fixture: ComponentFixture<MovieShowsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieShowsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieShowsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
