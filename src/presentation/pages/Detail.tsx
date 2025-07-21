import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getTopHeadlines } from '../../infrastructure/newsapi/news.service';
import type { Article } from '../../domain/models/Article';
import { Card, Typography, Spin, Row, Col } from 'antd';

const { Paragraph, Title, Text, Link } = Typography;

const Detail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTopHeadlines().then((data) => {
      const index = parseInt(id ?? '');
      if (!isNaN(index)) {
        setArticle(data[index]);
      }
      setLoading(false);
    });
  }, [id]);

  if (loading || !article) {
    return (
      <div style={{ marginTop: 200, textAlign: 'center' }}>
        <Spin tip="Memuat detail berita..." size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: '48px 24px', marginTop: 120 }}>
      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={12}>
          <Card
            bordered={false}
            style={{
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
              borderRadius: 12,
              padding: 24,
              textAlign: 'center',
            }}
            cover={
              article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt="Cover"
                  style={{
                    maxHeight: 400,
                    width: '100%',
                    objectFit: 'cover',
                    borderRadius: '12px 12px 0 0',
                  }}
                />
              )
            }
          >
            <Title level={3} style={{ marginBottom: 20 }}>
              {article.title}
            </Title>

            <Paragraph style={{ fontSize: 16, lineHeight: 1.8, textAlign: 'justify' }}>
              {article.content || article.description || 'Tidak ada konten tersedia.'}
            </Paragraph>

            <Text type="secondary" style={{ display: 'block', marginTop: 16 }}>
              🕒 Dipublikasikan: {new Date(article.publishedAt).toLocaleString('id-ID')}
            </Text>

            <div style={{ marginTop: 24 }}>
              <Link
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontWeight: 'bold', fontSize: 16 }}
              >
                🔗 Baca Selengkapnya
              </Link>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Detail;
