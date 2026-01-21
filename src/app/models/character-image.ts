/**
 * Modelo de datos que representa una imagen de personaje disponible.
 */
export interface CharacterImage {
    /** Identificador único de la imagen */
    id: string;
    /** Nombre descriptivo de la imagen */
    name: string;
    /** URL de la imagen (ruta relativa desde la raíz) */
    imageUrl: string;
    /** Color asociado a la imagen (formato RGB o hex) */
    color: string;
    /** Tags/etiquetas que identifican la imagen para filtrado y búsqueda */
    tags: string[];
}
