import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoDialobBoxComponent } from './video-dialob-box.component';

describe('VideoDialobBoxComponent', () => {
  let component: VideoDialobBoxComponent;
  let fixture: ComponentFixture<VideoDialobBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoDialobBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoDialobBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
