import { useState } from 'react';
import { categories } from '../data/books';
import BorrowModal from './BorrowModal';
import styles from './BookList.module.css';

export default function BookList({ books, onBorrow }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('전체');
  const [selectedBook, setSelectedBook] = useState(null);
  const [notification, setNotification] = useState(null);

  const filtered = books.filter(book => {
    const matchCat = category === '전체' || book.category === category;
    const q = search.toLowerCase();
    const matchSearch = book.title.toLowerCase().includes(q) || book.author.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  function handleBorrow(borrowerName) {
    const ok = onBorrow(selectedBook.id, borrowerName);
    if (ok) {
      setNotification({ type: 'success', msg: `"${selectedBook.title}" 대출이 완료되었습니다.` });
      setSelectedBook(null);
      setTimeout(() => setNotification(null), 3000);
    }
  }

  return (
    <div className={styles.container}>
      {notification && (
        <div className={`${styles.notification} ${styles[notification.type]}`}>
          ✅ {notification.msg}
        </div>
      )}

      <div className={styles.controls}>
        <input
          className={styles.search}
          type="text"
          placeholder="도서명 또는 저자 검색..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className={styles.categories}>
          {categories.map(cat => (
            <button
              key={cat}
              className={`${styles.catBtn} ${category === cat ? styles.active : ''}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.stats}>
        총 <strong>{filtered.length}</strong>권의 도서
      </div>

      <div className={styles.grid}>
        {filtered.map(book => (
          <div key={book.id} className={`${styles.card} ${book.available === 0 ? styles.unavailable : ''}`}>
            <div className={styles.cardTop}>
              <span className={styles.category}>{book.category}</span>
              <span className={`${styles.badge} ${book.available === 0 ? styles.badgeFull : book.available <= 1 ? styles.badgeLow : styles.badgeOk}`}>
                {book.available === 0 ? '대출불가' : book.available <= 1 ? '잔여 1권' : `잔여 ${book.available}권`}
              </span>
            </div>
            <h3 className={styles.bookTitle}>{book.title}</h3>
            <p className={styles.author}>{book.author}</p>
            <p className={styles.isbn}>ISBN: {book.isbn}</p>
            <div className={styles.cardBottom}>
              <span className={styles.stockInfo}>보유 {book.total}권 / 대출중 {book.total - book.available}권</span>
              <button
                className={styles.borrowBtn}
                disabled={book.available === 0}
                onClick={() => setSelectedBook(book)}
              >
                {book.available === 0 ? '대출불가' : '대출하기'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedBook && (
        <BorrowModal
          book={selectedBook}
          onConfirm={handleBorrow}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </div>
  );
}
