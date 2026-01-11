import { useParams, Link } from 'react-router-dom';
import NotFoundPage from './NotFoundPage.jsx';
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
      </article>
    </div>
  );
};

export default BlogPostPage;
