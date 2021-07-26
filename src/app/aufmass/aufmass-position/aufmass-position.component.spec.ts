import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AufmassPositionComponent } from './aufmass-position.component';

describe('AufmassPositionComponent', () => {
  let component: AufmassPositionComponent;
  let fixture: ComponentFixture<AufmassPositionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AufmassPositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AufmassPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
