import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AufmassComponent } from './aufmass.component';

describe('AufmassComponent', () => {
  let component: AufmassComponent;
  let fixture: ComponentFixture<AufmassComponent>;

  beforeEach(async(() => {
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
