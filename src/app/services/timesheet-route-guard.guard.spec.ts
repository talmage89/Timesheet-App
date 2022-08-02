import { TestBed } from '@angular/core/testing';

import { TimesheetRouteGuardGuard } from './timesheet-route-guard.guard';

describe('TimesheetRouteGuardGuard', () => {
  let guard: TimesheetRouteGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TimesheetRouteGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
