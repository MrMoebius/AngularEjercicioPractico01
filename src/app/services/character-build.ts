import { Injectable, signal } from '@angular/core';
import { Character } from '../models/character-model';

/**
 * Servicio compartido para gestionar el estado del personaje.
 * Este servicio permite que todos los componentes compartan y modifiquen
 * la información del personaje sin comunicarse directamente entre ellos.
 * Utiliza signals de Angular para mantener un estado reactivo.
 */
@Injectable({
  providedIn: 'root',
})
export class CharacterBuild {
  /**
   * Estado reactivo del personaje usando signal.
   * Inicializado con valores vacíos para todos los campos.
   */
  private characterState = signal<Character>({
    nombre: '',
    raza: '',
    clase: '',
    arma: '',
    descripcion: '',
    imagen: ''
  });

  /**
   * Obtiene el estado actual del personaje como signal de solo lectura.
   * Los componentes pueden suscribirse a este signal para reaccionar a los cambios.
   * @returns Signal de solo lectura con el estado del personaje
   */
  getCharacter() {
    return this.characterState.asReadonly();
  }

  /**
   * Actualiza el nombre del personaje.
   * @param nombre - Nuevo nombre del personaje
   */
  updateNombre(nombre: string) {
    this.characterState.update(char => ({ ...char, nombre }));
  }

  /**
   * Actualiza la raza del personaje.
   * @param raza - Nueva raza del personaje
   */
  updateRaza(raza: string) {
    this.characterState.update(char => ({ ...char, raza }));
  }

  /**
   * Actualiza la clase del personaje.
   * @param clase - Nueva clase del personaje
   */
  updateClase(clase: string) {
    this.characterState.update(char => ({ ...char, clase }));
  }

  /**
   * Actualiza el arma del personaje.
   * @param arma - Nueva arma del personaje
   */
  updateArma(arma: string) {
    this.characterState.update(char => ({ ...char, arma }));
  }

  /**
   * Actualiza la descripción física del personaje.
   * @param descripcion - Nueva descripción física del personaje
   */
  updateDescripcion(descripcion: string) {
    this.characterState.update(char => ({ ...char, descripcion }));
  }

  /**
   * Actualiza la URL de la imagen del personaje.
   * @param imagen - Nueva URL de la imagen del personaje
   */
  updateImagen(imagen: string) {
    this.characterState.update(char => ({ ...char, imagen }));
  }

  /**
   * Reinicia todos los datos del personaje a valores vacíos.
   * Este método es útil para permitir al usuario comenzar de nuevo
   * con la configuración del personaje.
   */
  resetCharacter() {
    this.characterState.set({
      nombre: '',
      raza: '',
      clase: '',
      arma: '',
      descripcion: '',
      imagen: ''
    });
  }
  
}
