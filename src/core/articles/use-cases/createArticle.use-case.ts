import { ArticleRepository } from '../article.repository';
import { Article } from '../article.entity';

export class CreateArticleUseCase {
  constructor(private readonly articleRepository: ArticleRepository) {}

  /**
   * Exécute le cas d'utilisation pour créer un nouvel article.
   * @param articleData - Les données de l'article à créer.
   * @returns L'article créé ou null en cas d'échec.
   */
  async execute(articleData: Article): Promise<Article | null> {
    const article = await this.articleRepository.create(articleData);
    return article;
  }
}
