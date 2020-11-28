import { TestBed } from '@angular/core/testing';

import { FormValueFormatterService } from './form-value-formatter.service';

describe('FormValueFormatterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormValueFormatterService = TestBed.get(FormValueFormatterService);
    expect(service).toBeTruthy();
  });
});
