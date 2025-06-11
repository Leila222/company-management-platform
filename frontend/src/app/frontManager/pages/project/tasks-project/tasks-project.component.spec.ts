import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksProjectComponent } from './tasks-project.component';

describe('TasksProjectComponent', () => {
  let component: TasksProjectComponent;
  let fixture: ComponentFixture<TasksProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
