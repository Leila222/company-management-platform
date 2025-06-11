import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProfileMComponent } from './update-profile-m.component';

describe('UpdateProfileMComponent', () => {
  let component: UpdateProfileMComponent;
  let fixture: ComponentFixture<UpdateProfileMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProfileMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateProfileMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
