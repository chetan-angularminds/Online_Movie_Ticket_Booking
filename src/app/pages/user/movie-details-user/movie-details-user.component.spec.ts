import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailsUserComponent } from './movie-details-user.component';

describe('MovieDetailsUserComponent', () => {
  let component: MovieDetailsUserComponent;
  let fixture: ComponentFixture<MovieDetailsUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieDetailsUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieDetailsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
