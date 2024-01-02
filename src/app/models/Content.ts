import { User } from "./User";

export class Content {
    id: string;
    title: string;
    description: string;
    media: string;
    mediaType: string;
    createdAt: string;
    price: number;
    views: number;
    publisher: User;

    constructor(id: string,
        title: string,
        description: string,
        media: string,
        mediaType: string,
        createdAt: string,
        price: number,
        views: number,
        publisher: User) {
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