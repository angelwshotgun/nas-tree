import { like, or, eq, sql } from 'drizzle-orm';

// Server API endpoint for search with SQL LIKE variations
export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  let keyword = query.keyword as string;

  if (!keyword || keyword.length < 2) {
    return { results: [] };
  }

  // Prepare different variations of the keyword
  const normalizedKeyword = keyword
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, ''); // Remove accents

  // Replace hyphens with spaces and vice versa
  const keywordWithSpaces = normalizedKeyword.replace(/-/g, ' ');
  const keywordWithHyphens = normalizedKeyword.replace(/\s+/g, '-');

  try {
    // Create search conditions for multiple variations
    const searchConditions = [
      like(tables.baiviet.duong_dan, `%${normalizedKeyword}%`),
      like(tables.baiviet.duong_dan, `%${keywordWithSpaces}%`),
      like(tables.baiviet.duong_dan, `%${keywordWithHyphens}%`),
      like(tables.baiviet.tieu_de, `%${keyword}%`),
      like(tables.baiviet.mo_ta, `%${keyword}%`),
    ];

    const results = await useDrizzle()
      .select({
        id: tables.baiviet.id,
        tieu_de: tables.baiviet.tieu_de,
        mo_ta: tables.baiviet.mo_ta,
        duong_dan: tables.baiviet.duong_dan,
        anh: tables.baiviet.anh,
        createdAt: tables.baiviet.createdAt,
        thumuc: tables.thumuc,
      })
      .from(tables.baiviet)
      .leftJoin(tables.thumuc, eq(tables.baiviet.thumucId, tables.thumuc.id))
      .where(or(...searchConditions))
      .limit(10);

    return { results };
  } catch (error) {
    console.error('Search error:', error);
    throw createError({
      statusCode: 500,
      message: 'Error searching articles',
    });
  }
});
