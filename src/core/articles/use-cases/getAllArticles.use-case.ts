import { ArticleRepository } from '../article.repository';
import { Article } from '../article.entity';

export class GetAllArticlesUseCase {
  constructor(private readonly articleRepository: ArticleRepository) {}

  /**
   * Exécute le cas d'utilisation pour récupérer tous les articles.
   * @returns Un tableau d'articles ou un tableau vide s'il n'y en a pas.
   */
  async execute(): Promise<Article[]> {
    const articles = await this.articleRepository.findAll();
    return articles;
  }
}
