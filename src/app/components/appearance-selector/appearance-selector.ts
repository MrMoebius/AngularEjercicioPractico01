import { Component, inject, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CharacterBuild } from '../../services/character-build';

/**
 * Componente para configurar la apariencia del personaje.
 * Permite introducir una descripción física del personaje y
 * una URL de imagen. Solo gestiona los datos relacionados con la apariencia.
 */
@Component({
  selector: 'app-appearance-selector',
  imports: [FormsModule],
  templateUrl: './appearance-selector.html',
  styleUrl: './appearance-selector.css',
})
export class AppearanceSelector {
  private readonly characterService = inject(CharacterBuild);
  
  /**
   * Signal de solo lectura con el estado actual del personaje.
   * Se usa para sincronizar los campos del formulario con el servicio.
   */
  character = this.characterService.getCharacter();
  
  /**
   * Descripción física del personaje introducida por el usuario.
   */
  descripcion: string = '';
  
  /**
   * URL de la imagen del personaje introducida por el usuario.
   */
  imagen: string = '';

  /**
   * Indica si hubo un error al cargar la imagen.
   */
  imageError: boolean = false;

  /**
   * Constructor que sincroniza los campos del formulario con el servicio.
   * Usa effect() para reaccionar automáticamente cuando el servicio cambia,
   * permitiendo que el formulario se actualice cuando se reinicia el personaje.
   */
  constructor() {
    effect(() => {
      const char = this.character();
      this.descripcion = char.descripcion;
      this.imagen = char.imagen;
      // Resetear el error cuando cambia la imagen
      this.imageError = false;
    });
  }

  /**
   * Se ejecuta cuando el usuario cambia la descripción física del personaje.
   * Actualiza el servicio con la nueva descripción.
   */
  onDescripcionChange() {
    this.characterService.updateDescripcion(this.descripcion);
  }

  /**
   * Se ejecuta cuando el usuario cambia la URL de la imagen del personaje.
   * Actualiza el servicio con la nueva URL de imagen.
   */
  onImagenChange() {
    this.imageError = false;
    this.characterService.updateImagen(this.imagen);
  }

  /**
   * Se ejecuta cuando hay un error al cargar la imagen.
   * @param event - Evento de error de la imagen
   */
  onImageError(event: Event) {
    this.imageError = true;
    console.error('Error al cargar la imagen:', this.imagen);
  }

  /**
   * Se ejecuta cuando la imagen se carga correctamente.
   */
  onImageLoad() {
    this.imageError = false;
  }

  /**
   * Se ejecuta cuando el usuario selecciona un archivo de imagen desde su ordenador.
   * Lee el archivo y lo convierte a una data URL (base64) para poder mostrarlo.
   * @param event - Evento de cambio del input file
   */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    
    if (!file) {
      return;
    }

    // Verificar que sea una imagen
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecciona un archivo de imagen válido.');
      return;
    }

    // Leer el archivo y convertirlo a data URL
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        this.imagen = result;
        this.onImagenChange();
      }
    };
    reader.onerror = () => {
      alert('Error al leer el archivo. Por favor, intenta con otro archivo.');
    };
    reader.readAsDataURL(file);
  }
}
