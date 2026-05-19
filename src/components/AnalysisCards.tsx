interface AnalysisCardsProps {
  totalViews: number;
  averageEngagement: number;
  videos: number;
  formatValue: (value: number) => string;
}

function AnalysisCards({ totalViews, averageEngagement, videos, formatValue }: AnalysisCardsProps) {
  return (
    <>
      <div className="card">
        <p className="section-title">Общий охват</p>
        <p style={{ fontSize: '2rem', margin: '16px 0 0' }}>{formatValue(totalViews)}</p>
        <p className="meta-line">Суммарное количество просмотров в выборке.</p>
      </div>
      <div className="card">
        <p className="section-title">Средняя вовлечённость</p>
        <p style={{ fontSize: '2rem', margin: '16px 0 0' }}>{averageEngagement.toFixed(1)}%</p>
        <p className="meta-line">Лайки и комментарии к просмотрам.</p>
      </div>
      <div className="card">
        <p className="section-title">Видео</p>
        <p style={{ fontSize: '2rem', margin: '16px 0 0' }}>{videos}</p>
        <p className="meta-line">Количество видео, найденных по запросу.</p>
      </div>
    </>
  );
}

export default AnalysisCards;
