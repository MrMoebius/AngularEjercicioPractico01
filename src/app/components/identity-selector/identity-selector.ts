import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CharacterBuild } from '../../services/character-build';

@Component({
  selector: 'app-identity-selector',
  imports: [FormsModule],
  templateUrl: './identity-selector.html',
  styleUrl: './identity-selector.css',
})

export class IdentitySelector {
  private characterService = inject(CharacterBuild);
  
  nombre: string = '';
  raza: string = '';
  
  razasDisponibles: string[] = ['Humano', 'Elfo', 'Orco', 'Enano', 'Mediano', 'Semielfo'];

  onNombreChange() {
    this.characterService.updateNombre(this.nombre);
  }

  onRazaChange() {
    this.characterService.updateRaza(this.raza);
  }
}
