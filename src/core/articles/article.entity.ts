import { z } from "zod";

const ArticleProps = z.object({
    id_article: z.string().uuid(),
    title: z.string().min(2).max(100),
    content: z.string().min(10).max(5000),
    id_user: z.string().uuid(),
    createdAt: z.date(),
    updatedAt: z.date()
})
type ArticleProps = z.infer<typeof ArticleProps>;


/**
 * Article entity representing an article in the system.
 * @class Article
 * @description This class encapsulates the properties and behaviors of an article.
 * It includes methods for updating the title and content of the article.
 * @property {string} id_article - The unique identifier of the article.
 * @property {string} title - The title of the article.
 * @property {string} content - The content of the article.
 * @property {string} id_user - The identifier of the user who created the article.
 * @property {Date} createdAt - The date when the article was created.
 * @property {Date} updatedAt - The date when the article was last updated.
 */
export class Article {
    private readonly _id_article: string;
    private _title: string;
    private _content: string;
    private readonly _id_user: string;
    private _createdAt: Date;
    private _updatedAt: Date;

    private constructor(props: ArticleProps) {
        this._id_article = props.id_article;
        this._title = props.title;
        this._content = props.content;
        this._id_user = props.id_user;
        this._createdAt = props.createdAt;
        this._updatedAt = props.updatedAt;
    }


    /**
     * Create a new Article instance.
     * @param {ArticleProps} props - The properties of the article.
     * @returns {Article} A new Article instance.
     * @description Creates a new Article instance with the provided properties.
     */
    static create(props: ArticleProps) {
        return new Article(props);
    }

    get id_article(): string {
        return this._id_article;
    }

    get title(): string {
        return this._title;
    }

    get content(): string {
        return this._content;
    }

    get id_user(): string {
        return this._id_user;
    }
    
    get createdAt(): Date {
        return this._createdAt;
    }
    
    get updatedAt(): Date {
        return this._updatedAt;
    }

    toJSON() {
        return {
            id_article: this._id_article,
            title: this._title,
            content: this._content,
            id_user: this._id_user,
            createdAt: this._createdAt,
            updatedAt: this._updatedAt
        };
    }
}
