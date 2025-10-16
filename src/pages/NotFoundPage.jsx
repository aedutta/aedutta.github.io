import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <section>
    <h2>Oops!</h2>
    <p>The page you were looking for doesn’t exist.</p>
    <Link to="/">Return home</Link>
  </section>
);

export default NotFoundPage;
