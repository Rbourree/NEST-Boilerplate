import { Inject } from "@nestjs/common";
import { ArticleRepository } from '../article.repository';
import { Article } from '../article.entity';

export class UpdateArticleUseCase {
  constructor(@Inject('ArticleRepository') private readonly articleRepository: ArticleRepository) {}

  /**
   * Executes the use case to update an existing article.
   * @param id_article - The ID of the article to update.
   * @param articleData - The new data for the article.
   * @returns The updated article or null in case of failure.
   */
  async execute(id_article: string, articleData: Partial<Article>): Promise<Article | null> {
    const article = await this.articleRepository.findById(id_article);
    if (!article) {
      throw new Error(`Article with ID ${id_article} not found`);
    }

    const updatedArticle = await this.articleRepository.update(id_article, articleData);
    if (!updatedArticle) {
      throw new Error(`Failed to update article with ID ${id_article}`);
    }
    return updatedArticle;
  }
}