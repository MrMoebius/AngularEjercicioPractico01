import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppearanceSelector } from './appearance-selector';

describe('AppearanceSelector', () => {
  let component: AppearanceSelector;
  let fixture: ComponentFixture<AppearanceSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppearanceSelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppearanceSelector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
