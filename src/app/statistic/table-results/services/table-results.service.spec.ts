import { TestBed, inject } from '@angular/core/testing';

import { TableResultsService } from './table-results.service';

describe('TableResultsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TableResultsService]
    });
  });

  it('should be created', inject([TableResultsService], (service: TableResultsService) => {
    expect(service).toBeTruthy();
  }));
});
