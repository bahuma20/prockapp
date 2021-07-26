import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormSubmissionsComponent } from './form-submissions.component';

describe('FormSubmissionsComponent', () => {
  let component: FormSubmissionsComponent;
  let fixture: ComponentFixture<FormSubmissionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSubmissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSubmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
