import { Component, inject, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CharacterBuild } from '../../services/character-build';

/**
 * Componente para configurar la apariencia del personaje.
 * Permite introducir una descripción física del personaje y
 * una URL de imagen. Solo gestiona los datos relacionados con la apariencia.
 */
@Component({
  selector: 'app-appearance-selector',
  imports: [FormsModule],
  templateUrl: './appearance-selector.html',
  styleUrl: './appearance-selector.css',
})
export class AppearanceSelector {
  private readonly characterService = inject(CharacterBuild);
  
  /**
   * Signal de solo lectura con el estado actual del personaje.
   * Se usa para sincronizar los campos del formulario con el servicio.
   */
  character = this.characterService.getCharacter();
  
  /**
   * Descripción física del personaje introducida por el usuario.
   */
  descripcion: string = '';
  
  /**
   * URL de la imagen del personaje introducida por el usuario.
   */
  imagen: string = '';

  /**
   * Constructor que sincroniza los campos del formulario con el servicio.
   * Usa effect() para reaccionar automáticamente cuando el servicio cambia,
   * permitiendo que el formulario se actualice cuando se reinicia el personaje.
   */
  constructor() {
    effect(() => {
      const char = this.character();
      this.descripcion = char.descripcion;
      this.imagen = char.imagen;
    });
  }

  /**
   * Se ejecuta cuando el usuario cambia la descripción física del personaje.
   * Actualiza el servicio con la nueva descripción.
   */
  onDescripcionChange() {
    this.characterService.updateDescripcion(this.descripcion);
  }

  /**
   * Se ejecuta cuando el usuario cambia la URL de la imagen del personaje.
   * Actualiza el servicio con la nueva URL de imagen.
   */
  onImagenChange() {
    this.characterService.updateImagen(this.imagen);
  }
}
