import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentitySelector } from './identity-selector';

describe('IdentitySelector', () => {
  let component: IdentitySelector;
  let fixture: ComponentFixture<IdentitySelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdentitySelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdentitySelector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
