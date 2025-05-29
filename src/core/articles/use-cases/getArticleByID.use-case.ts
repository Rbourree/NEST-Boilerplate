import { Inject } from "@nestjs/common";
import { ArticleRepository } from '../article.repository';
import { Article } from '../article.entity';

export class GetArticleByIDUseCase {
  constructor(@Inject('ArticleRepository') private readonly articleRepository: ArticleRepository) {}

  /**
   * Executes the use case to retrieve an article by its ID.
   * @param id_article - The ID of the article to retrieve.
   * @returns The corresponding article or null if it does not exist.
   */
  async execute(id_article: string): Promise<Article | null> {
    const article = await this.articleRepository.findById(id_article);
    return article;
  }
}
