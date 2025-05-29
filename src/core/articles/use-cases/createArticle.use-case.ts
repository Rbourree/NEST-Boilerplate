import { Inject } from "@nestjs/common";
import { ArticleRepository } from '../article.repository';
import { Article } from '../article.entity';

export class CreateArticleUseCase {
  constructor(@Inject('ArticleRepository') private readonly articleRepository: ArticleRepository) {}

  /**
   * Executes the use case to create a new article.
   * @param articleData - The data of the article to be created.
   * @returns The created article or null in case of failure.
   */
  async execute(articleData: Article): Promise<Article | null> {    
    const article = await this.articleRepository.create(articleData);
    return article;
  }
}
