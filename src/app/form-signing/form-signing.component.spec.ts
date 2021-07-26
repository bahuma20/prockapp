import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormSigningComponent } from './form-signing.component';

describe('FormSigningComponent', () => {
  let component: FormSigningComponent;
  let fixture: ComponentFixture<FormSigningComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSigningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSigningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
