import { User } from "./User";
import { Content } from "./Content";

export class Like {
    id: string;
    user: User;
    content : Content;

    constructor(
        id: string,
        user: User,
        content: Content) {
        this.id = id;
        this.user = user;
        this.content = content;
    }
}