import { Article } from './article.entity';

export abstract class ArticleRepository {

    constructor() {}

    /**
     * Creates a new article.
     * @param article - The article to create.
     * @returns A promise that resolves to the created article.
     */
    abstract create(article: Article): Promise<Article>;
    /**
     * Finds an article by its ID.
     * @param id_article - The ID of the article to find.
     * @returns A promise that resolves to the article if found, or null if not found.
     */
    abstract findById(id_article: string): Promise<Article | null>;
    /**
     * Finds all articles.
     * @returns A promise that resolves to an array of articles.
     */
    abstract findAll(): Promise<Article[]>;
    /**
     * Deletes an article by its ID.
     * @param id_article - The ID of the article to delete.
     * @returns A promise that resolves when the article is deleted.
     */
    abstract delete(id_article: string): Promise<void>;
    /**
     * Updates an article.
     * @param id_article - The ID of the article to update.
     * @param article - The article data to update.
     * @returns A promise that resolves to the updated article, or null if not found.
     */
    abstract update(id_article: string, article: Partial<Article>): Promise<Article | null>;
}