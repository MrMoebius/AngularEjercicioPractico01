import { Injectable, signal } from '@angular/core';
import { CharacterImage } from '../models/character-image';

@Injectable({
    providedIn: 'root',
})
export class CharacterImageStore {

    readonly images = signal<CharacterImage[]>(this.seed());

    readonly selectedId = signal<string>(this.images()[0]?.id ?? '');

    get selected(): CharacterImage | null {
        const id = this.selectedId();
        return this.images().find(image => image.id === id) || null;
    }

    selectImage(id: string) {
        this.selectedId.set(id);
    }

    getImagesByTag(tag: string): CharacterImage[] {
        return this.images().filter(image => image.tags.includes(tag));
    }

    getImagesByTags(tags: string[]): CharacterImage[] {
        return this.images().filter(image => 
            tags.some(tag => image.tags.includes(tag))
        );
    }

    getAllTags(): string[] {
        const allTags = this.images().flatMap(image => image.tags);
        return [...new Set(allTags)].sort();
    }

    getFilteredImages(filtros: { raza?: string, genero?: string, clase?: string, arma?: string }): CharacterImage[] {
        let filtered = this.images();
        
        if (filtros.raza) {
            const razaNorm = this.normalizeTag(filtros.raza);
            const razasVariantes = [razaNorm];
            if (razaNorm === 'sobrenatural') {
                razasVariantes.push('ente');
            }
            if (razaNorm === 'ente') {
                razasVariantes.push('sobrenatural');
            }
            if (razaNorm === 'orco') {
                razasVariantes.push('ogro');
            }
            if (razaNorm === 'ogro') {
                razasVariantes.push('orco');
            }
            filtered = filtered.filter(image => 
                razasVariantes.some(r => image.tags.some(tag => this.normalizeTag(tag) === r))
            );
        }
        
        if (filtros.genero) {
            const generoNorm = this.normalizeTag(filtros.genero);
            const generosVariantes = [generoNorm];
            if (generoNorm === 'masculino') {
                generosVariantes.push('masc', 'mas');
            }
            if (generoNorm === 'femenino') {
                generosVariantes.push('fem', 'femenina');
            }
            filtered = filtered.filter(image => 
                generosVariantes.some(g => image.tags.some(tag => this.normalizeTag(tag) === g))
            );
        }
        
        if (filtros.clase) {
            const claseNorm = this.normalizeTag(filtros.clase);
            filtered = filtered.filter(image => 
                image.tags.some(tag => this.normalizeTag(tag) === claseNorm)
            );
        }
        
        if (filtros.arma) {
            const armaNorm = this.normalizeTag(filtros.arma);
            const armasVariantes = [armaNorm];
            if (armaNorm.includes('baculo') || armaNorm.includes('baston')) {
                armasVariantes.push('baculo', 'baston', 'báculo', 'bastón');
            }
            if (armaNorm.includes('daga')) {
                armasVariantes.push('daga', 'dagas');
            }
            if (armaNorm.includes('espada')) {
                armasVariantes.push('espada');
                if (armaNorm.includes('escudo') || armaNorm.includes('y')) {
                    armasVariantes.push('espadayescudo', 'espada y escudo');
                }
            }
            if (armaNorm.includes('arco')) {
                armasVariantes.push('arco');
            }
            if (armaNorm.includes('hacha')) {
                armasVariantes.push('hacha');
            }
            if (armaNorm.includes('maza') || armaNorm.includes('martillo')) {
                armasVariantes.push('maza', 'martillo');
            }
            if (armaNorm.includes('lanza')) {
                armasVariantes.push('lanza');
            }
            if (armaNorm.includes('fuego')) {
                armasVariantes.push('fuego');
            }
            if (armaNorm.includes('guadana') || armaNorm.includes('guadaña')) {
                armasVariantes.push('guadana', 'guadaña');
            }
            if (armaNorm.includes('ballesta')) {
                armasVariantes.push('ballesta');
            }
            if (armaNorm.includes('escudo') && armaNorm.includes('espada')) {
                armasVariantes.push('espadayescudo', 'espada y escudo');
            }
            filtered = filtered.filter(image => 
                armasVariantes.some(a => image.tags.some(tag => {
                    const tagNorm = this.normalizeTag(tag);
                    const tagOriginal = tag.toLowerCase();
                    return tagNorm === a || tagOriginal === a || tagNorm.includes(a) || a.includes(tagNorm);
                }))
            );
        }
        
        return filtered;
    }

    getRazasDisponibles(filtros?: { genero?: string, clase?: string, arma?: string }): string[] {
        const razasMap: { [key: string]: string } = {
            'humano': 'Humano',
            'elfo': 'Elfo',
            'orco': 'Orco',
            'enano': 'Enano',
            'bestia': 'Bestia',
            'celestial': 'Celestial',
            'demoníaco': 'Demoníaco',
            'demoniaco': 'Demoníaco',
            'sobrenatural': 'Sobrenatural',
            'ente': 'Sobrenatural',
            'ogro': 'Orco'
        };
        const razas = new Set<string>();
        const filteredImages = filtros ? this.getFilteredImages(filtros) : this.images();
        
        filteredImages.forEach(image => {
            image.tags.forEach(tag => {
                const normalized = this.normalizeTag(tag);
                if (razasMap[normalized]) {
                    razas.add(razasMap[normalized]);
                }
            });
        });
        return Array.from(razas).sort();
    }

    getGenerosDisponibles(filtros?: { raza?: string, clase?: string, arma?: string }): string[] {
        const generos = new Set<string>();
        const filteredImages = filtros ? this.getFilteredImages(filtros) : this.images();
        
        filteredImages.forEach(image => {
            image.tags.forEach(tag => {
                const normalized = this.normalizeTag(tag);
                if (normalized === 'masculino' || normalized === 'masc' || normalized === 'mas') {
                    generos.add('Masculino');
                } else if (normalized === 'femenino' || normalized === 'femenina' || normalized === 'fem') {
                    generos.add('Femenino');
                }
            });
        });
        return Array.from(generos).sort();
    }

    getClasesDisponibles(filtros?: { raza?: string, genero?: string, arma?: string }): string[] {
        const clasesMap: { [key: string]: string } = {
            'arquero': 'Arquero',
            'asesino': 'Asesino',
            'barbaro': 'Bárbaro',
            'berserker': 'Berserker',
            'caballero': 'Caballero',
            'guerrero': 'Guerrero',
            'mago': 'Mago',
            'monje': 'Monje',
            'paladin': 'Paladín',
            'picaro': 'Pícaro',
            'bardo': 'Bardo',
            'clerigo': 'Clérigo',
            'samurai': 'Samurai',
            'ninja': 'Ninja',
            'pirata': 'Pirata'
        };
        const clases = new Set<string>();
        const filteredImages = filtros ? this.getFilteredImages(filtros) : this.images();
        
        filteredImages.forEach(image => {
            image.tags.forEach(tag => {
                const normalized = this.normalizeTag(tag);
                if (clasesMap[normalized]) {
                    clases.add(clasesMap[normalized]);
                }
            });
        });
        return Array.from(clases).sort();
    }

    getArmasDisponibles(filtros?: { raza?: string, genero?: string, clase?: string }): string[] {
        const armasMap: { [key: string]: string } = {
            'arco': 'Arco',
            'baculo': 'Báculo',
            'báculo': 'Báculo',
            'baston': 'Bastón',
            'bastón': 'Bastón',
            'daga': 'Dagas',
            'dagas': 'Dagas',
            'espada': 'Espada',
            'hacha': 'Hacha',
            'lanza': 'Lanza',
            'maza': 'Maza',
            'martillo': 'Martillo',
            'guadana': 'Guadaña',
            'guadaña': 'Guadaña',
            'ballesta': 'Ballesta',
            'fuego': 'Fuego',
            'espadayescudo': 'Espada y Escudo',
            'espada y escudo': 'Espada y Escudo'
        };
        const armas = new Set<string>();
        const filteredImages = filtros ? this.getFilteredImages(filtros) : this.images();
        
        filteredImages.forEach(image => {
            image.tags.forEach(tag => {
                const normalized = this.normalizeTag(tag);
                const tagLower = tag.toLowerCase();
                
                if (armasMap[normalized]) {
                    armas.add(armasMap[normalized]);
                } else if (normalized.includes('espadayescudo') || 
                          tagLower.includes('espada y escudo') ||
                          (normalized.includes('espada') && normalized.includes('escudo'))) {
                    armas.add('Espada y Escudo');
                } else if (normalized === 'fuego') {
                    armas.add('Fuego');
                }
            });
        });
        return Array.from(armas).sort();
    }

    private normalizeTag(tag: string): string {
        return tag
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]/g, '');
    }

    private seed(): CharacterImage[] {
        return [
            // Bestia
            {
                id: 'bestia-fem-arquero',
                name: 'Bestia Femenina Arquero',
                imageUrl: '/images/BestiaFemArquero.png',
                color: 'rgb(139, 69, 19)',
                tags: ['bestia', 'femenino', 'arquero', 'arco']
            },
            {
                id: 'bestia-masc-asesino',
                name: 'Bestia Masculino Asesino',
                imageUrl: '/images/BestiaMascAsesino.png',
                color: 'rgb(47, 79, 79)',
                tags: ['bestia', 'masculino', 'asesino', 'pícaro', 'lanza']
            },
            {
                id: 'bestia-masc-barbaro',
                name: 'Bestia Masculino Bárbaro',
                imageUrl: '/images/BestiaMascBarbabaro.png',
                color: 'rgb(139, 69, 19)',
                tags: ['bestia', 'masculino', 'bárbaro', 'berserker', 'maza']
            },
            {
                id: 'bestia-masc-guerrero',
                name: 'Bestia Masculino Guerrero',
                imageUrl: '/images/BestiaMascGuerrero.png',
                color: 'rgb(139, 69, 19)',
                tags: ['bestia', 'masculino', 'guerrero', 'espada', 'hacha']
            },
            {
                id: 'bestia-masc-mago',
                name: 'Bestia Masculino Mago',
                imageUrl: '/images/BestiaMascMago.png',
                color: 'rgb(75, 0, 130)',
                tags: ['bestia', 'masculino', 'mago', 'fuego']
            },
            {
                id: 'bestia-masc-monje',
                name: 'Bestia Masculino Monje',
                imageUrl: '/images/BestiaMascMonje.png',
                color: 'rgb(153, 113, 84)',
                tags: ['bestia', 'masculino', 'monje', 'fuego']
            },
            {
                id: 'bestia-masc-picaro',
                name: 'Bestia Masculino Pícaro',
                imageUrl: '/images/BestiaMascPicaro.png',
                color: 'rgb(47, 79, 79)',
                tags: ['bestia', 'masculino', 'pícaro', 'maza']
            },
            // Celestial
            {
                id: 'celestial-fem-caballero',
                name: 'Celestial Femenina Caballero',
                imageUrl: '/images/CelestialFemCaballero.png',
                color: 'rgb(255, 215, 0)',
                tags: ['celestial', 'femenino', 'caballero', 'paladín', 'espada']
            },
            {
                id: 'celestial-masc-caballero',
                name: 'Celestial Masculino Caballero',
                imageUrl: '/images/CelestialMascCaballero.png',
                color: 'rgb(255, 215, 0)',
                tags: ['celestial', 'masculino', 'caballero', 'paladín', 'espada', 'fuego']
            },
            // Demoníaco
            {
                id: 'demoniaco-fem-paladin',
                name: 'Demoníaco Femenina Paladín',
                imageUrl: '/images/DemoniacoFemPaladin.png',
                color: 'rgb(139, 0, 0)',
                tags: ['demoníaco', 'femenino', 'paladín', 'espada']
            },
            {
                id: 'demoniaco-fem-mago',
                name: 'Demoníaco Femenina Mago',
                imageUrl: '/images/DemoniacoFemMago.png',
                color: 'rgb(75, 0, 130)',
                tags: ['demoníaco', 'femenino', 'mago', 'báculo']
            },
            {
                id: 'demoniaco-masc-paladin',
                name: 'Demoniaco Masculino Paladín',
                imageUrl: '/images/DemoniacoMascPaladin.png',
                color: 'rgb(255, 215, 0)',
                tags: ['demoniaco', 'masculino', 'paladín', 'espada']
            },
            // Elfo
            {
                id: 'elfo-fem-arquero',
                name: 'Elfo Femenina Arquero',
                imageUrl: '/images/ElfoFemArquero.png',
                color: 'rgb(34, 139, 34)',
                tags: ['elfo', 'femenino', 'arquero', 'arco']
            },
            {
                id: 'elfo-fem-asesino-dagas',
                name: 'Elfo Femenina Asesino Dagas',
                imageUrl: '/images/ElfoFemAsesinoDagas.png',
                color: 'rgb(47, 79, 79)',
                tags: ['elfo', 'femenino', 'asesino', 'pícaro', 'dagas']
            },
            {
                id: 'elfo-fem-asesino-espada',
                name: 'Elfo Femenina Asesino Espada',
                imageUrl: '/images/ElfoFemAsesinoEspada.png',
                color: 'rgb(47, 79, 79)',
                tags: ['elfo', 'femenino', 'asesino', 'espada']
            },
            {
                id: 'elfo-fem-caballero',
                name: 'Elfo Femenina Caballero',
                imageUrl: '/images/ElfoFemCaballero.png',
                color: 'rgb(153, 113, 84)',
                tags: ['elfo', 'femenino', 'caballero', 'guerrero', 'espada y escudo']
            },
            {
                id: 'elfo-fem-caballero-espada',
                name: 'Elfo Femenina Caballero Espada',
                imageUrl: '/images/ElfoFemCaballeroEspada.png',
                color: 'rgb(153, 113, 84)',
                tags: ['elfo', 'femenino', 'caballero', 'guerrero', 'espada']
            },
            {
                id: 'elfo-fem-mago',
                name: 'Elfo Femenina Mago',
                imageUrl: '/images/ElfoFemMago.png',
                color: 'rgb(75, 0, 130)',
                tags: ['elfo', 'femenino', 'mago', 'báculo']
            },
            {
                id: 'elfo-fem-picaro-espada',
                name: 'Elfo Femenina Pícaro Espada',
                imageUrl: '/images/ElfoFemPicaroEspada.png',
                color: 'rgb(47, 79, 79)',
                tags: ['elfo', 'femenino', 'pícaro', 'espada']
            },
            {
                id: 'elfo-masc-arquero',
                name: 'Elfo Masculino Arquero',
                imageUrl: '/images/ElfoMascArquero.png',
                color: 'rgb(34, 139, 34)',
                tags: ['elfo', 'masculino', 'arquero', 'arco']
            },
            {
                id: 'elfo-masc-asesino',
                name: 'Elfo Masculino Asesino',
                imageUrl: '/images/ElfoMascAsesino.png',
                color: 'rgb(47, 79, 79)',
                tags: ['elfo', 'masculino', 'asesino', 'dagas']
            },
            {
                id: 'elfo-masc-asesino-espada',
                name: 'Elfo Masculino Asesino Espada',
                imageUrl: '/images/ElfoMascAsesinoEspada.png',
                color: 'rgb(47, 79, 79)',
                tags: ['elfo', 'masculino', 'asesino', 'espada']
            },
            {
                id: 'elfo-masc-monje',
                name: 'Elfo Masculino Monje',
                imageUrl: '/images/ElfoMascMonje.png',
                color: 'rgb(153, 113, 84)',
                tags: ['elfo', 'masculino', 'monje', 'bastón']
            },
            // Enano
            {
                id: 'enano-fem-bardo',
                name: 'Enano Femenina Bardo',
                imageUrl: '/images/EnanoFemBardo.png',
                color: 'rgb(139, 69, 19)',
                tags: ['enano', 'femenino', 'bardo', 'dagas']
            },
            {
                id: 'enano-fem-guerrero',
                name: 'Enano Femenina Guerrero',
                imageUrl: '/images/EnanoFemGuerrero.png',
                color: 'rgb(153, 113, 84)',
                tags: ['enano', 'femenino', 'guerrero', 'martillo']
            },
            {
                id: 'enano-mas-caballero',
                name: 'Enano Masculino Caballero',
                imageUrl: '/images/EnanoMasCaballero.png',
                color: 'rgb(153, 113, 84)',
                tags: ['enano', 'masculino', 'caballero', 'espada']
            },
            {
                id: 'enano-masc-barbaro',
                name: 'Enano Masculino Bárbaro',
                imageUrl: '/images/EnanoMascBarbaro.png',
                color: 'rgb(139, 69, 19)',
                tags: ['enano', 'masculino', 'bárbaro', 'berserker', 'martillo', 'maza']
            },  
            {
                id: 'enano-masc-guerrero',
                name: 'Enano Masculino Guerrero',
                imageUrl: '/images/EnanoMascGuerrero.png',
                color: 'rgb(153, 113, 84)',
                tags: ['enano', 'masculino', 'guerrero', 'hacha']
            },
            {
                id: 'enano-masc-mago',
                name: 'Enano Masculino Mago',
                imageUrl: '/images/EnanoMascMago.png',
                color: 'rgb(75, 0, 130)',
                tags: ['enano', 'masculino', 'mago', 'báculo']
            },
            // Humano
            {
                id: 'humano-fem-berserker-martillo',
                name: 'Humano Femenina Berserker Martillo',
                imageUrl: '/images/HumanoFemBerserkerMartillo.png',
                color: 'rgb(139, 69, 19)',
                tags: ['humano', 'femenino', 'bárbaro', 'berserker', 'maza', 'martillo']
            },
            {
                id: 'humano-fem-caballero',
                name: 'Humano Femenina Caballero',
                imageUrl: '/images/HumanoFemCaballero.png',
                color: 'rgb(153, 113, 84)',
                tags: ['humano', 'femenino', 'caballero', 'guerrero', 'espada y escudo']
            },
            {
                id: 'humano-fem-guerrero-tribal',
                name: 'Humano Femenina Guerrero Tribal',
                imageUrl: '/images/HumanoFemGuerreroTribal.png',
                color: 'rgb(139, 69, 19)',
                tags: ['humano', 'femenino', 'guerrero', 'espada', 'guadaña']
            },
            {
                id: 'humano-fem-mago',
                name: 'Humano Femenina Mago',
                imageUrl: '/images/HumanoFemMago.png',
                color: 'rgb(75, 0, 130)',
                tags: ['humano', 'femenino', 'mago', 'báculo']
            },
            {
                id: 'humano-fem-ninja',
                name: 'Humano Femenina Ninja',
                imageUrl: '/images/HumanoFemNinja.png',
                color: 'rgb(47, 79, 79)',
                tags: ['humano', 'femenino', 'ninja', 'espada']
            },
            {
                id: 'humano-fem-pirata',
                name: 'Humano Femenina Pirata',
                imageUrl: '/images/HumanoFemPirata.png',
                color: 'rgb(47, 79, 79)',
                tags: ['humano', 'femenino', 'pirata', 'espada']
            },
            {
                id: 'humano-fem-samurai',
                name: 'Humano Femenina Samurai',
                imageUrl: '/images/HumanoFemSamurai.png',
                color: 'rgb(153, 113, 84)',
                tags: ['humano', 'femenino', 'samurai', 'espada']
            },
            {
                id: 'humano-ferm-asesino',
                name: 'Humano Femenina Asesino',
                imageUrl: '/images/HumanoFermAsesino.png',
                color: 'rgb(47, 79, 79)',
                tags: ['humano', 'femenino', 'asesino', 'dagas']
            },
            {
                id: 'humano-masc-arquero',
                name: 'Humano Masculino Arquero',
                imageUrl: '/images/HumanoMascArquero.png',
                color: 'rgb(34, 139, 34)',
                tags: ['humano', 'masculino', 'arquero', 'arco']
            },
            {
                id: 'humano-masc-asesino',
                name: 'Humano Masculino Asesino',
                imageUrl: '/images/HumanoMascAsesino.png',
                color: 'rgb(47, 79, 79)',
                tags: ['humano', 'masculino', 'asesino', 'dagas']
            },
            {
                id: 'humano-masc-berserker-hacha',
                name: 'Humano Masculino Berserker Hacha',
                imageUrl: '/images/HumanoMascBerserkerHacha.png',
                color: 'rgb(139, 69, 19)',
                tags: ['humano', 'masculino', 'bárbaro', 'berserker', 'hacha']
            },
            {
                id: 'humano-masc-berserker-maza',
                name: 'Humano Masculino Berserker Maza',
                imageUrl: '/images/HumanoMascBerserkerMaza.png',
                color: 'rgb(139, 69, 19)',
                tags: ['humano', 'masculino', 'bárbaro', 'berserker', 'hacha','espada']
            },
            {
                id: 'humano-masc-caballero',
                name: 'Humano Masculino Caballero',
                imageUrl: '/images/HumanoMascCaballero.png',
                color: 'rgb(153, 113, 84)',
                tags: ['humano', 'masculino', 'caballero', 'maza', 'espada y escudo']
            },
            {
                id: 'humano-masc-cabellero',
                name: 'Humano Masculino Caballero',
                imageUrl: '/images/HumanoMascCabellero.png',
                color: 'rgb(153, 113, 84)',
                tags: ['humano', 'masculino', 'caballero', 'espada']
            },
            {
                id: 'humano-masc-guerrero',
                name: 'Humano Masculino Guerrero',
                imageUrl: '/images/HumanoMascGuerrero.png',
                color: 'rgb(153, 113, 84)',
                tags: ['humano', 'masculino', 'guerrero', 'espada', 'espada y escudo']
            },
            {
                id: 'humano-masc-guerrero-espada',
                name: 'Humano Masculino Guerrero Espada',
                imageUrl: '/images/HumanoMascGuerreroEspada.png',
                color: 'rgb(153, 113, 84)',
                tags: ['humano', 'masculino', 'guerrero', 'espada']
            },
            {
                id: 'humano-masc-guerrero-tribal',
                name: 'Humano Masculino Guerrero Tribal',
                imageUrl: '/images/HumanoMascGuerreroTribal.png',
                color: 'rgb(139, 69, 19)',
                tags: ['humano', 'masculino', 'guerrero', 'lanza', 'espada y escudo']
            },
            {
                id: 'humano-masc-mago',
                name: 'Humano Masculino Mago',
                imageUrl: '/images/HumanoMascMago.png',
                color: 'rgb(75, 0, 130)',
                tags: ['humano', 'masculino', 'mago', 'báculo', 'bastón', 'fuego']
            },
            {
                id: 'humano-masc-monje',
                name: 'Humano Masculino Monje',
                imageUrl: '/images/HumanoMascMonje.png',
                color: 'rgb(153, 113, 84)',
                tags: ['humano', 'masculino', 'monje', 'bastón']
            },
            {
                id: 'humano-masc-ninja',
                name: 'Humano Masculino Ninja',
                imageUrl: '/images/HumanoMascNinja.png',
                color: 'rgb(47, 79, 79)',
                tags: ['humano', 'masculino', 'ninja', 'espada','guadaña']
            },
            {
                id: 'humano-masc-paladin',
                name: 'Humano Masculino Paladín',
                imageUrl: '/images/HumanoMascPaladin.png',
                color: 'rgb(255, 215, 0)',
                tags: ['humano', 'masculino', 'paladín', 'espada y escudo', 'lanza']
            },
            {
                id: 'humano-masc-paladin-espada',
                name: 'Humano Masculino Paladín Espada',
                imageUrl: '/images/HumanoMascPaladinEspada.png',
                color: 'rgb(255, 215, 0)',
                tags: ['humano', 'masculino', 'paladín', 'espada', 'espada y escudo']
            },
            {
                id: 'humano-masc-picaro',
                name: 'Humano Masculino Pícaro',
                imageUrl: '/images/HumanoMascPicaro.png',
                color: 'rgb(47, 79, 79)',
                tags: ['humano', 'masculino', 'pícaro', 'dagas']
            },
            {
                id: 'humano-masc-pirata',
                name: 'Humano Masculino Pirata',
                imageUrl: '/images/HumanoMascPirata.png',
                color: 'rgb(47, 79, 79)',
                tags: ['humano', 'masculino', 'pirata', 'espada','dagas']
            },
            {
                id: 'humano-masc-samurai',
                name: 'Humano Masculino Samurai',
                imageUrl: '/images/HumanoMascSamurai.png',
                color: 'rgb(153, 113, 84)',
                tags: ['humano', 'masculino', 'samurai', 'espada']
            },
            {
                id: 'humano-mujer-caballero',
                name: 'Humano Femenina Caballero',
                imageUrl: '/images/HumanoMujerCaballero.png',
                color: 'rgb(153, 113, 84)',
                tags: ['humano', 'femenino', 'caballero', 'espada y escudo']
            },
            // Ogro
            {
                id: 'ogro-masc-asesino',
                name: 'Ogro Masculino Asesino',
                imageUrl: '/images/OgroMascAsesino.png',
                color: 'rgb(85, 107, 47)',
                tags: ['orco', 'masculino', 'asesino', 'lanza']
            },
            {
                id: 'ogro-masc-guerrero',
                name: 'Ogro Masculino Guerrero',
                imageUrl: '/images/OgroMascGuerrero.png',
                color: 'rgb(85, 107, 47)',
                tags: ['orco', 'masculino', 'guerrero', 'maza']
            },
            {
                id: 'ogro-masc-paladin',
                name: 'Ogro Masculino Paladín',
                imageUrl: '/images/OgroMascPaladin.png',
                color: 'rgb(255, 215, 0)',
                tags: ['orco', 'masculino', 'paladín', 'maza']
            },
            // Orco
            {
                id: 'orco-fem-asesino',
                name: 'Orco Femenina Asesino',
                imageUrl: '/images/OrcoFemAsesino.png',
                color: 'rgb(47, 79, 79)',
                tags: ['orco', 'femenino', 'asesino', 'dagas']
            },
            {
                id: 'orco-fem-barrbaro',
                name: 'Orco Femenina Bárbaro',
                imageUrl: '/images/OrcoFemBarrbaro.png',
                color: 'rgb(139, 69, 19)',
                tags: ['orco', 'femenino', 'bárbaro', 'berserker', 'hacha']
            },
            {
                id: 'orco-fem-guerrero',
                name: 'Orco Femenina Guerrero',
                imageUrl: '/images/OrcoFemGuerrero.png',
                color: 'rgb(85, 107, 47)',
                tags: ['orco', 'femenino', 'guerrero', 'hacha','espada']
            },
            {
                id: 'orco-masc-arquero',
                name: 'Orco Masculino Arquero',
                imageUrl: '/images/OrcoMascArquero.png',
                color: 'rgb(34, 139, 34)',
                tags: ['orco', 'masculino', 'arquero', 'arco', 'ballesta','daga']
            },
            {
                id: 'orco-masc-berserker',
                name: 'Orco Masculino Berserker',
                imageUrl: '/images/OrcoMascBerserker.png',
                color: 'rgb(139, 69, 19)',
                tags: ['orco', 'masculino', 'bárbaro', 'berserker', 'hacha']
            },
            // Sobrenatural
            {
                id: 'sobrenatural-fem-mago',
                name: 'Sobrenatural Femenina Mago',
                imageUrl: '/images/SobrenaturalFemMago.png',
                color: 'rgb(75, 0, 130)',
                tags: ['sobrenatural', 'femenino', 'mago', 'báculo']
            },
            {
                id: 'sobrenatural-masc-asesino',
                name: 'Sobrenatural Masculino Asesino',
                imageUrl: '/images/SobrenaturalMascAsesino.png',
                color: 'rgb(47, 79, 79)',
                tags: ['sobrenatural', 'masculino', 'asesino', 'guadaña']
            },
            {
                id: 'sobrenatural-masc-bestia-mago',
                name: 'Sobrenatural Masculino Bestia Mago',
                imageUrl: '/images/SobrenaturalMascBestiaMago.png',
                color: 'rgb(75, 0, 130)',
                tags: ['sobrenatural', 'masculino', 'mago', 'báculo', 'fuego']
            },
            {
                id: 'sobrenatural-masc-guerrero',
                name: 'Sobrenatural Masculino Guerrero',
                imageUrl: '/images/SobrenaturalMascGuerrero.png',
                color: 'rgb(85, 107, 47)',
                tags: ['sobrenatural', 'masculino', 'guerrero', 'hacha']
            },
            {
                id: 'sobrenatural-masc-mago',
                name: 'Sobrenatural Masculino Mago',
                imageUrl: '/images/SobrenaturalMascMago.png',
                color: 'rgb(75, 0, 130)',
                tags: ['sobrenatural', 'masculino', 'mago', 'báculo', 'fuego']
            }
        ];
    }
}
