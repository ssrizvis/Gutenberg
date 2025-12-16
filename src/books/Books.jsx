import { Link, useParams } from 'react-router-dom';
import BackIcon from '../assets/images/Back.svg';
import SearchIcon from '../assets/images/Search.svg';
import { GENRES } from '../genre/constants';
import { BOOKS_BY_GENRE, DEFAULT_GENRE_ID } from './constants';
import '../genre/genre.css';
import './books.css';

function Books() {
  const { genreId: routeGenreId } = useParams();
  const genreId = routeGenreId || DEFAULT_GENRE_ID;
  const genre = GENRES.find((g) => g.id === genreId);
  const displayName = genre?.label ?? 'Genre';
  const books = BOOKS_BY_GENRE[genreId] ?? BOOKS_BY_GENRE[DEFAULT_GENRE_ID];

  return (
    <main className="page page--books">
      <section className="books">
        <header className="books-header">
          <Link to="/genres" className="books-header__back">
            <img src={BackIcon} alt="" />
            <span>{displayName}</span>
          </Link>
        </header>

        <div className="books-search">
          <span className="books-search__icon">
            <img src={SearchIcon} alt="" />
          </span>
          <input
            type="text"
            placeholder="Search"
            aria-label={`Search books in ${displayName}`}
          />
        </div>

        <div className="books-grid">
          {books.map((book) => (
            <article className="book-card" key={book.id}>
              <div className="book-card__cover" />
              <h3 className="book-card__title">{book.title}</h3>
              <p className="book-card__author">{book.author}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Books;
