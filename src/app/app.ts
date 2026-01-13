import { Component } from '@angular/core';
import { IdentitySelector } from './components/identity-selector/identity-selector';
import { ClasEquipSelector } from './components/class-equip-selector/class-equip-selector';
import { AppearanceSelector } from './components/appearance-selector/appearance-selector';
import { CharacterSummary } from './components/character-summary/character-summary';

@Component({
  selector: 'app-root',
  imports: [
    IdentitySelector,
    ClasEquipSelector,
    AppearanceSelector,
    CharacterSummary
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
