import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { ShellHeaderComponent } from './shell-header.component';

describe('ShellHeaderComponent', () => {
  let component: ShellHeaderComponent;
  let fixture: ComponentFixture<ShellHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShellHeaderComponent ],
      providers: [
        provideMockStore({ initialState: {
          allFriends: [],
          myFriends: []
        }})
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShellHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
