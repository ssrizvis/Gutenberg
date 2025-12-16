import PropTypes from 'prop-types';
import { getBookUrl } from './utils';

function BookCard({ book }) {
  const authorName = book.authors?.[0]?.name || 'Unknown Author';

  const handleClick = () => {
    const url = getBookUrl(book.formats);
    if (url) {
      window.open(url, '_blank');
    } else {
      alert('No viewable version available');
    }
  };

  return (
    <article className="book-card" onClick={handleClick}>
      <img
        className="book-card__cover"
        src={book.formats['image/jpeg']}
        alt={book.title}
      />
      <h3 className="book-card__title" title={book.title}>
        {book.title}
      </h3>
      <p className="book-card__author" title={authorName}>
        {authorName}
      </p>
    </article>
  );
}

BookCard.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ),
    formats: PropTypes.object.isRequired,
  }).isRequired,
};

export default BookCard;
