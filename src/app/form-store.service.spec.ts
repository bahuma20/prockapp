import { TestBed } from '@angular/core/testing';

import { FormStoreService } from './form-store.service';

describe('FormStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormStoreService = TestBed.get(FormStoreService);
    expect(service).toBeTruthy();
  });
});
