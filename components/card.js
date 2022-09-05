import clsx from 'clsx';
import styles from '../styles/Card.module.css';

const Card = ({ children, onClick }) => (
  <div className={clsx(styles.card, onClick && styles.animated)}>
    <div className='px-4 py-5 sm:p-6'>{children}</div>
  </div>
);

export default Card;
