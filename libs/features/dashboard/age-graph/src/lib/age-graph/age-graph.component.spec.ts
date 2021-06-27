import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeGraphComponent } from './age-graph.component';

describe('AgeGraphComponent', () => {
  let component: AgeGraphComponent;
  let fixture: ComponentFixture<AgeGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgeGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgeGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
