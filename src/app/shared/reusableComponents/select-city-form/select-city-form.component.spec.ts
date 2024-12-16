import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCityFormComponent } from './select-city-form.component';

describe('SelectCityFormComponent', () => {
  let component: SelectCityFormComponent;
  let fixture: ComponentFixture<SelectCityFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectCityFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectCityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
