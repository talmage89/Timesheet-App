import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompartmentsComponent } from './compartments.component';

describe('CompartmentsComponent', () => {
  let component: CompartmentsComponent;
  let fixture: ComponentFixture<CompartmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompartmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
