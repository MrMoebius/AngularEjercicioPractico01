import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CharacterBuild } from '../../services/character-build';

@Component({
  selector: 'app-class-equip-selector',
  imports: [FormsModule],
  templateUrl: './class-equip-selector.html',
  styleUrl: './class-equip-selector.css',
})
export class ClasEquipSelector {
  private characterService = inject(CharacterBuild);
  
  clase: string = '';
  arma: string = '';
  
  clasesDisponibles: string[] = ['Guerrero', 'Mago', 'Arquero', 'Pícaro', 'Clérigo', 'Explorador', 'Bárbaro', 'Paladín'];
  armasDisponibles: string[] = ['Espada y Escudo', 'Báculo Mágico', 'Arco y Flechas', 'Dagas', 'Maza', 'Hacha', 'Bastón', 'Ballesta'];
  
  onClaseChange() {
    this.characterService.updateClase(this.clase);
  }
  
  onArmaChange() {
    this.characterService.updateArma(this.arma);
  }
}
