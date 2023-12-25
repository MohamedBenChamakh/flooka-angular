import { UserShort } from "./UserShort";

export class Content {
    id: string;
    title: string;
    description: string;
    media: string;
    mediaType: string;
    createdAt: string;
    price: number;
    views: number;
    publisher: UserShort;

    constructor(id: string,
        title: string,
        description: string,
        media: string,
        mediaType: string,
        createdAt: string,
        price: number,
        views: number,
        publisher: UserShort) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.media = media;
        this.mediaType = mediaType;
        this.createdAt = createdAt;
        this.price = price;
        this.views = views;
        this.publisher = publisher;
    }
}