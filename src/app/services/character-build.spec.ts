import { TestBed } from '@angular/core/testing';

import { CharacterBuild } from './character-build';

describe('CharacterBuild', () => {
  let service: CharacterBuild;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacterBuild);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
