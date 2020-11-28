import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSigningComponent } from './form-signing.component';

describe('FormSigningComponent', () => {
  let component: FormSigningComponent;
  let fixture: ComponentFixture<FormSigningComponent>;

  beforeEach(async(() => {
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
