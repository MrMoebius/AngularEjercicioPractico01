import { Injectable, signal, inject, effect, Injector, computed } from '@angular/core';
import { Character } from '../models/character-model';
import { CharacterImageStore } from './character-image-store';

@Injectable({
  providedIn: 'root',
})
export class CharacterBuild {
  private readonly imageStore = inject(CharacterImageStore);
  private readonly injector = inject(Injector);

  private characterState = signal<Character>({
    nombre: '',
    raza: '',
    genero: '',
    clase: '',
    arma: '',
    descripcion: '',
    imagen: ''
  });

  private characterSelection = computed(() => {
    const char = this.characterState();
    return {
      raza: char.raza,
      genero: char.genero,
      clase: char.clase,
      arma: char.arma
    };
  });

  constructor() {
    effect(() => {
      const selection = this.characterSelection();
      const char = this.characterState();
      const imagenActual = char.imagen;
      
      if (selection.raza || selection.genero || selection.clase || selection.arma) {
        const filtros: { raza?: string, genero?: string, clase?: string, arma?: string } = {};
        if (selection.raza) filtros.raza = selection.raza;
        if (selection.genero) filtros.genero = selection.genero;
        if (selection.clase) filtros.clase = selection.clase;
        if (selection.arma) filtros.arma = selection.arma;
        
        const matchingImages = this.imageStore.getFilteredImages(filtros);
        if (matchingImages.length > 0) {
          const selectedImage = matchingImages[0];
          if (selectedImage.imageUrl !== imagenActual) {
            this.characterState.update(c => ({ ...c, imagen: selectedImage.imageUrl }));
          }
        } else if (imagenActual !== '') {
          this.characterState.update(c => ({ ...c, imagen: '' }));
        }
      } else {
        if (imagenActual !== '') {
          this.characterState.update(c => ({ ...c, imagen: '' }));
        }
      }
    }, { injector: this.injector });
  }

  private buildTagsFromCharacter(char: Character): string[] {
    const tags: string[] = [];
    
    if (char.raza) {
      const razaNorm = this.normalizeTag(char.raza);
      tags.push(razaNorm);
      if (razaNorm === 'sobrenatural') {
        tags.push('ente');
      }
      if (razaNorm === 'ente') {
        tags.push('sobrenatural');
      }
    }
    
    if (char.genero) {
      const generoNorm = this.normalizeTag(char.genero);
      tags.push(generoNorm);
      if (generoNorm === 'masculino') {
        tags.push('masc', 'mas');
      }
      if (generoNorm === 'femenino') {
        tags.push('fem', 'femenina');
      }
    }
    
    if (char.clase) {
      const claseNorm = this.normalizeTag(char.clase);
      tags.push(claseNorm);
    }
    
    if (char.arma) {
      const armaNormalized = this.normalizeTag(char.arma);
      tags.push(armaNormalized);
      const palabras = char.arma.toLowerCase().split(/\s+/);
      palabras.forEach(palabra => {
        const palabraLimpia = palabra.replace(/[^a-z0-9]/g, '');
        if (palabraLimpia.length > 2) {
          tags.push(palabraLimpia);
        }
      });
      if (armaNormalized.includes('baculo') || armaNormalized.includes('baston')) {
        tags.push('baculo', 'baston', 'báculo', 'bastón');
      }
      if (armaNormalized.includes('arco')) {
        tags.push('arco');
      }
      if (armaNormalized.includes('daga')) {
        tags.push('daga', 'dagas');
      }
      if (armaNormalized.includes('espada')) {
        tags.push('espada');
        if (armaNormalized.includes('escudo') || armaNormalized.includes('y')) {
          tags.push('espadayescudo', 'espada y escudo');
        }
      }
      if (armaNormalized.includes('hacha')) {
        tags.push('hacha');
      }
      if (armaNormalized.includes('maza') || armaNormalized.includes('martillo')) {
        tags.push('maza', 'martillo');
      }
      if (armaNormalized.includes('lanza')) {
        tags.push('lanza');
      }
      if (armaNormalized.includes('fuego')) {
        tags.push('fuego');
      }
      if (armaNormalized.includes('guadana') || armaNormalized.includes('guadaña')) {
        tags.push('guadana', 'guadaña');
      }
      if (armaNormalized.includes('ballesta')) {
        tags.push('ballesta');
      }
      if (armaNormalized.includes('escudo') && armaNormalized.includes('espada')) {
        tags.push('espadayescudo', 'espada y escudo');
      }
    }
    
    return tags;
  }

  private normalizeTag(tag: string): string {
    return tag
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '');
  }

  getCharacter() {
    return this.characterState.asReadonly();
  }

  updateNombre(nombre: string) {
    this.characterState.update(char => ({ ...char, nombre }));
  }

  updateRaza(raza: string) {
    this.characterState.update(char => ({ ...char, raza }));
  }

  updateGenero(genero: string) {
    this.characterState.update(char => ({ ...char, genero }));
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

  resetCharacter() {
    this.characterState.set({
      nombre: '',
      raza: '',
      genero: '',
      clase: '',
      arma: '',
      descripcion: '',
      imagen: ''
    });
  }
  
}
