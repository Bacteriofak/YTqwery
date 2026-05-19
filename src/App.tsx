import { useEffect, useMemo, useState } from 'react';
import type { ChannelInfo, Filters, VideoItem } from './types';
import { mockChannel, mockKeywords, mockVideos } from './data/mockData';
import SearchPanel from './components/SearchPanel';
import FilterControls from './components/FilterControls';
import VideoTable from './components/VideoTable';
import AnalysisCards from './components/AnalysisCards';
import KeywordPanel from './components/KeywordPanel';
import CompetitorPanel from './components/CompetitorPanel';
import LoginGate from './components/LoginGate';

const DEFAULT_QUERY = 'youtube seo';
const AUTH_STORAGE_KEY = 'ytqwery.authenticated';
const AUTH_PASSWORD = 'YTQweryAccess123';

function formatCompact(value: number) {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return `${value}`;
}

function calculateSeoScore(video: VideoItem | null) {
  if (!video) return 0;
  const titleScore = Math.min(100, video.title.length * 1.5);
  const descScore = Math.min(100, Math.max(30, video.description.length / 2));
  const tagsScore = Math.min(100, video.tags.length * 18);
  return Math.round((titleScore * 0.35 + descScore * 0.35 + tagsScore * 0.3) / 10) * 10;
}

function App() {
  const [authenticated, setAuthenticated] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
  });
  const [query, setQuery] = useState(DEFAULT_QUERY);
  const [filters, setFilters] = useState<Filters>({
    minViews: 0,
    maxViews: 100000000,
    since: '2020-01-01'
  });
  const [sort, setSort] = useState('relevance');
  const [results, setResults] = useState<VideoItem[]>([]);
  const [channelInfo, setChannelInfo] = useState<ChannelInfo | null>(null);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [authError, setAuthError] = useState('');

  const summary = useMemo(() => {
    const totalViews = results.reduce((sum, item) => sum + item.views, 0);
    const avgEngagement = results.length
      ? results.reduce((sum, item) => sum + (item.likes + item.comments) / item.views, 0) / results.length
      : 0;
    return {
      totalViews,
      avgEngagement: avgEngagement * 100,
      videos: results.length
    };
  }, [results]);

  useEffect(() => {
    const videos = filterVideos(query, filters, sort);
    setResults(videos);
    setKeywords(buildKeywords(query));
    setChannelInfo(buildChannelResponse(query, videos));
    setSelectedVideo(videos[0] ?? null);
  }, [query, filters, sort]);

  function filterVideos(queryText: string, filtersState: Filters, sortKey: string) {
    const lowerQuery = queryText.trim().toLowerCase();
    const filtered = mockVideos.filter(video => {
      const text = [video.title, video.description, video.tags.join(' ')].join(' ').toLowerCase();
      const matchesQuery = !lowerQuery || text.includes(lowerQuery);
      const withinViews = video.views >= filtersState.minViews && video.views <= filtersState.maxViews;
      const afterDate = !filtersState.since || video.publishedAt >= filtersState.since;
      return matchesQuery && withinViews && afterDate;
    });

    return filtered.sort((a, b) => {
      if (sortKey === 'views') return b.views - a.views;
      if (sortKey === 'likes') return b.likes - a.likes;
      if (sortKey === 'publishedAt') return b.publishedAt.localeCompare(a.publishedAt);
      const aScore = lowerQuery ? countMatches(a, lowerQuery) + a.views / 1000 : a.views;
      const bScore = lowerQuery ? countMatches(b, lowerQuery) + b.views / 1000 : b.views;
      return bScore - aScore;
    });
  }

  function countMatches(video: VideoItem, queryText: string) {
    const fields = [video.title, video.description, video.tags.join(' ')].join(' ').toLowerCase();
    return fields.split(queryText).length - 1;
  }

  function buildKeywords(queryText: string) {
    if (!queryText.trim()) {
      return mockKeywords;
    }

    return [
      `${queryText} для начинающих`,
      `${queryText} SEO на YouTube`,
      `анализ ${queryText}`,
      `ключевые слова ${queryText}`,
      `конкуренты ${queryText}`
    ];
  }

  function buildChannelResponse(queryText: string, videos: VideoItem[]) {
    return {
      ...mockChannel,
      description: queryText
        ? `Сравнительный профиль для запроса «${queryText}». Отображается условная аналитика и топ-видео.`
        : mockChannel.description,
      topVideos: videos.slice(0, 3)
    };
  }

  function handleSearch(queryText: string) {
    setQuery(queryText);
  }

  function handleFilterUpdate(updated: Partial<Filters>) {
    setFilters(prev => ({ ...prev, ...updated }));
  }

  function handleLogin(password: string) {
    if (password === AUTH_PASSWORD) {
      window.localStorage.setItem(AUTH_STORAGE_KEY, 'true');
      setAuthenticated(true);
      setAuthError('');
      return;
    }
    setAuthError('Неверный пароль. Попробуйте ещё раз.');
  }

  function handleLogout() {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    setAuthenticated(false);
  }

  if (!authenticated) {
    return (
      <div className="container">
        <div className="card">
          <LoginGate onLogin={handleLogin} error={authError} />
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <div>
          <h1 className="page-title">YTqwery — анализ YouTube в одном окне</h1>
          <p className="subtitle">
            Поиск ниш, фильтрация видео, анализ конкурентов, SEO-метрики и подбор ключевых слов в адаптивном светлом интерфейсе.
          </p>
        </div>
        <button className="primary" style={{ alignSelf: 'center' }} onClick={handleLogout}>
          Выйти
        </button>
      </div>

      <section className="card">
        <SearchPanel value={query} onSearch={handleSearch} loading={false} />
      </section>

      <section className="top-grid">
        <AnalysisCards
          totalViews={summary.totalViews}
          averageEngagement={summary.avgEngagement}
          videos={summary.videos}
          formatValue={formatCompact}
        />
      </section>

      <section className="card">
        <div className="section-title">Фильтрация и сортировка</div>
        <FilterControls filters={filters} sort={sort} onFilterChange={handleFilterUpdate} onSortChange={setSort} />
      </section>

      <div className="panel-grid">
        <div className="card">
          <div className="section-title">Результаты поиска</div>
          <VideoTable
            videos={results}
            selectedVideoId={selectedVideo?.videoId}
            onSelect={setSelectedVideo}
          />
        </div>

        <div className="card">
          <KeywordPanel
            keywords={keywords}
            video={selectedVideo}
            seoScore={calculateSeoScore(selectedVideo)}
          />
        </div>
      </div>

      <section className="card">
        <CompetitorPanel channel={channelInfo} />
      </section>
    </div>
  );
}

export default App;
