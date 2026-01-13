import { Injectable, signal } from '@angular/core';
import { Character } from '../models/character-model';

@Injectable({
  providedIn: 'root',
})
export class CharacterBuild {
  private characterState = signal<Character>({
    nombre: '',
    raza: '',
    clase: '',
    arma: '',
    descripcion: '',
    imagen: ''
  });

  getCharacter() {
    return this.characterState.asReadonly();
  }

  updateNombre(nombre: string) {
    this.characterState.update(char => ({ ...char, nombre }));
  }

  updateRaza(raza: string) {
    this.characterState.update(char => ({ ...char, raza }));
  }

  updateClase(clase: string) {
    this.characterState.update(char => ({ ...char, clase }));
  }

  updateArma(arma: string) {
    this.characterState.update(char => ({ ...char, arma }));
  }

  updateDescripcion(descripcion: string) {
    this.characterState.update(char => ({ ...char, descripcion }));
  }

  updateImagen(imagen: string) {
    this.characterState.update(char => ({ ...char, imagen }));
  } 
  
}
