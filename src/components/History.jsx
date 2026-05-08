import styles from './History.module.css';

export default function History({ history }) {
  if (history.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>📜</div>
        <p>반납 이력이 없습니다.</p>
      </div>
    );
  }

  const sorted = [...history].sort((a, b) => new Date(b.returnDate) - new Date(a.returnDate));

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>반납 이력 <span className={styles.count}>{history.length}건</span></h2>
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <span>도서명</span>
          <span>저자</span>
          <span>대출자</span>
          <span>대출일</span>
          <span>반납일</span>
        </div>
        {sorted.map(item => (
          <div key={item.id} className={styles.row}>
            <span className={styles.bookTitle}>{item.bookTitle}</span>
            <span>{item.bookAuthor}</span>
            <span>{item.borrowerName}</span>
            <span>{new Date(item.borrowDate).toLocaleDateString('ko-KR')}</span>
            <span className={styles.returnDate}>{new Date(item.returnDate).toLocaleDateString('ko-KR')}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
