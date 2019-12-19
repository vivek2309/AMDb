export class CompanyModel {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
    constructor(data: {
        id?: number;
        name?: string;
        logo_path?: string;
        origin_country?: string;
    } = {}) {
        this.id = data.id;
        this.name = data.name;
        this.logo_path = data.logo_path;
        this.origin_country = data.origin_country;
    }
}
