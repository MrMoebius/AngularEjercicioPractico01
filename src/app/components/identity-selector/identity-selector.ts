import { Component, inject, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CharacterBuild } from '../../services/character-build';

/**
 * Componente para seleccionar la identidad del personaje.
 * Permite introducir el nombre y seleccionar la raza del personaje.
 * Solo modifica los datos relacionados con la identidad (nombre y raza).
 */
@Component({
  selector: 'app-identity-selector',
  imports: [FormsModule],
  templateUrl: './identity-selector.html',
  styleUrl: './identity-selector.css',
})

export class IdentitySelector {
  private readonly characterService = inject(CharacterBuild);
  
  /**
   * Signal de solo lectura con el estado actual del personaje.
   * Se usa para sincronizar los campos del formulario con el servicio.
   */
  character = this.characterService.getCharacter();
  
  /**
   * Nombre del personaje introducido por el usuario.
   */
  nombre: string = '';
  
  /**
   * Raza del personaje seleccionada por el usuario.
   */
  raza: string = '';
  
  /**
   * Lista de razas disponibles para seleccionar.
   */
  razasDisponibles: string[] = ['Humano', 'Elfo', 'Orco', 'Enano', 'Mediano', 'Semielfo'];

  /**
   * Constructor que sincroniza los campos del formulario con el servicio.
   * Usa effect() para reaccionar automáticamente cuando el servicio cambia,
   * permitiendo que el formulario se actualice cuando se reinicia el personaje.
   */
  constructor() {
    effect(() => {
      const char = this.character();
      this.nombre = char.nombre;
      this.raza = char.raza;
    });
  }

  /**
   * Se ejecuta cuando el usuario cambia el nombre del personaje.
   * Actualiza el servicio con el nuevo nombre.
   */
  onNombreChange() {
    this.characterService.updateNombre(this.nombre);
  }

  /**
   * Se ejecuta cuando el usuario cambia la raza del personaje.
   * Actualiza el servicio con la nueva raza.
   */
  onRazaChange() {
    this.characterService.updateRaza(this.raza);
  }
}
