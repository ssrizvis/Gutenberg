import { useState, useEffect, useRef, useCallback } from 'react';
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
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextUrl, setNextUrl] = useState(null);
  const loaderRef = useRef(null);

  const genreId = routeGenreId || DEFAULT_GENRE_ID;
  const genre = GENRES.find((g) => g.id === genreId);
  const displayName = genre?.label ?? 'Genre';

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setBooks([]);
      setNextUrl(null);
      try {
        const url = new URL(API_URL);
        url.searchParams.set('topic', displayName.toLowerCase());
        if (searchValue.trim()) {
          url.searchParams.set('search', searchValue.trim());
        }
        const response = await fetch(url);
        const data = await response.json();
        setBooks(data.results || []);
        setNextUrl(data.next);
      } catch (error) {
        console.error('Failed to fetch books:', error);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [searchValue, displayName]);

  const loadMore = useCallback(async () => {
    if (!nextUrl || loadingMore) return;

    setLoadingMore(true);
    try {
      const response = await fetch(nextUrl);
      const data = await response.json();
      setBooks((prev) => [...prev, ...(data.results || [])]);
      setNextUrl(data.next);
    } catch (error) {
      console.error('Failed to fetch more books:', error);
    } finally {
      setLoadingMore(false);
    }
  }, [nextUrl, loadingMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && nextUrl && !loadingMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [nextUrl, loadingMore, loadMore]);

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
            {nextUrl && (
              <div ref={loaderRef} className="books-load-more">
                {loadingMore && <div className="books-loader__spinner" />}
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}

export default Books;
