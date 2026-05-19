import type { VideoItem } from '../types';

interface KeywordPanelProps {
  keywords: string[];
  video: VideoItem | null;
  seoScore: number;
}

function KeywordPanel({ keywords, video, seoScore }: KeywordPanelProps) {
  return (
    <div>
      <div className="section-title">SEO-анализ выбранного видео</div>
      {video ? (
        <div style={{ display: 'grid', gap: 16 }}>
          <div className="badge">SEO score: {seoScore}</div>
          <div>
            <strong>{video.title}</strong>
            <p className="meta-line">{video.description.slice(0, 140)}...</p>
          </div>

          <div>
            <p className="section-title">Ключевые слова</p>
            <div>
              {keywords.map(keyword => (
                <span className="keyword-pill" key={keyword}>{keyword}</span>
              ))}
            </div>
          </div>

          <div>
            <p className="section-title">Теги видео</p>
            <div>
              {video.tags.map(tag => (
                <span className="metric-pill" key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p>Выберите видео, чтобы увидеть его SEO-анализ.</p>
      )}
    </div>
  );
}

export default KeywordPanel;
