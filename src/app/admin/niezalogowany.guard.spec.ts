import { TestBed, async, inject } from '@angular/core/testing';

import { NiezalogowanyGuard } from './niezalogowany.guard';

describe('NiezalogowanyGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NiezalogowanyGuard]
    });
  });

  it('should ...', inject([NiezalogowanyGuard], (guard: NiezalogowanyGuard) => {
    expect(guard).toBeTruthy();
  }));
});
