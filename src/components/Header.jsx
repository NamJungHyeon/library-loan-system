import styles from './Header.module.css';

export default function Header({ activeTab, setActiveTab, loanCount, overdueCount }) {
  const tabs = [
    { key: 'books', label: '도서 목록' },
    { key: 'loans', label: `대출 현황 ${loanCount > 0 ? `(${loanCount})` : ''}` },
    { key: 'history', label: '반납 이력' },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.top}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>📚</span>
          <div>
            <h1 className={styles.title}>동양대학교 도서관</h1>
            <p className={styles.subtitle}>도서 대출 관리 시스템</p>
          </div>
        </div>
        {overdueCount > 0 && (
          <div className={styles.overdueAlert}>
            ⚠️ 연체 도서 {overdueCount}건
          </div>
        )}
      </div>
      <nav className={styles.nav}>
        {tabs.map(tab => (
          <button
            key={tab.key}
            className={`${styles.tab} ${activeTab === tab.key ? styles.active : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
