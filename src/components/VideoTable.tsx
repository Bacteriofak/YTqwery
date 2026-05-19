import type { VideoItem } from '../types';

interface VideoTableProps {
  videos: VideoItem[];
  selectedVideoId?: string;
  onSelect: (video: VideoItem) => void;
}

function formatThumb(url: string) {
  return url;
}

function formatNumber(value: number) {
  return value.toLocaleString('ru-RU');
}

function VideoTable({ videos, selectedVideoId, onSelect }: VideoTableProps) {
  if (!videos.length) {
    return <p>Нет результатов. Попробуйте другой запрос или снизьте фильтрацию.</p>;
  }

  return (
    <table className="video-table">
      <thead>
        <tr>
          <th>Видео</th>
          <th>Просмотры</th>
          <th>Лайки</th>
          <th>Комм.</th>
          <th>Дата</th>
        </tr>
      </thead>
      <tbody>
        {videos.map(video => (
          <tr
            key={video.videoId}
            className={`video-row ${video.videoId === selectedVideoId ? 'selected' : ''}`}
            onClick={() => onSelect(video)}
          >
            <td>
              <div style={{ display: 'grid', gap: 8 }}>
                <img
                  src={formatThumb(video.thumbnail)}
                  alt={video.title}
                  style={{ width: 120, height: 72, objectFit: 'cover', borderRadius: 14 }}
                />
                <div>
                  <strong>{video.title}</strong>
                  <div className="meta-line">{video.channelTitle}</div>
                </div>
              </div>
            </td>
            <td>{formatNumber(video.views)}</td>
            <td>{formatNumber(video.likes)}</td>
            <td>{formatNumber(video.comments)}</td>
            <td>{video.publishedAt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default VideoTable;
