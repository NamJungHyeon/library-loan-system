import styles from './Dashboard.module.css';

export default function Dashboard({ books, loans, history, isOverdue }) {
  const totalBooks = books.reduce((acc, b) => acc + b.total, 0);
  const availableBooks = books.reduce((acc, b) => acc + b.available, 0);
  const activeLoans = loans.length;
  const overdueLoans = loans.filter(l => isOverdue(l.dueDate)).length;
  const totalReturned = history.length;

  const stats = [
    { label: '전체 보유 도서', value: totalBooks, unit: '권', color: '#4299e1', icon: '📚' },
    { label: '대출 가능 도서', value: availableBooks, unit: '권', color: '#48bb78', icon: '✅' },
    { label: '현재 대출 중', value: activeLoans, unit: '건', color: '#ed8936', icon: '📤' },
    { label: '연체 도서', value: overdueLoans, unit: '건', color: '#e53e3e', icon: '⚠️' },
    { label: '총 반납 완료', value: totalReturned, unit: '건', color: '#9f7aea', icon: '📥' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {stats.map(stat => (
          <div key={stat.label} className={styles.card} style={{ borderTop: `4px solid ${stat.color}` }}>
            <div className={styles.icon}>{stat.icon}</div>
            <div className={styles.value} style={{ color: stat.color }}>
              {stat.value}<span className={styles.unit}>{stat.unit}</span>
            </div>
            <div className={styles.label}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
