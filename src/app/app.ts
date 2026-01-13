import { Component } from '@angular/core';
import { IdentitySelector } from './components/identity-selector/identity-selector';
import { ClasEquipSelector } from './components/class-equip-selector/class-equip-selector';
import { AppearanceSelector } from './components/appearance-selector/appearance-selector';
import { CharacterSummary } from './components/character-summary/character-summary';

/**
 * Componente principal de la aplicación.
 * Configurador completo de personaje de videojuego.
 * 
 * La aplicación está compuesta por varios componentes independientes que
 * comparten información mediante un servicio común (CharacterBuild).
 * 
 * Componentes:
 * - IdentitySelector: Selección de nombre y raza
 * - ClasEquipSelector: Selección de clase y arma
 * - AppearanceSelector: Configuración de apariencia (descripción e imagen)
 * - CharacterSummary: Resumen final del personaje (solo lectura)
 */
@Component({
  selector: 'app-root',
  imports: [
    IdentitySelector,
    ClasEquipSelector,
    AppearanceSelector,
    CharacterSummary
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
