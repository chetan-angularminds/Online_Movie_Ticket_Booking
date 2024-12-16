import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTimingComponent } from './show-timing.component';

describe('ShowTimingComponent', () => {
  let component: ShowTimingComponent;
  let fixture: ComponentFixture<ShowTimingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowTimingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowTimingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
