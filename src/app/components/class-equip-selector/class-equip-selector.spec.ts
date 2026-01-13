import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasEquipSelector } from './class-equip-selector';

describe('ClasEquipSelector', () => {
  let component: ClasEquipSelector;
  let fixture: ComponentFixture<ClasEquipSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClasEquipSelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClasEquipSelector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
