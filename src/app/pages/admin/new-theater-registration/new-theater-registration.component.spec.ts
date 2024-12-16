import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTheaterRegistrationComponent } from './new-theater-registration.component';

describe('NewTheaterRegistrationComponent', () => {
  let component: NewTheaterRegistrationComponent;
  let fixture: ComponentFixture<NewTheaterRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTheaterRegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTheaterRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
