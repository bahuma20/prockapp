import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AufmassRowEditComponent } from './aufmass-row-edit.component';

describe('AufmassRowEditComponent', () => {
  let component: AufmassRowEditComponent;
  let fixture: ComponentFixture<AufmassRowEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AufmassRowEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AufmassRowEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
