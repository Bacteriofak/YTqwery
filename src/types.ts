export interface VideoItem {
  videoId: string;
  title: string;
  channelTitle: string;
  channelId: string;
  views: number;
  likes: number;
  comments: number;
  publishedAt: string;
  description: string;
  tags: string[];
  thumbnail: string;
}

export interface ChannelInfo {
  channelId: string;
  title: string;
  subscribers: string;
  views: string;
  videoCount: string;
  description: string;
  topVideos: VideoItem[];
}

export interface Filters {
  minViews: number;
  maxViews: number;
  since: string;
}
