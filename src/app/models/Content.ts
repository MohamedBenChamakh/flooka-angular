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
    totalLikes: number;
    totalComments: number;

    constructor(id: string,
        title: string,
        description: string,
        media: string,
        mediaType: string,
        createdAt: string,
        price: number,
        views: number,
        publisher: User,
        totalLikes: number,
        totalComments: number) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.media = media;
        this.mediaType = mediaType;
        this.createdAt = createdAt;
        this.price = price;
        this.views = views;
        this.publisher = publisher;
        this.totalComments = totalComments;
        this.totalLikes = totalLikes
    }
}