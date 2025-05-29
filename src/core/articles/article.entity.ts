import { z, ZodType } from "zod";
import { User } from "../users/user.entity";

const UserInstanceSchema: ZodType<User> = z.custom<User>(
  (val) => val instanceof User,
  { message: 'author must be a User instance' },
);

const ArticleProps = z.object({
    id_article: z.string().uuid(),
    title: z.string().min(2).max(100),
    content: z.string().min(10).max(5000),
    author: UserInstanceSchema, 
    createdAt: z.date(),
    updatedAt: z.date(),
})
type ArticleProps = z.infer<typeof ArticleProps>;


/**
 * Article entity representing an article in the system.
 * @class Article
 * @description This class encapsulates the properties and behaviors of an article.
 * @property {string} id_article - The unique identifier of the article.
 * @property {string} title - The title of the article.
 * @property {string} content - The content of the article.
 * @property {User} author - The author of the article.
 * @property {Date} createdAt - The date when the article was created.
 * @property {Date} updatedAt - The date when the article was last updated.
 */
export class Article {
    private readonly _id_article: string;
    private _title: string;
    private _content: string;
    private readonly _author: User;
    private _createdAt: Date;
    private _updatedAt: Date;

    private constructor(props: ArticleProps) {
        this._id_article = props.id_article;
        this._title = props.title;
        this._content = props.content;
        this._author = props.author;
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
        try {
            ArticleProps.parse(props);
            return new Article(props);
        } catch (error) {
            if (error instanceof z.ZodError) {
                throw new Error(`Validation error: ${error.errors.map(e => e.message).join(', ')}`);
            }
            throw error;
        }
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

    get author(): User {
        return this._author;
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
            author: this._author,
            createdAt: this._createdAt,
            updatedAt: this._updatedAt,
        };
    }
}
