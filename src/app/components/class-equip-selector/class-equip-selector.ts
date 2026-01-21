import { Component, inject, effect, Injector, afterNextRender, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CharacterBuild } from '../../services/character-build';
import { CharacterImageStore } from '../../services/character-image-store';

@Component({
  selector: 'app-class-equip-selector',
  imports: [FormsModule],
  templateUrl: './class-equip-selector.html',
  styleUrl: './class-equip-selector.css',
})
export class ClasEquipSelector {
  private readonly characterService = inject(CharacterBuild);
  private readonly imageStore = inject(CharacterImageStore);
  private readonly injector = inject(Injector);
  
  character = this.characterService.getCharacter();
  
  clase: string = '';
  arma: string = '';
  
  clasesDisponibles = signal<string[]>([]);
  armasDisponibles = signal<string[]>([]);
  
  constructor() {
    const char = this.character();
    this.clase = char.clase;
    this.arma = char.arma;
    
    this.clasesDisponibles.set(this.imageStore.getClasesDisponibles());
    this.armasDisponibles.set(this.imageStore.getArmasDisponibles());
    
    afterNextRender(() => {
      effect(() => {
        const char = this.character();
        this.clase = char.clase;
        this.arma = char.arma;
        
        const filtrosClases: { raza?: string, genero?: string, arma?: string } = {};
        if (char.raza) filtrosClases.raza = char.raza;
        if (char.genero) filtrosClases.genero = char.genero;
        if (char.arma) filtrosClases.arma = char.arma;
        this.clasesDisponibles.set(
          this.imageStore.getClasesDisponibles(Object.keys(filtrosClases).length > 0 ? filtrosClases : undefined)
        );
        
        const filtrosArmas: { raza?: string, genero?: string, clase?: string } = {};
        if (char.raza) filtrosArmas.raza = char.raza;
        if (char.genero) filtrosArmas.genero = char.genero;
        if (char.clase) filtrosArmas.clase = char.clase;
        this.armasDisponibles.set(
          this.imageStore.getArmasDisponibles(Object.keys(filtrosArmas).length > 0 ? filtrosArmas : undefined)
        );
        
        const clasesDisponibles = this.clasesDisponibles();
        if (clasesDisponibles.length > 0 && this.clase && !clasesDisponibles.includes(this.clase)) {
          this.clase = '';
          this.characterService.updateClase('');
        }
        
        const armasDisponibles = this.armasDisponibles();
        if (armasDisponibles.length > 0 && this.arma && !armasDisponibles.includes(this.arma)) {
          this.arma = '';
          this.characterService.updateArma('');
        }
      }, { injector: this.injector });
    });
  }
  
  onClaseChange() {
    this.characterService.updateClase(this.clase);
  }
  
  onArmaChange() {
    this.characterService.updateArma(this.arma);
  }
}
