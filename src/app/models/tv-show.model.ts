import { BaseModel } from './base.model';
import { GeneresModel } from './generes.model';

export class TvShowModel extends BaseModel {
    original_language: string;
    original_name: string;
    name: string;
    episode_run_time: Array<number>;
    constructor(data: {
        original_language?: string;
        original_name?: string;
        name?: string;
        vote_average?: number;
        overview?: string;
        episode_run_time?: Array<number>;
        popularity?: number;
        vote_count?: number;
        poster_path?: string;
        id?: number;
        adult?: boolean;
        // backdrop_path?: string;
        release_date?: string
        genres?: Array<GeneresModel>;
        origin_country?: Array<string>;
        homepage?: string;
    } = {}) {
        super(data);
        this.original_name = data.original_name;
        this.name = data.name;
        this.episode_run_time = data.episode_run_time;
    }
}
