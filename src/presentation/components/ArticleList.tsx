import { Link } from 'react-router-dom';
import type { Article } from '../../domain/models/Article';
import { Card, Col, Row } from 'antd';

interface Props {
  articles: Article[];
}

const ArticleList = ({ articles }: Props) => {
  return (
    <Row gutter={[24, 24]}>
      {articles.map((article, index) => (
        <Col xs={24} sm={12} md={8} lg={6} key={index}>
          <Card
            hoverable
            cover={
              article.urlToImage && (
                <img
                  alt={article.title}
                  src={article.urlToImage}
                  style={{ height: 180, objectFit: 'cover', borderRadius: '8px 8px 0 0' }}
                />
              )
            }
          >
            <Card.Meta
              title={
                <Link to={`/detail/${index}`} style={{ fontWeight: 'bold' }}>
                  {article.title}
                </Link>
              }
              description={
                <p style={{ marginTop: 8 }}>
                  {article.description?.slice(0, 100)}...
                </p>
              }
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ArticleList;
