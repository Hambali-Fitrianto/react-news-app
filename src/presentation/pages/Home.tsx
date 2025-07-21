import { useEffect, useState } from 'react';
import type { Article } from '../../domain/models/Article';
import { getTopHeadlines } from '../../infrastructure/newsapi/news.service';
import ArticleList from '../components/ArticleList';
import { Typography, Spin, Row, Col } from 'antd';

const { Title } = Typography;

const Home = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTopHeadlines();
        setArticles(data);
      } catch (error) {
        console.error('Gagal ambil data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      style={{
        padding: '40px 24px',
        marginTop: '120px',
        backgroundColor: '#f7f7f7',
        minHeight: '100vh',
      }}
    >
      <Row justify="center">
        <Col>
          <Title level={2} style={{ textAlign: 'center', marginBottom: 40 }}>
            📰 Berita Terkini
          </Title>
        </Col>
      </Row>

      <Spin spinning={loading} tip="Memuat berita..." size="large">
        {!loading && articles.length === 0 ? (
          <p style={{ textAlign: 'center' }}>Tidak ada berita ditemukan.</p>
        ) : (
          <ArticleList articles={articles} />
        )}
      </Spin>
    </div>
  );
};

export default Home;
