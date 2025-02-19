import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OpenFilePage } from './open-file.page';

describe('OpenFilePage', () => {
  let component: OpenFilePage;
  let fixture: ComponentFixture<OpenFilePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenFilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
