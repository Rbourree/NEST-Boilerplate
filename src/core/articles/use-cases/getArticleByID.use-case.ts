import { Injectable } from '@nestjs/common';
import { ArticleRepository } from '../article.repository';
import { Article } from '../article.entity';

@Injectable()
export class GetArticleByIDUseCase {
  constructor(private readonly articleRepository: ArticleRepository) {}

  /**
   * Exécute le cas d'utilisation pour récupérer un article par son ID.
   * @param id_article - L'ID de l'article à récupérer.
   * @returns L'article correspondant ou null s'il n'existe pas.
   */
  async execute(id_article: string): Promise<Article | null> {
    const article = await this.articleRepository.findById(id_article);
    return article;
  }
}
