import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CharacterBuild } from '../../services/character-build';

@Component({
  selector: 'app-appearance-selector',
  imports: [CommonModule, FormsModule],
  templateUrl: './appearance-selector.html',
  styleUrl: './appearance-selector.css',
})
export class AppearanceSelector {
  private characterService = inject(CharacterBuild);
  
  descripcion: string = '';
  imagen: string = '';

  onDescripcionChange() {
    this.characterService.updateDescripcion(this.descripcion);
  }

  onImagenChange() {
    this.characterService.updateImagen(this.imagen);
  }
}
