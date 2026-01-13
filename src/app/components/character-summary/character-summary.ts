import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterBuild } from '../../services/character-build';

@Component({
  selector: 'app-character-summary',
  imports: [CommonModule],
  templateUrl: './character-summary.html',
  styleUrl: './character-summary.css',
})
export class CharacterSummary {
  private characterService = inject(CharacterBuild);
  
  character = this.characterService.getCharacter();
}
