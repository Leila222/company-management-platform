import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskMComponent } from './add-task-m.component';

describe('AddTaskMComponent', () => {
  let component: AddTaskMComponent;
  let fixture: ComponentFixture<AddTaskMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTaskMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTaskMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
