import { Link } from 'react-router-dom';

type PlaceCardImageProps = {
  className?: string;
  linkTo: string;
  alt?: string;
  width: number | string;
  height: number | string;
  src: string;
};

export function PlaceCardImage(props: PlaceCardImageProps) {
  const { className, linkTo, alt = 'Place image', width, height, src } = props;

  return (
    <div className={className}>
      <Link to={linkTo}>
        <img
          className={className}
          src={src}
          width={width}
          height={height}
          alt={alt}
        />
      </Link>
    </div>
  );
}
