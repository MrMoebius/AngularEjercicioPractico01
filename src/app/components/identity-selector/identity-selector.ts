import { Component, inject, effect, Injector, afterNextRender, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CharacterBuild } from '../../services/character-build';
import { CharacterImageStore } from '../../services/character-image-store';

@Component({
  selector: 'app-identity-selector',
  imports: [FormsModule],
  templateUrl: './identity-selector.html',
  styleUrl: './identity-selector.css',
})

export class IdentitySelector {
  private readonly characterService = inject(CharacterBuild);
  private readonly imageStore = inject(CharacterImageStore);
  private readonly injector = inject(Injector);
  
  character = this.characterService.getCharacter();
  
  nombre: string = '';
  raza: string = '';
  genero: string = '';
  
  razasDisponibles = signal<string[]>([]);
  generosDisponibles = signal<string[]>([]);

  constructor() {
    const char = this.character();
    this.nombre = char.nombre;
    this.raza = char.raza;
    this.genero = char.genero;
    
    this.razasDisponibles.set(this.imageStore.getRazasDisponibles());
    this.generosDisponibles.set(this.imageStore.getGenerosDisponibles());
    
    afterNextRender(() => {
      effect(() => {
        const char = this.character();
        this.nombre = char.nombre;
        this.raza = char.raza;
        this.genero = char.genero;
        
        const filtrosRazas: { genero?: string, clase?: string, arma?: string } = {};
        if (char.genero) filtrosRazas.genero = char.genero;
        if (char.clase) filtrosRazas.clase = char.clase;
        if (char.arma) filtrosRazas.arma = char.arma;
        this.razasDisponibles.set(
          this.imageStore.getRazasDisponibles(Object.keys(filtrosRazas).length > 0 ? filtrosRazas : undefined)
        );
        
        const filtrosGeneros: { raza?: string, clase?: string, arma?: string } = {};
        if (char.raza) filtrosGeneros.raza = char.raza;
        if (char.clase) filtrosGeneros.clase = char.clase;
        if (char.arma) filtrosGeneros.arma = char.arma;
        this.generosDisponibles.set(
          this.imageStore.getGenerosDisponibles(Object.keys(filtrosGeneros).length > 0 ? filtrosGeneros : undefined)
        );
        
        const razasDisponibles = this.razasDisponibles();
        if (razasDisponibles.length > 0 && this.raza && !razasDisponibles.includes(this.raza)) {
          this.raza = '';
          this.characterService.updateRaza('');
        }
        
        const generosDisponibles = this.generosDisponibles();
        if (generosDisponibles.length > 0 && this.genero && !generosDisponibles.includes(this.genero)) {
          this.genero = '';
          this.characterService.updateGenero('');
        }
      }, { injector: this.injector });
    });
  }

  onNombreChange() {
    this.characterService.updateNombre(this.nombre);
  }

  onRazaChange() {
    this.characterService.updateRaza(this.raza);
  }

  onGeneroChange() {
    this.characterService.updateGenero(this.genero);
  }
}
