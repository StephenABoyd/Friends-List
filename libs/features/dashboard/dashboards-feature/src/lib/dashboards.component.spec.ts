import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { DashboardsComponent } from './dashboards.component';

describe('DashboardsComponent', () => {
  let component: DashboardsComponent;
  let fixture: ComponentFixture<DashboardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardsComponent ],
      providers:[
        provideMockStore({initialState: {
          allFriends: [],
          myFriends: []
        }})
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
