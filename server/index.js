import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { mockVideos, mockChannel, mockKeywords } from './mockApi.js';

const app = express();
const PORT = process.env.PORT || 4000;
const API_KEY = process.env.YOUTUBE_API_KEY;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function buildChannelResponse(query) {
  return {
    ...mockChannel,
    description: `Сравнительный профиль для запроса «${query}». Подписчики, охват и топ-видео.`
  };
}

function filterMockVideos({ query, minViews, maxViews, since, sort }) {
  return mockVideos
    .filter(video => {
      const matchesQuery = query
        ? [video.title, video.description, video.tags.join(' ')].some(text =>
            text.toLowerCase().includes(query.toLowerCase())
          )
        : true;
      const withinViews = video.views >= minViews && video.views <= maxViews;
      const afterDate = !since || video.publishedAt >= since;
      return matchesQuery && withinViews && afterDate;
    })
    .sort((a, b) => {
      if (sort === 'views') return b.views - a.views;
      if (sort === 'likes') return b.likes - a.likes;
      if (sort === 'publishedAt') return b.publishedAt.localeCompare(a.publishedAt);
      return b.views - a.views;
    });
}

app.get('/api/search', async (req, res) => {
  const query = String(req.query.query || '');
  const minViews = Number(req.query.minViews ?? 0);
  const maxViews = Number(req.query.maxViews ?? 1000000000);
  const since = String(req.query.since || '2020-01-01');
  const sort = String(req.query.sort || 'relevance');

  if (!API_KEY) {
    return res.json(filterMockVideos({ query, minViews, maxViews, since, sort }));
  }

  try {
    const searchUrl = new URL('https://www.googleapis.com/youtube/v3/search');
    searchUrl.searchParams.set('part', 'snippet');
    searchUrl.searchParams.set('q', query || 'youtube seo');
    searchUrl.searchParams.set('type', 'video');
    searchUrl.searchParams.set('maxResults', '12');
    searchUrl.searchParams.set('key', API_KEY);

    const searchRes = await fetch(searchUrl.toString());
    const searchData = await searchRes.json();
    const ids = searchData.items?.map(item => item.id.videoId).filter(Boolean).join(',');

    if (!ids) {
      return res.json(filterMockVideos({ query, minViews, maxViews, since, sort }));
    }

    const detailsUrl = new URL('https://www.googleapis.com/youtube/v3/videos');
    detailsUrl.searchParams.set('part', 'snippet,statistics');
    detailsUrl.searchParams.set('id', ids);
    detailsUrl.searchParams.set('key', API_KEY);

    const detailsRes = await fetch(detailsUrl.toString());
    const detailsData = await detailsRes.json();

    const videos = detailsData.items.map(item => ({
      videoId: item.id,
      title: item.snippet.title,
      channelTitle: item.snippet.channelTitle,
      channelId: item.snippet.channelId,
      views: Number(item.statistics.viewCount ?? 0),
      likes: Number(item.statistics.likeCount ?? 0),
      comments: Number(item.statistics.commentCount ?? 0),
      publishedAt: item.snippet.publishedAt.substring(0, 10),
      description: item.snippet.description,
      tags: item.snippet.tags ?? [],
      thumbnail: item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url || ''
    }));

    const filtered = videos.filter(video => {
      const afterDate = !since || video.publishedAt >= since;
      return video.views >= minViews && video.views <= maxViews && afterDate;
    });

    return res.json(filtered.sort((a, b) => {
      if (sort === 'views') return b.views - a.views;
      if (sort === 'likes') return b.likes - a.likes;
      if (sort === 'publishedAt') return b.publishedAt.localeCompare(a.publishedAt);
      return b.views - a.views;
    }));
  } catch (error) {
    return res.json(filterMockVideos({ query, minViews, maxViews, since, sort }));
  }
});

app.get('/api/keywords', (req, res) => {
  const query = String(req.query.query || '');
  if (!query) {
    return res.json(mockKeywords);
  }

  const synthesized = [
    `${query} для начинающих`,
    `${query} шаг за шагом`,
    `${query} без бюджета`,
    `лучшие ${query} стратегии`,
    `конкурентный анализ ${query}`
  ];

  return res.json(synthesized);
});

app.get('/api/channel', (req, res) => {
  const query = String(req.query.query || '');
  return res.json(buildChannelResponse(query));
});

app.use(express.static(path.join(__dirname, '..', 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
