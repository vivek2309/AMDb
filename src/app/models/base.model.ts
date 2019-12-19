import {environment} from '../../environments/environment';
import { GeneresModel } from './generes.model';
export class BaseModel {
    popularity: number;
    vote_count: number;
    poster_path: string;
    id: number;
    adult: boolean;
    // backdrop_path: string;
    original_language: string;
    production_companies: Array<any>;
    production_countries: Array<any>;
    vote_average: number;
    overview: string;
    genres: Array<GeneresModel>;
    release_date: Date;
    origin_country: Array<string>;
    homepage: string;
    constructor(data: {
        popularity?: number;
        vote_count?: number;
        poster_path?: string;
        id?: number;
        adult?: boolean;
        production_companies?: Array<any>;
        production_countries?: Array<any>;

        // backdrop_path?: string;
        original_language?: string;
        release_date?: string
        genres?: Array<GeneresModel>;
        vote_average?: number;
        overview?: string;
        origin_country?: Array<string>;
        homepage?: string;
    } = {}) {
        this.popularity = data.popularity;
        this.vote_count = data.vote_count;
        this.poster_path = data.poster_path ? environment.poster_url + data.poster_path : '';
        this.id = data.id;
        this.adult = data.adult;
        this.original_language = data.original_language;
        this.genres = data.genres || [];
        this.vote_average = data.vote_average;
        this.release_date = data.release_date ? new Date(data.release_date) : undefined;
        this.overview = data.overview;
        this.origin_country = data.origin_country || [];
        this.homepage = data.homepage;
        this.production_companies = data.production_companies || [];
        this.production_countries = data.production_countries || [];
    }
}
