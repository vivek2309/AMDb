import { MovieModel } from './movie.model';
import { BaseModel } from './base.model';
import { GeneresModel } from './generes.model';
import { environment } from 'src/environments/environment';

export class PeopleModel extends BaseModel {
    known_for_department: string;
    gender: number;
    profile_path: string;
    known_for: Array<MovieModel>;
    biography: string;
    also_known_as: Array<string>;
    name: string;
    birthday: Date;
    popularity: number;
    constructor(data: {
        known_for_department?: string;
        gender?: number;
        profile_path?: string;
        known_for?: Array<MovieModel>;
        name?: string;
        biography?: string;
        popularity?: number;
        vote_count?: number;
        birthday?: string;
        poster_path?: string;
        id?: number;
        adult?: boolean;
        // backdrop_path?: string;
        original_language?: string;
        also_known_as?: Array<string>;

        release_date?: string
        genres?: Array<GeneresModel>;
        vote_average?: number;
        overview?: string;
        origin_country?: Array<string>;
        homepage?: string;
    } = {}) {
        super(data);
        this.known_for_department = data.known_for_department;
        this.gender = data.gender;
        this.profile_path = data.profile_path ? environment.poster_url + data.profile_path : '';
        this.known_for = data.known_for;
        this.biography = data.biography;
        this.birthday = data.birthday ? new Date(data.birthday) : undefined;
        this.name = data.name;
        this.also_known_as = data.also_known_as || [];
        this.popularity = data.popularity;
    }
}
