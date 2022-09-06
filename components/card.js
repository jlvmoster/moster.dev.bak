import clsx from 'clsx';
import styles from '../styles/Card.module.css';

const Card = ({ containerStyle, innerContainerStyle, children, clickable }) => (
  <div className={clsx(containerStyle, styles.container, clickable && styles.animation)}>
    <div className={clsx(innerContainerStyle, 'px-4 py-5 sm:p-6')}>{children}</div>
  </div>
);

export default Card;
