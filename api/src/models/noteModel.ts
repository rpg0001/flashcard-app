export class Note {
    id: number;
    title: string;
    content: string;
    userId: number;

    constructor(id: number, title: string, content: string, userId: number) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.userId = userId;
    }
}