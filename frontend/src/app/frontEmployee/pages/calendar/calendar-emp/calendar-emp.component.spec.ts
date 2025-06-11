import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarEmpComponent } from './calendar-emp.component';

describe('CalendarEmpComponent', () => {
  let component: CalendarEmpComponent;
  let fixture: ComponentFixture<CalendarEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarEmpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
