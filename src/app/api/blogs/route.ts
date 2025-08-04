import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { validateBlogPostData } from '@/lib/db/schema';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang');
    const status = searchParams.get('status');

    const posts = await db.getAllBlogPosts(lang || undefined, status || undefined);
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate blog post data
    const validation = validateBlogPostData(body);
    if (!validation.valid) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.errors },
        { status: 400 }
      );
    }

    const { 
      title, 
      slug, 
      excerpt, 
      content, 
      lang, 
      status = 'draft',
      featured = false,
      metaTitle,
      metaDescription,
      tags = [],
      authorId
    } = body;

    // Check if slug already exists
    const existing = await db.getBlogPostBySlug(slug);
    if (existing) {
      return NextResponse.json(
        { error: 'Blog post with this slug already exists' },
        { status: 409 }
      );
    }

    const post = await db.createBlogPost({
      title,
      slug,
      excerpt,
      content,
      lang,
      status: status as any,
      featured,
      metaTitle,
      metaDescription,
      tags,
      authorId,
      publishedAt: status === 'published' ? new Date() : undefined,
      viewCount: 0,
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}
