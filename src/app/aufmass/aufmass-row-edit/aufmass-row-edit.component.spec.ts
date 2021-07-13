import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AufmassRowEditComponent } from './aufmass-row-edit.component';

describe('AufmassRowEditComponent', () => {
  let component: AufmassRowEditComponent;
  let fixture: ComponentFixture<AufmassRowEditComponent>;

  beforeEach(async(() => {
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
