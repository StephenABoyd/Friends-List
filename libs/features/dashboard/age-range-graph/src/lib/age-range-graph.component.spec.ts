import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeRangeGraphComponent } from './age-range-graph.component';

describe('AgeRangeGraphComponent', () => {
  let component: AgeRangeGraphComponent;
  let fixture: ComponentFixture<AgeRangeGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgeRangeGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgeRangeGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
