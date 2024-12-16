import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMovieShowsComponent } from './add-movie-shows.component';

describe('AddMovieShowsComponent', () => {
  let component: AddMovieShowsComponent;
  let fixture: ComponentFixture<AddMovieShowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMovieShowsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMovieShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
