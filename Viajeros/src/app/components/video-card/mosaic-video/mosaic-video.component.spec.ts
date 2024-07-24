import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MosaicVideoComponent } from './mosaic-video.component';

describe('AddVideoComponent', () => {
  let component: MosaicVideoComponent;
  let fixture: ComponentFixture<MosaicVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MosaicVideoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MosaicVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
