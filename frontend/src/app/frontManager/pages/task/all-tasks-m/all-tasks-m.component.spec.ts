import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTasksMComponent } from './all-tasks-m.component';

describe('AllTasksMComponent', () => {
  let component: AllTasksMComponent;
  let fixture: ComponentFixture<AllTasksMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllTasksMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllTasksMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
