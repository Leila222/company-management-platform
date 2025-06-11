import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksPerProjectComponent } from './tasks-per-project.component';

describe('TasksPerProjectComponent', () => {
  let component: TasksPerProjectComponent;
  let fixture: ComponentFixture<TasksPerProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksPerProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksPerProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
