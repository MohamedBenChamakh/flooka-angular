import { UserShort } from "./UserShort";

export class Content {
    id: string;
    title: string;
    description: string;
    picture: string;
    createdAt: string;
    price: number;
    views: number;
    publisher: UserShort;

    constructor(id: string,
        title: string,
        description: string,
        picture: string,
        createdAt: string,
        contentStatus: string,
        contentType: string,
        price: number,
        resources: string,
        link: string,
        views: number,
        publisher: UserShort) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.picture = picture;
        this.createdAt = createdAt;
        this.price = price;
        this.views = views;
        this.publisher = publisher;
    }
}