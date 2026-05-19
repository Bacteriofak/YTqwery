import type { ChannelInfo, VideoItem } from '../types';

export const mockVideos: VideoItem[] = [
  {
    videoId: 'X0G5jLZq0Fc',
    title: 'Как найти нишу на YouTube: 5 рабочих методов',
    channelTitle: 'YT Growth Lab',
    channelId: 'UCb_growth_lab',
    views: 238000,
    likes: 8200,
    comments: 540,
    publishedAt: '2025-03-16',
    description: 'Пошаговый разбор поиска ниш и анализа конкурентов на YouTube. Уроки SEO, метрики и структура видео для роста канала.',
    tags: ['youtube', 'ниша', 'анализ', 'seo', 'рост'],
    thumbnail: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=640&q=80'
  },
  {
    videoId: '6j2rCzNQv0I',
    title: 'Анализ конкурентов на YouTube: как найти слабые места',
    channelTitle: 'YT Growth Lab',
    channelId: 'UCb_growth_lab',
    views: 180500,
    likes: 6500,
    comments: 410,
    publishedAt: '2025-02-05',
    description: 'Точное сравнение каналов: контент-план, ключевые слова и формат видео. Разбираем примеры с реальными метриками.',
    tags: ['конкуренты', 'youtube анализ', 'ключевые слова', 'контент'],
    thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=640&q=80'
  },
  {
    videoId: 'a9jWdppxVWM',
    title: 'SEO для видео: заголовки, описания и теги, которые работают',
    channelTitle: 'YT Growth Lab',
    channelId: 'UCb_growth_lab',
    views: 154900,
    likes: 7200,
    comments: 310,
    publishedAt: '2025-05-10',
    description: 'Проверенные правила SEO для YouTube. Как настроить видео, чтобы попасть в рекомендованные и увеличить органический трафик.',
    tags: ['seo', 'теги', 'описание', 'заголовок', 'алгоритм'],
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=640&q=80'
  },
  {
    videoId: 'WnRZ_BWBRHU',
    title: 'YouTube аналитика 2025: метрики и инструменты',
    channelTitle: 'YT Growth Lab',
    channelId: 'UCb_growth_lab',
    views: 96000,
    likes: 3400,
    comments: 220,
    publishedAt: '2025-01-22',
    description: 'Какие KPI важны в 2025 году и как правильно читать данные YouTube Analytics для принятия решений.',
    tags: ['youtube analytics', 'kpi', 'данные', 'инструменты'],
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=640&q=80'
  },
  {
    videoId: 'vTlxVQZkW7c',
    title: 'Подбор ключевых слов для YouTube: от простого до продвинутого',
    channelTitle: 'YT Growth Lab',
    channelId: 'UCb_growth_lab',
    views: 134800,
    likes: 5400,
    comments: 280,
    publishedAt: '2024-12-04',
    description: 'Обучение подбору ключевых слов на YouTube: какие запросы приводят зрителей и как не потеряться в нише.',
    tags: ['ключевые слова', 'подбор', 'youtube seo', 'нишевые запросы'],
    thumbnail: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=640&q=80'
  }
];

export const mockChannel: ChannelInfo = {
  channelId: 'UCb_growth_lab',
  title: 'YT Growth Lab',
  subscribers: '385K',
  views: '23.2M',
  videoCount: '142',
  description: 'Экспертный канал по росту и SEO на YouTube. Анализируем ниши, конкурентов и делаем каналы заметными.',
  topVideos: mockVideos.slice(0, 3)
};

export const mockKeywords = [
  'youtube анализ ниши',
  'seo для видео',
  'как подобрать ключевые слова',
  'анализ конкурентов youtube',
  'лучшие теги для видео'
];
