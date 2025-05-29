import { Inject } from "@nestjs/common";
import { ArticleRepository } from '../article.repository';
import { Article } from '../article.entity';

export class DeleteArticleUseCase {
  constructor(@Inject('ArticleRepository') private readonly articleRepository: ArticleRepository) {}

  /**
   * Executes the use case to delete an existing article.
   * @param id_article - The ID of the article to delete.
   * @returns The deleted article or null in case of failure.
   */
  async execute(id_article: string): Promise<Article | null> {
    const article = await this.articleRepository.findById(id_article);
    if (!article) {
      throw new Error(`Article with ID ${id_article} not found`);
    }
    await this.articleRepository.delete(id_article);
    return article;
  }
}
