import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultProjectsComponent } from './consult-projects.component';

describe('ConsultProjectsComponent', () => {
  let component: ConsultProjectsComponent;
  let fixture: ComponentFixture<ConsultProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultProjectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
