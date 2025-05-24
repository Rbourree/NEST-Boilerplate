import { ArticleRepository } from '../article.repository';
import { Article } from '../article.entity';

export class DeleteArticleUseCase {
  constructor(private readonly articleRepository: ArticleRepository) {}

  /**
   * Exécute le cas d'utilisation pour supprimer un article existant.
   * @param id_article - L'ID de l'article à supprimer.
   * @returns L'article supprimé ou null en cas d'échec.
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
