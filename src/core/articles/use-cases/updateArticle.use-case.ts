import { ArticleRepository } from '../article.repository';
import { Article } from '../article.entity';

export class UpdateArticleUseCase {
  constructor(private readonly articleRepository: ArticleRepository) {}

  /**
   * Exécute le cas d'utilisation pour mettre à jour un article existant.
   * @param id_article - L'ID de l'article à mettre à jour.
   * @param articleData - Les nouvelles données de l'article.
   * @returns L'article mis à jour ou null en cas d'échec.
   */
  async execute(id_article: string, articleData: Partial<Article>): Promise<Article | null> {
    const article = await this.articleRepository.update(id_article, articleData);
    return article;
  }
}