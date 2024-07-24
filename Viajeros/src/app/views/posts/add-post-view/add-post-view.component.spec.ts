import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPostViewComponent } from './add-post-view.component';

describe('AddPostViewComponent', () => {
  let component: AddPostViewComponent;
  let fixture: ComponentFixture<AddPostViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPostViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPostViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
