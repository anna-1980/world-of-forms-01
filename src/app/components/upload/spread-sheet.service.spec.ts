import { TestBed } from '@angular/core/testing';

import { SpreadSheetService } from './spread-sheet.service';

describe('SpreadSheetService', () => {
  let service: SpreadSheetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpreadSheetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
