import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMovieRegistrationComponent } from './new-movie-registration.component';

describe('NewMovieRegistrationComponent', () => {
  let component: NewMovieRegistrationComponent;
  let fixture: ComponentFixture<NewMovieRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewMovieRegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewMovieRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
