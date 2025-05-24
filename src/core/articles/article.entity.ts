
export class Article {
    public readonly id_article: string
    public title: string
    public content: string
    public id_user: string
    public createdAt: Date
    public updatedAt: Date

    constructor(data: Partial<Article>) {
        Object.assign(this, data);
    }

    /**
     * @param {string} newTitle - The new title of the article.
     * @throws {Error} If the new title is empty.
     * @description Updates the title of the article.
     * @returns {void}
     */
    updateTitle(newTitle: string): void {
        if (!newTitle.trim()) {
            throw new Error('Title cannot be empty');
        }
        this.title = newTitle;
    }


    /**
     * @param {string} newContent - The new content of the article.
     * @throws {Error} If the new content is empty.
     * @description Updates the content of the article.
     * @returns {void}
     */
    updateContent(newContent: string): void {
        if (!newContent.trim()) {
            throw new Error('Content cannot be empty');
        }
        this.content = newContent;
    }

    /**
     * @description Updates the article with new data.
     * @param {Partial<Article>} data - The new data to update the article with.
     * @returns {void}
     */
    update(data: Partial<Article>): void {
        if (data.title) {
            this.updateTitle(data.title);
        }
        if (data.content) {
            this.updateContent(data.content);
        }
        this.updatedAt = new Date();
    }

}