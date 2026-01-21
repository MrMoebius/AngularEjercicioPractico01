import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterImageList } from './character-image-list';

describe('CharacterImageList', () => {
  let component: CharacterImageList;
  let fixture: ComponentFixture<CharacterImageList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterImageList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterImageList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
