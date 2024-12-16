import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheatersListComponent } from './theaters-list.component';

describe('TheatersListComponent', () => {
  let component: TheatersListComponent;
  let fixture: ComponentFixture<TheatersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TheatersListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheatersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
