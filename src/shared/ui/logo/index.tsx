import { Link } from 'react-router-dom';
import { AppRoute } from '../../config/route';

type logoProps = {
  block?: 'header' | 'footer';
  width?: number;
  height?: number;
};

function Logo(props: logoProps) {
  const { block = 'header', width = 81, height = 41 } = props;

  return (
    <Link
      to={AppRoute.Root}
      className={`${block}__logo-link ${block}__logo-link--active`}
    >
      <img
        className={`${block}__logo`}
        src="img/logo.svg"
        alt="6 cities logo"
        width={width}
        height={height}
      />
    </Link>
  );
}

export default Logo;
