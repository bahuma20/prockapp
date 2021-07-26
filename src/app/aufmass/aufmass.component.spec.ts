import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AufmassComponent } from './aufmass.component';

describe('AufmassComponent', () => {
  let component: AufmassComponent;
  let fixture: ComponentFixture<AufmassComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AufmassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AufmassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
