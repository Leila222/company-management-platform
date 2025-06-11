import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePasswordEmpComponent } from './update-password-emp.component';

describe('UpdatePasswordEmpComponent', () => {
  let component: UpdatePasswordEmpComponent;
  let fixture: ComponentFixture<UpdatePasswordEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePasswordEmpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePasswordEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
