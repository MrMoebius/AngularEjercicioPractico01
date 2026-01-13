import { Component, inject } from '@angular/core';
import { CharacterBuild } from '../../services/character-build';

/**
 * Componente que muestra el resumen final del personaje.
 * Este componente es de solo lectura y simula la pantalla previa
 * al inicio de la partida. Muestra toda la información del personaje
 * y permite reiniciar la configuración.
 */
@Component({
  selector: 'app-character-summary',
  imports: [],
  templateUrl: './character-summary.html',
  styleUrl: './character-summary.css',
})
export class CharacterSummary {
  private readonly characterService = inject(CharacterBuild);
  
  /**
   * Signal de solo lectura con el estado actual del personaje.
   * Se actualiza automáticamente cuando el servicio cambia.
   */
  character = this.characterService.getCharacter();

  /**
   * Reinicia todos los datos del personaje.
   * Llama al servicio para resetear el estado y limpiar todos los formularios.
   */
  resetCharacter() {
    this.characterService.resetCharacter();
  }
}
