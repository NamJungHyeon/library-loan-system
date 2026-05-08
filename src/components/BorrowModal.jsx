import { useState } from 'react';
import styles from './BorrowModal.module.css';

export default function BorrowModal({ book, onConfirm, onClose }) {
  const [name, setName] = useState('');

  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 14);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    onConfirm(name.trim());
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>✕</button>
        <h2 className={styles.title}>도서 대출</h2>

        <div className={styles.bookInfo}>
          <div className={styles.bookIcon}>📖</div>
          <div>
            <p className={styles.bookTitle}>{book.title}</p>
            <p className={styles.bookAuthor}>{book.author}</p>
          </div>
        </div>

        <div className={styles.info}>
          <div className={styles.infoRow}>
            <span>대출 가능 권수</span>
            <strong className={styles.available}>{book.available}권</strong>
          </div>
          <div className={styles.infoRow}>
            <span>반납 예정일</span>
            <strong>{dueDate.toLocaleDateString('ko-KR')} (14일)</strong>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <label className={styles.label}>대출자 이름 *</label>
          <input
            className={styles.input}
            type="text"
            placeholder="이름을 입력하세요"
            value={name}
            onChange={e => setName(e.target.value)}
            autoFocus
          />
          <div className={styles.buttons}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>취소</button>
            <button type="submit" className={styles.confirmBtn} disabled={!name.trim()}>
              대출 확인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
