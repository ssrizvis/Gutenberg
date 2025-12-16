import { Link } from 'react-router-dom';
import { GENRES, NEXT_ICON } from './constants';

function GenreList() {
  return (
    <section className="genres">
      {GENRES.map((item) => (
        <Link className="genre-card" to={`/books/${item.id}`} key={item.id}>
          <span className="genre-card__icon" aria-hidden="true">
            <img src={item.icon} alt="" />
          </span>
          <span className="genre-card__text">{item.label}</span>
          <span className="genre-card__chevron" aria-hidden="true">
            <img src={NEXT_ICON} alt="" />
          </span>
        </Link>
      ))}
    </section>
  );
}

export default GenreList;
