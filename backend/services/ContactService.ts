import { db } from '../database/connection.js';
import { contacts, type Contact, type NewContact, type CreateContactData } from '../database/schema.js';
import { eq, desc, and, like, or, sql } from 'drizzle-orm';
import { nanoid } from 'nanoid';

export class ContactService {
  /**
   * Get all contacts with filters
   */
  static async getAll(filters?: {
    status?: 'new' | 'in-progress' | 'responded' | 'closed';
    priority?: 'low' | 'normal' | 'high';
    responded?: boolean;
    limit?: number;
    offset?: number;
  }) {
    const conditions = [];
    
    if (filters?.status) conditions.push(eq(contacts.status, filters.status));
    if (filters?.priority) conditions.push(eq(contacts.priority, filters.priority));
    if (filters?.responded !== undefined) conditions.push(eq(contacts.responded, filters.responded));
    
    const result = await db
      .select()
      .from(contacts)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(contacts.createdAt))
      .limit(filters?.limit || 100)
      .offset(filters?.offset || 0);
    
    return result;
  }

  /**
   * Get contact by ID
   */
  static async getById(id: string) {
    const result = await db
      .select()
      .from(contacts)
      .where(eq(contacts.id, id))
      .limit(1);
    
    return result[0] || null;
  }

  /**
   * Create new contact
   */
  static async create(data: CreateContactData) {
    const id = nanoid();
    
    const newContact: NewContact = {
      id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      serviceInterested: data.serviceInterested,
      message: data.message,
      source: data.source || 'website',
      status: 'new',
      priority: 'normal',
      responded: false,
    };
    
    await db.insert(contacts).values(newContact);
    return await this.getById(id);
  }

  /**
   * Update contact
   */
  static async update(id: string, data: Partial<CreateContactData & {
    status?: 'new' | 'in-progress' | 'responded' | 'closed';
    priority?: 'low' | 'normal' | 'high';
    responded?: boolean;
    adminNote?: string;
    respondedBy?: string;
  }>) {
    const updateData: Partial<NewContact> = { ...data };
    
    // Set responded timestamp if marking as responded
    if (data.responded === true) {
      updateData.respondedAt = new Date();
    }
    
    await db
      .update(contacts)
      .set(updateData)
      .where(eq(contacts.id, id));
    
    return await this.getById(id);
  }

  /**
   * Delete contact
   */
  static async delete(id: string) {
    await db.delete(contacts).where(eq(contacts.id, id));
    return true;
  }

  /**
   * Search contacts
   */
  static async search(query: string) {
    const searchConditions = [
      like(contacts.name, `%${query}%`),
      like(contacts.email, `%${query}%`),
      like(contacts.company, `%${query}%`),
      like(contacts.message, `%${query}%`),
    ];
    
    return await db
      .select()
      .from(contacts)
      .where(or(...searchConditions))
      .orderBy(desc(contacts.createdAt));
  }

  /**
   * Mark contact as responded
   */
  static async markAsResponded(id: string, respondedBy: string, adminNote?: string) {
    return await this.update(id, {
      status: 'responded',
      responded: true,
      respondedBy,
      adminNote,
    });
  }

  /**
   * Get contact statistics
   */
  static async getStats() {
    const [
      totalResult,
      newResult,
      inProgressResult,
      respondedResult,
      closedResult
    ] = await Promise.all([
      db.select({ count: sql<number>`count(*)` }).from(contacts),
      db.select({ count: sql<number>`count(*)` }).from(contacts).where(eq(contacts.status, 'new')),
      db.select({ count: sql<number>`count(*)` }).from(contacts).where(eq(contacts.status, 'in-progress')),
      db.select({ count: sql<number>`count(*)` }).from(contacts).where(eq(contacts.status, 'responded')),
      db.select({ count: sql<number>`count(*)` }).from(contacts).where(eq(contacts.status, 'closed')),
    ]);

    return {
      total: totalResult[0]?.count || 0,
      new: newResult[0]?.count || 0,
      inProgress: inProgressResult[0]?.count || 0,
      responded: respondedResult[0]?.count || 0,
      closed: closedResult[0]?.count || 0,
    };
  }
}
