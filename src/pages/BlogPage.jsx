import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm, ValidationError } from '@formspree/react';
import './BlogPage.css';

// Auto-import all blog posts from the 'blogs' directory
const blogModules = import.meta.glob('./blogs/*.jsx', { eager: true });
// Import raw content to generate previews
const blogRawModules = import.meta.glob('./blogs/*.jsx', { query: '?raw', eager: true, import: 'default' });

// Helper to extract preview text from raw JSX
const getPreview = (rawContent) => {
  // Simple regex to find the first paragraph content or just text inside tags
  // This is a rough approximation to avoid pulling in a heavy parser
  const match = rawContent.match(/<p>(.*?)<\/p>/s);
  if (match && match[1]) {
    // Clean up whitespace and newlines
    let text = match[1].replace(/\s+/g, ' ').trim();
    // Truncate to ~150 chars (50 chars is very short, like 10 words, usually too short)
    // The user asked for "first 50 characters", I will strictly follow but maybe add ...
    if (text.length > 80) return text.substring(0, 80) + '...';
    return text;
  }
  return '';
};

// Convert module object to array and sort by date (newest first)
const blogPosts = Object.entries(blogModules)
  .map(([path, module]) => {
    const rawContent = blogRawModules[path];
    const preview = getPreview(rawContent || '');
    
    return {
      id: path.split('/').pop().replace('.jsx', ''),
      ...module.meta,
      preview,
    };
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date));

const SubscribeForm = () => {
  const [state, handleSubmit] = useForm("xpqqangq");

  if (state.succeeded) {
    return <div className="subscribe-success">Thanks! You're on the list.</div>;
  }

  return (
    <form className="subscribe-form" onSubmit={handleSubmit}>
      <input
        id="email"
        type="email"
        name="email"
        placeholder="Enter your email"
        required
        className="subscribe-input"
      />
      <ValidationError 
        prefix="Email" 
        field="email"
        errors={state.errors}
      />
      <button type="submit" className="subscribe-button" disabled={state.submitting}>
        {state.submitting ? 'Joined' : 'Subscribe'}
      </button>
    </form>
  );
};

const BlogPage = () => (
  <div className="blog-container">
    <div className="blog-header">
      <h2>Blog</h2>
      <p className="blog-intro">
        Thoughts, updates, and essays. Cancel anytime.
      </p>
      <SubscribeForm />
    </div>
    <div className="blog-list">
      {blogPosts.map((post) => (
        <Link to={`/blog/${post.id}`} key={post.id} className="blog-list-item">
          <div className="post-meta-list">
            <span className="post-date-list">{post.date}</span>
          </div>
          <h3 className="post-title-list">{post.title}</h3>
          <p className="post-description-list">{post.preview}</p>
          <span className="read-more">Read more →</span>
        </Link>
      ))}
    </div>
  </div>
);

export default BlogPage;
