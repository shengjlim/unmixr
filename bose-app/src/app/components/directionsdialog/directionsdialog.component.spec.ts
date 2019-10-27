import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectionsdialogComponent } from './directionsdialog.component';

describe('DirectionsdialogComponent', () => {
  let component: DirectionsdialogComponent;
  let fixture: ComponentFixture<DirectionsdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectionsdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectionsdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
