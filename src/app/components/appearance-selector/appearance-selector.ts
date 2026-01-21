import { Component, inject, effect, Injector, afterNextRender } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CharacterBuild } from '../../services/character-build';

@Component({
  selector: 'app-appearance-selector',
  imports: [FormsModule],
  templateUrl: './appearance-selector.html',
  styleUrl: './appearance-selector.css',
})
export class AppearanceSelector {
  private readonly characterService = inject(CharacterBuild);
  private readonly injector = inject(Injector);
  
  character = this.characterService.getCharacter();
  descripcion: string = '';

  constructor() {
    const char = this.character();
    this.descripcion = char.descripcion;
    
    afterNextRender(() => {
      effect(() => {
        const char = this.character();
        this.descripcion = char.descripcion;
      }, { injector: this.injector });
    });
  }

  onDescripcionChange() {
    this.characterService.updateDescripcion(this.descripcion);
  }
}
