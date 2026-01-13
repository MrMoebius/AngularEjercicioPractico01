/**
 * Modelo de datos que representa la estructura completa de un personaje de videojuego.
 * Este tipo define todos los campos necesarios para configurar un personaje
 * antes de comenzar una partida.
 */
export type Character = {
    /** Nombre del personaje */
    nombre: string;
    /** Raza del personaje (ej: Humano, Elfo, Orco, etc.) */
    raza: string;
    /** Clase del personaje (ej: Guerrero, Mago, Arquero, etc.) */
    clase: string;
    /** Arma inicial del personaje */
    arma: string;
    /** Descripción física del personaje */
    descripcion: string;
    /** URL de la imagen del personaje */
    imagen: string;
};
