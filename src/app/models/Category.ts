export class Category {
    id?: string;
    title?: string;
    icon?: string;
    description?: string;

    constructor(id?: string, title?: string, icon?: string, description?: string) {
        this.id = id;
        this.title = title;
        this.icon = icon;
        this.description = description;
    }
}