import { Component, inject, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CharacterBuild } from '../../services/character-build';

/**
 * Componente para seleccionar la clase y el arma inicial del personaje.
 * Permite seleccionar la clase del personaje y su arma inicial.
 * Este componente no modifica el nombre ni la raza del personaje.
 */
@Component({
  selector: 'app-class-equip-selector',
  imports: [FormsModule],
  templateUrl: './class-equip-selector.html',
  styleUrl: './class-equip-selector.css',
})
export class ClasEquipSelector {
  private readonly characterService = inject(CharacterBuild);
  
  /**
   * Signal de solo lectura con el estado actual del personaje.
   * Se usa para sincronizar los campos del formulario con el servicio.
   */
  character = this.characterService.getCharacter();
  
  /**
   * Clase del personaje seleccionada por el usuario.
   */
  clase: string = '';
  
  /**
   * Arma inicial del personaje seleccionada por el usuario.
   */
  arma: string = '';
  
  /**
   * Lista de clases disponibles para seleccionar.
   */
  clasesDisponibles: string[] = ['Guerrero', 'Mago', 'Arquero', 'Pícaro', 'Clérigo', 'Explorador', 'Bárbaro', 'Paladín'];
  
  /**
   * Lista de armas disponibles para seleccionar.
   */
  armasDisponibles: string[] = ['Espada y Escudo', 'Báculo Mágico', 'Arco y Flechas', 'Dagas', 'Maza', 'Hacha', 'Bastón', 'Ballesta'];
  
  /**
   * Constructor que sincroniza los campos del formulario con el servicio.
   * Usa effect() para reaccionar automáticamente cuando el servicio cambia,
   * permitiendo que el formulario se actualice cuando se reinicia el personaje.
   */
  constructor() {
    effect(() => {
      const char = this.character();
      this.clase = char.clase;
      this.arma = char.arma;
    });
  }
  
  /**
   * Se ejecuta cuando el usuario cambia la clase del personaje.
   * Actualiza el servicio con la nueva clase.
   */
  onClaseChange() {
    this.characterService.updateClase(this.clase);
  }
  
  /**
   * Se ejecuta cuando el usuario cambia el arma del personaje.
   * Actualiza el servicio con el nuevo arma.
   */
  onArmaChange() {
    this.characterService.updateArma(this.arma);
  }
}
