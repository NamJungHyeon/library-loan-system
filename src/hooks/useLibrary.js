import { useState, useEffect } from 'react';
import { initialBooks } from '../data/books';

const STORAGE_KEY_BOOKS = 'library_books';
const STORAGE_KEY_LOANS = 'library_loans';
const STORAGE_KEY_HISTORY = 'library_history';

function loadFromStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

export function useLibrary() {
  const [books, setBooks] = useState(() => {
    const stored = loadFromStorage(STORAGE_KEY_BOOKS, null);
    if (stored) return stored;
    return initialBooks.map(b => ({ ...b, available: b.total }));
  });

  const [loans, setLoans] = useState(() =>
    loadFromStorage(STORAGE_KEY_LOANS, [])
  );

  const [history, setHistory] = useState(() =>
    loadFromStorage(STORAGE_KEY_HISTORY, [])
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_BOOKS, JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_LOANS, JSON.stringify(loans));
  }, [loans]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(history));
  }, [history]);

  function borrowBook(bookId, borrowerName) {
    const book = books.find(b => b.id === bookId);
    if (!book || book.available <= 0) return false;

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);

    const loan = {
      id: Date.now(),
      bookId,
      bookTitle: book.title,
      bookAuthor: book.author,
      borrowerName,
      borrowDate: new Date().toISOString(),
      dueDate: dueDate.toISOString(),
    };

    setLoans(prev => [...prev, loan]);
    setBooks(prev =>
      prev.map(b => b.id === bookId ? { ...b, available: b.available - 1 } : b)
    );
    return true;
  }

  function returnBook(loanId) {
    const loan = loans.find(l => l.id === loanId);
    if (!loan) return false;

    setHistory(prev => [
      ...prev,
      { ...loan, returnDate: new Date().toISOString() },
    ]);
    setLoans(prev => prev.filter(l => l.id !== loanId));
    setBooks(prev =>
      prev.map(b => b.id === loan.bookId ? { ...b, available: b.available + 1 } : b)
    );
    return true;
  }

  function isOverdue(dueDate) {
    return new Date(dueDate) < new Date();
  }

  return { books, loans, history, borrowBook, returnBook, isOverdue };
}
