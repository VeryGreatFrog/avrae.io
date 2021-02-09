import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {TomeShareDialog} from './tome-share-dialog.component';

describe('TomeShareDialog', () => {
  let component: TomeShareDialog;
  let fixture: ComponentFixture<TomeShareDialog>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TomeShareDialog]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TomeShareDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
