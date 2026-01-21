import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterImageStore } from '../../services/character-image-store';

/**
 * Componente que muestra la lista de imágenes de personajes disponibles.
 * Permite seleccionar una imagen y ver sus tags.
 */
@Component({
  selector: 'app-character-image-list',
  imports: [CommonModule],
  templateUrl: './character-image-list.html',
  styleUrl: './character-image-list.css',
})
export class CharacterImageList {
  constructor(public imageStore: CharacterImageStore) {}
}
