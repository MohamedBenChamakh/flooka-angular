export class Content {
    id: string;
    title: string;
    description: string;
    picture: string;
    createdAt: string;
    contentStatus: string;
    contentType: string;
    price: number;
    resources: string;
    link: string;

    constructor(id: string,
        title: string,
        description: string,
        picture: string,
        createdAt: string,
        contentStatus: string,
        contentType: string,
        price: number,
        resources: string,
        link: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.picture = picture;
        this.createdAt = createdAt;
        this.contentStatus = contentStatus;
        this.contentType = contentType;
        this.price = price;
        this.link = link;
        this.resources = resources;
    }
}