import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientoSubmenuComponent } from './seguimiento-submenu.component';

describe('SeguimientoSubmenuComponent', () => {
  let component: SeguimientoSubmenuComponent;
  let fixture: ComponentFixture<SeguimientoSubmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeguimientoSubmenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguimientoSubmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
