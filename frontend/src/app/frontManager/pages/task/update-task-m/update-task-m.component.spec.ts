import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTaskMComponent } from './update-task-m.component';

describe('UpdateTaskMComponent', () => {
  let component: UpdateTaskMComponent;
  let fixture: ComponentFixture<UpdateTaskMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTaskMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateTaskMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
