import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheatersPanelComponent } from './theaters-panel.component';

describe('TheatersPanelComponent', () => {
  let component: TheatersPanelComponent;
  let fixture: ComponentFixture<TheatersPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TheatersPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheatersPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
