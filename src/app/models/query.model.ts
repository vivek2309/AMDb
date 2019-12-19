import { environment } from 'src/environments/environment';

export class QueryModel {
    language: string;
    query: string;
    page: number;
    include_adult: boolean;
    region: string;
    year: number;
    primary_release_year: number;
    constructor(data: {
        language?: string;
        query?: string;
        page?: number;
        include_adult?: boolean;
        region?: string;
        year?: number;
        primary_release_year?: number;
    } = {}) {
        this.language = data.language || environment.default_Language;
        this.query = data.query;
        this.page = data.page || 1;
        this.include_adult = data.include_adult || false;
        this.region = data.region || '';
        this.year = data.year;
        this.primary_release_year = data.primary_release_year;
    }
}
