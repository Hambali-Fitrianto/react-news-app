import type { Article } from '../../domain/models/Article';

export const getTopHeadlines = async (): Promise<Article[]> => {
  const apiKey = import.meta.env.VITE_NEWS_API_KEY;
  const response = await fetch(
    `https://newsapi.org/v2/everything?q=indonesia&sortBy=publishedAt&apiKey=${apiKey}`
  );
  const data = await response.json();

  console.log('HASIL FETCH NEWS API:', data);

  if (data.status !== 'ok') {
    console.error('API error:', data);
    return [];
  }

  return data.articles as Article[];
};
