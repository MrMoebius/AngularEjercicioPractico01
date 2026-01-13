import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassEquipSelector } from './class-equip-selector';

describe('ClassEquipSelector', () => {
  let component: ClassEquipSelector;
  let fixture: ComponentFixture<ClassEquipSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassEquipSelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassEquipSelector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
