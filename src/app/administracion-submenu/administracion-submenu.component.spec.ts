import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministracionSubmenuComponent } from './administracion-submenu.component';

describe('AdministracionSubmenuComponent', () => {
  let component: AdministracionSubmenuComponent;
  let fixture: ComponentFixture<AdministracionSubmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministracionSubmenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministracionSubmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
