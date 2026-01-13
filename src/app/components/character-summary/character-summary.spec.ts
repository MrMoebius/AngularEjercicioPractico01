import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterSummary } from './character-summary';

describe('CharacterSummary', () => {
  let component: CharacterSummary;
  let fixture: ComponentFixture<CharacterSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterSummary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterSummary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
