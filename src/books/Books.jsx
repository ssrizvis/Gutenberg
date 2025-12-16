import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import BackIcon from '../assets/images/Back.svg';
import SearchBox from './SearchBox';
import BookCard from './BookCard';
import { GENRES } from '../genre/constants';
import { API_URL, DEFAULT_GENRE_ID } from './constants';
import '../genre/genre.css';
import './books.css';

function Books() {
  const { genreId: routeGenreId } = useParams();
  const [searchValue, setSearchValue] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const genreId = routeGenreId || DEFAULT_GENRE_ID;
  const genre = GENRES.find((g) => g.id === genreId);
  const displayName = genre?.label ?? 'Genre';

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const url = new URL(API_URL);
        url.searchParams.set('topic', displayName.toLowerCase());
        if (searchValue.trim()) {
          url.searchParams.set('search', searchValue.trim());
        }
        const response = await fetch(url);
        const data = await response.json();
        setBooks(data.results || []);
      } catch (error) {
        console.error('Failed to fetch books:', error);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [searchValue, displayName]);

  return (
    <main className="page page--books">
      <section className="books">
        <header className="books-header">
          <Link to="/genres" className="books-header__back">
            <img src={BackIcon} alt="" />
            <span>{displayName}</span>
          </Link>
        </header>

        <SearchBox value={searchValue} onChange={setSearchValue} />

        {loading ? (
          <div className="books-loader">
            <div className="books-loader__spinner" />
          </div>
        ) : (
          <div className="books-content">
            <div className="books-grid">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default Books;
