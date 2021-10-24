import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersSubmenuComponent } from './users-submenu.component';

describe('CreateClientComponent', () => {
  let component: UsersSubmenuComponent;
  let fixture: ComponentFixture<UsersSubmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersSubmenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersSubmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
