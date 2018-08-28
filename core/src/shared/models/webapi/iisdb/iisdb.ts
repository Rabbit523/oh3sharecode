export class NewSiteDb {
    db: string;
    key: string;
    login: string;
}

export class NewSite {
    Name: string;
    PhysicalPath: string;
    Port: number;
    SiteVd: string;
    Pin: string;
}

export class IISSiteEntity {
    Name: string;
    Id: number;
    State: string;
    Pool: string;
    List_url: Array<string>;
    VD_PhysicalPath: Array<string>;
}

export class IISSite {
    dbItem: NewSiteDb;
    item: NewSite;
    server: string;
    Sites: Array<IISSiteEntity>;
}