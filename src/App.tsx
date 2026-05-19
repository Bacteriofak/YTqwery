import { useEffect, useMemo, useState } from 'react';
import type { ChannelInfo, Filters, VideoItem } from './types';
import SearchPanel from './components/SearchPanel';
import FilterControls from './components/FilterControls';
import VideoTable from './components/VideoTable';
import AnalysisCards from './components/AnalysisCards';
import KeywordPanel from './components/KeywordPanel';
import CompetitorPanel from './components/CompetitorPanel';

const DEFAULT_QUERY = 'youtube seo';

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
    fetchDashboard(DEFAULT_QUERY);
  }, []);

  async function fetchSearch(queryText: string) {
    const queryString = new URLSearchParams({
      query: queryText,
      minViews: String(filters.minViews),
      maxViews: String(filters.maxViews),
      since: filters.since,
      sort
    });
    const response = await fetch(`/api/search?${queryString}`);
    if (!response.ok) {
      throw new Error('Search failed');
    }
    return (await response.json()) as VideoItem[];
  }

  async function fetchKeywords(queryText: string) {
    const response = await fetch(`/api/keywords?query=${encodeURIComponent(queryText)}`);
    if (!response.ok) {
      throw new Error('Keyword request failed');
    }
    return (await response.json()) as string[];
  }

  async function fetchChannel(queryText: string) {
    const response = await fetch(`/api/channel?query=${encodeURIComponent(queryText)}`);
    if (!response.ok) {
      throw new Error('Channel request failed');
    }
    return (await response.json()) as ChannelInfo;
  }

  async function fetchDashboard(queryText: string) {
    setLoading(true);
    setError('');
    try {
      const [videos, keywordList, channel] = await Promise.all([
        fetchSearch(queryText),
        fetchKeywords(queryText),
        fetchChannel(queryText)
      ]);
      setResults(videos);
      setKeywords(keywordList);
      setChannelInfo(channel);
      setSelectedVideo(videos[0] ?? null);
    } catch (err) {
      setError('Не удалось загрузить данные, попробуйте повторить запрос.');
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(queryText: string) {
    setQuery(queryText);
    fetchDashboard(queryText);
  }

  function handleFilterUpdate(updated: Partial<Filters>) {
    setFilters(prev => ({ ...prev, ...updated }));
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
      </div>

      <section className="card">
        <SearchPanel value={query} onSearch={handleSearch} loading={loading} />
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

      {error ? <div className="error-note">{error}</div> : null}
      {loading ? <div className="loading">Загрузка данных...</div> : null}

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
