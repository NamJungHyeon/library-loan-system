import { useState } from 'react';
import { useLibrary } from './hooks/useLibrary';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import BookList from './components/BookList';
import LoanList from './components/LoanList';
import History from './components/History';
import styles from './App.module.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('books');
  const { books, loans, history, borrowBook, returnBook, isOverdue } = useLibrary();

  const overdueCount = loans.filter(l => isOverdue(l.dueDate)).length;

  return (
    <div className={styles.app}>
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        loanCount={loans.length}
        overdueCount={overdueCount}
      />
      <Dashboard
        books={books}
        loans={loans}
        history={history}
        isOverdue={isOverdue}
      />
      <main className={styles.main}>
        {activeTab === 'books' && (
          <BookList books={books} onBorrow={borrowBook} />
        )}
        {activeTab === 'loans' && (
          <LoanList loans={loans} onReturn={returnBook} isOverdue={isOverdue} />
        )}
        {activeTab === 'history' && (
          <History history={history} />
        )}
      </main>
    </div>
  );
}
