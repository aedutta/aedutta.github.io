import { useParams, Link } from 'react-router-dom';
import NotFoundPage from './NotFoundPage.jsx';
import SubscribeForm from '../components/SubscribeForm.jsx';
import Giscus from '../components/Giscus.jsx';
import '../components/Giscus.css';
import './BlogPage.css';

// Reuse the same import logic to find the specific post
const blogModules = import.meta.glob('./blogs/*.jsx', { eager: true });

const posts = Object.entries(blogModules).reduce((acc, [path, module]) => {
  const slug = path.split('/').pop().replace('.jsx', '');
  acc[slug] = {
    ...module.meta,
    Component: module.default
  };
  return acc;
}, {});

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = posts[slug];

  if (!post) {
    return <NotFoundPage />;
  }

  const { title, date, Component } = post;

  return (
    <div className="blog-container">
      <div className="blog-nav">
        <Link to="/blog" className="back-link">
          ← Back to All Posts
        </Link>
      </div>
      <article className="blog-post-full">
        <header className="post-header-full">
          <span className="post-date-full">{date}</span>
          <h1 className="post-title-full">{title}</h1>
        </header>
        <div className="post-content">
          <Component />
        </div>
        <div className="post-subscribe">
          <hr style={{ margin: '3rem 0', borderColor: 'rgba(255,255,255,0.1)' }} />
          <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Subscribe for updates</h3>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '1.5rem' }}>
            If you enjoyed this post, join the list to get new essays in your inbox.
          </p>
          <SubscribeForm />
        </div>
        <div className="post-comments">
          <hr style={{ margin: '3rem 0', borderColor: 'rgba(255,255,255,0.1)' }} />
          <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Comments</h3>
          <Giscus />
        </div>
      </article>
    </div>
  );
};

export default BlogPostPage;
