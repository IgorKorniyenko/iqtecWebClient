import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultasSubmenuComponent } from './consultas-submenu.component';

describe('ConsultasSubmenuComponent', () => {
  let component: ConsultasSubmenuComponent;
  let fixture: ComponentFixture<ConsultasSubmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultasSubmenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultasSubmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
