import { BaseModel } from './base.model';
import { GeneresModel } from './generes.model';

export class MovieModel extends BaseModel {
    original_language: string;
    original_title: string;
    title: string;
    release_date: Date;
    revenue: string;
    production_companies: Array<any>;
    runtime: number;
    status: string;
    constructor(data: {
        original_title?: string;
        title?: string;
        genre_ids?: Array<number>;
        revenue?: string;
        runtime?: number;
        status?: string;
        popularity?: number;
        vote_count?: number;
        poster_path?: string;
        id?: number;
        adult?: boolean;
        // backdrop_path?: string;
        original_language?: string;
        release_date?: string
        genres?: Array<GeneresModel>;
        vote_average?: number;
        overview?: string;
        origin_country?: Array<string>;
        homepage?: string;
    } = {}) {
        super(data);
        this.original_title = data.original_title;
        this.title = data.title;
        this.revenue = data.revenue;
        this.runtime = data.runtime;
        this.status = data.status;
    }
}
