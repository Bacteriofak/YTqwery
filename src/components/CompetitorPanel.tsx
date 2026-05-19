import type { ChannelInfo } from '../types';

interface CompetitorPanelProps {
  channel: ChannelInfo | null;
}

function CompetitorPanel({ channel }: CompetitorPanelProps) {
  if (!channel) {
    return <p>Нет данных конкурента. Выполните поиск, чтобы увидеть аналитическую панель.</p>;
  }

  return (
    <div>
      <div className="section-title">Анализ конкурента</div>
      <div className="grid-cols-2" style={{ gap: '18px' }}>
        <div>
          <p style={{ margin: '0 0 10px', fontWeight: 700 }}>{channel.title}</p>
          <p className="meta-line">{channel.description}</p>
          <div style={{ marginTop: 14 }}>
            <div className="metric-pill">Подписчики: {channel.subscribers}</div>
            <div className="metric-pill">Просмотры: {channel.views}</div>
            <div className="metric-pill">Видео: {channel.videoCount}</div>
          </div>
        </div>
        <div>
          <p className="section-title">Топ видео конкурента</p>
          <ul style={{ padding: 0, listStyle: 'none', margin: 0 }}>
            {channel.topVideos.map(video => (
              <li key={video.videoId} style={{ marginBottom: 16 }}>
                <strong>{video.title}</strong>
                <div className="meta-line">{video.views.toLocaleString('ru-RU')} просмотров • {video.publishedAt}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CompetitorPanel;
