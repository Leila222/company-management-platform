import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProfileEmpComponent } from './update-profile-emp.component';

describe('UpdateProfileEmpComponent', () => {
  let component: UpdateProfileEmpComponent;
  let fixture: ComponentFixture<UpdateProfileEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProfileEmpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateProfileEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
