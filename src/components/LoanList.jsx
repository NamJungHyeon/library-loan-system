import styles from './LoanList.module.css';

export default function LoanList({ loans, onReturn, isOverdue }) {
  if (loans.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>📭</div>
        <p>현재 대출 중인 도서가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>대출 현황 <span className={styles.count}>{loans.length}건</span></h2>
      <div className={styles.list}>
        {loans.map(loan => {
          const overdue = isOverdue(loan.dueDate);
          const daysLeft = Math.ceil((new Date(loan.dueDate) - new Date()) / (1000 * 60 * 60 * 24));
          return (
            <div key={loan.id} className={`${styles.card} ${overdue ? styles.overdueCard : ''}`}>
              <div className={styles.left}>
                <div className={styles.bookIcon}>{overdue ? '⚠️' : '📗'}</div>
                <div>
                  <h3 className={styles.title}>{loan.bookTitle}</h3>
                  <p className={styles.author}>{loan.bookAuthor}</p>
                  <div className={styles.meta}>
                    <span>대출자: <strong>{loan.borrowerName}</strong></span>
                    <span>대출일: {new Date(loan.borrowDate).toLocaleDateString('ko-KR')}</span>
                    <span className={overdue ? styles.overdueText : ''}>
                      반납기한: {new Date(loan.dueDate).toLocaleDateString('ko-KR')}
                      {overdue
                        ? ` (${Math.abs(daysLeft)}일 연체)`
                        : ` (${daysLeft}일 남음)`}
                    </span>
                  </div>
                </div>
              </div>
              <button
                className={styles.returnBtn}
                onClick={() => onReturn(loan.id)}
              >
                반납
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
