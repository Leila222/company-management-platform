import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePasswordMComponent } from './update-password-m.component';

describe('UpdatePasswordMComponent', () => {
  let component: UpdatePasswordMComponent;
  let fixture: ComponentFixture<UpdatePasswordMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePasswordMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePasswordMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
