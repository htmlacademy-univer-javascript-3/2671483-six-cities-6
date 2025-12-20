import { CSSProperties } from 'react';
import { Link } from 'react-router-dom';

const sectionStyles: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

function NotFoundPage() {
  return (
    <section style={sectionStyles}>
      <h1>404 Not Found</h1>
      <Link to="/">Вернуться на главную</Link>
    </section>
  );
}

export default NotFoundPage;
