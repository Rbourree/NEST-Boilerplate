import { Inject } from "@nestjs/common";
import { ArticleRepository } from '../article.repository';
import { Article } from '../article.entity';

export class GetAllArticlesUseCase {
  constructor(@Inject('ArticleRepository') private readonly articleRepository: ArticleRepository) {}

  /**
   * Executes the use case to retrieve all articles.
   * @returns An array of articles or an empty array if none exist.
   */
  async execute(): Promise<Article[]> {
    const articles = await this.articleRepository.findAll();
    return articles;
  }
}
