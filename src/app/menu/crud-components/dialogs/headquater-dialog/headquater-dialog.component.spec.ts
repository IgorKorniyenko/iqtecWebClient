import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadquaterDialogComponent } from './headquater-dialog.component';

describe('HeadquaterDialogComponent', () => {
  let component: HeadquaterDialogComponent;
  let fixture: ComponentFixture<HeadquaterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadquaterDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadquaterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
