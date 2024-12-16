import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailsComponentComponent } from './movie-details-component.component';

describe('MovieDetailsComponentComponent', () => {
  let component: MovieDetailsComponentComponent;
  let fixture: ComponentFixture<MovieDetailsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieDetailsComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieDetailsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
