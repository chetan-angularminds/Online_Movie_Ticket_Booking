import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesListComponentComponent } from './movies-list-component.component';

describe('MoviesListComponentComponent', () => {
  let component: MoviesListComponentComponent;
  let fixture: ComponentFixture<MoviesListComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesListComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
