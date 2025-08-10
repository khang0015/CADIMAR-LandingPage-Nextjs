import { db } from '../database/connection.js';
import { translations, languages, type Translation, type NewTranslation, type CreateTranslationData, type Language, type NewLanguage, type CreateLanguageData } from '../database/schema.js';
import { eq, desc, and, like, or, sql } from 'drizzle-orm';
import { nanoid } from 'nanoid';

export class TranslationService {
  /**
   * Get all translations
   */
  static async getAll(filters?: {
    lang?: string;
    category?: string;
    limit?: number;
    offset?: number;
  }) {
    const conditions = [];
    if (filters?.lang) conditions.push(eq(translations.lang, filters.lang));
    if (filters?.category) conditions.push(eq(translations.category, filters.category));
    
    if (conditions.length > 0) {
      return await db
        .select()
        .from(translations)
        .where(and(...conditions))
        .orderBy(translations.key, translations.lang)
        .limit(filters?.limit || 1000)
        .offset(filters?.offset || 0);
    } else {
      return await db
        .select()
        .from(translations)
        .orderBy(translations.key, translations.lang)
        .limit(filters?.limit || 1000)
        .offset(filters?.offset || 0);
    }
  }

  /**
   * Get translations by language code
   */
  static async getByLang(lang: string) {
    return await db
      .select()
      .from(translations)
      .where(eq(translations.lang, lang))
      .orderBy(translations.key);
  }

  /**
   * Get translations as key-value object for a language
   */
  static async getTranslationMap(lang: string, category?: string) {
    const conditions = [eq(translations.lang, lang)];
    if (category) conditions.push(eq(translations.category, category));
    
    const result = await db
      .select()
      .from(translations)
      .where(and(...conditions));
    
    const translationMap: Record<string, string> = {};
    result.forEach(t => {
      translationMap[t.key] = t.value;
    });
    
    return translationMap;
  }

  /**
   * Get translation by key and language
   */
  static async getByKeyAndLang(key: string, lang: string) {
    const result = await db
      .select()
      .from(translations)
      .where(and(eq(translations.key, key), eq(translations.lang, lang)))
      .limit(1);
    
    return result[0] || null;
  }

  /**
   * Create or update translation
   */
  static async upsert(data: CreateTranslationData) {
    const existing = await this.getByKeyAndLang(data.key, data.lang);
    
    if (existing) {
      // Update existing
      await db
        .update(translations)
        .set({
          value: data.value,
          category: data.category,
          description: data.description,
        })
        .where(eq(translations.id, existing.id));
      
      return await this.getById(existing.id);
    } else {
      // Create new
      const id = nanoid();
      const newTranslation: NewTranslation = {
        id,
        lang: data.lang,
        key: data.key,
        value: data.value,
        category: data.category || 'common',
        description: data.description,
      };
      
      await db.insert(translations).values(newTranslation);
      return await this.getById(id);
    }
  }

  /**
   * Update translation
   */
  static async update(id: string, data: Partial<CreateTranslationData>) {
    await db
      .update(translations)
      .set(data)
      .where(eq(translations.id, id));
    
    return await this.getById(id);
  }

  /**
   * Delete translation
   */
  static async delete(id: string) {
    await db.delete(translations).where(eq(translations.id, id));
    return true;
  }

  /**
   * Search translations
   */
  static async search(query: string, lang?: string) {
    const searchConditions = [
      like(translations.key, `%${query}%`),
      like(translations.value, `%${query}%`),
    ];
    
    let conditions = or(...searchConditions);
    
    if (lang) {
      conditions = and(conditions, eq(translations.lang, lang));
    }
    
    return await db
      .select()
      .from(translations)
      .where(conditions)
      .orderBy(translations.key);
  }

  /**
   * Get translation by ID
   */
  private static async getById(id: string) {
    const result = await db
      .select()
      .from(translations)
      .where(eq(translations.id, id))
      .limit(1);
    
    return result[0] || null;
  }

  /**
   * Get all translation categories
   */
  static async getCategories() {
    const result = await db
      .selectDistinct({ category: translations.category })
      .from(translations)
      .where(sql`${translations.category} IS NOT NULL`);
    
    return result.map(r => r.category).filter(Boolean);
  }

  /**
   * Bulk import translations
   */
  static async bulkImport(translationsData: CreateTranslationData[]) {
    const results = [];
    
    for (const data of translationsData) {
      const result = await this.upsert(data);
      results.push(result);
    }
    
    return results;
  }
}

export class LanguageService {
  /**
   * Get all languages
   */
  static async getAll(activeOnly = false) {
    if (activeOnly) {
      return await db
        .select()
        .from(languages)
        .where(eq(languages.isActive, true))
        .orderBy(languages.sortOrder, languages.name);
    } else {
      return await db
        .select()
        .from(languages)
        .orderBy(languages.sortOrder, languages.name);
    }
  }

  /**
   * Get language by code
   */
  static async getByCode(code: string) {
    const result = await db
      .select()
      .from(languages)
      .where(eq(languages.code, code))
      .limit(1);
    
    return result[0] || null;
  }

  /**
   * Create language
   */
  static async create(data: CreateLanguageData) {
    const id = nanoid();
    
    const newLanguage: NewLanguage = {
      id,
      code: data.code,
      name: data.name,
      nativeName: data.nativeName,
      flag: data.flag,
      isActive: data.isActive !== undefined ? data.isActive : true,
      sortOrder: data.sortOrder || 0,
    };
    
    await db.insert(languages).values(newLanguage);
    return await this.getById(id);
  }

  /**
   * Update language
   */
  static async update(id: string, data: Partial<CreateLanguageData>) {
    await db
      .update(languages)
      .set(data)
      .where(eq(languages.id, id));
    
    return await this.getById(id);
  }

  /**
   * Delete language
   */
  static async delete(id: string) {
    // First delete all translations for this language
    const language = await this.getById(id);
    if (language) {
      await db.delete(translations).where(eq(translations.lang, language.code));
    }
    
    await db.delete(languages).where(eq(languages.id, id));
    return true;
  }

  /**
   * Get language by ID
   */
  private static async getById(id: string) {
    const result = await db
      .select()
      .from(languages)
      .where(eq(languages.id, id))
      .limit(1);
    
    return result[0] || null;
  }

  /**
   * Check if language code exists
   */
  static async codeExists(code: string, excludeId?: string) {
    if (excludeId) {
      const result = await db
        .select({ id: languages.id })
        .from(languages)
        .where(and(
          eq(languages.code, code),
          sql`${languages.id} != ${excludeId}`
        ))
        .limit(1);
      return result.length > 0;
    } else {
      const result = await db
        .select({ id: languages.id })
        .from(languages)
        .where(eq(languages.code, code))
        .limit(1);
      return result.length > 0;
    }
  }
}
