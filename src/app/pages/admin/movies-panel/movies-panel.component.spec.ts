import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesPanelComponent } from './movies-panel.component';

describe('MoviesPanelComponent', () => {
  let component: MoviesPanelComponent;
  let fixture: ComponentFixture<MoviesPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
