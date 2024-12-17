import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualShowsComponent } from './individual-shows.component';

describe('IndividualShowsComponent', () => {
  let component: IndividualShowsComponent;
  let fixture: ComponentFixture<IndividualShowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndividualShowsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
