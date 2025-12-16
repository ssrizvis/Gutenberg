import { GENRES, NEXT_ICON } from './constants';

function GenreList() {
  return (
    <section className="genres">
      {GENRES.map((item) => (
        <a className="genre-card" href="#" key={item.label}>
          <span className="genre-card__icon" aria-hidden="true">
            <img src={item.icon} alt="" />
          </span>
          <span className="genre-card__text">{item.label}</span>
          <span className="genre-card__chevron" aria-hidden="true">
            <img src={NEXT_ICON} alt="" />
          </span>
        </a>
      ))}
    </section>
  );
}

export default GenreList;
