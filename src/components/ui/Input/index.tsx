import styles from './Input.module.css';
import type { InputProps } from './Input.types';

export default function Input({
  label,
  error,
  hint,
  size = 'md',
  leftIcon,
  rightIcon,
  fullWidth = false,
  required,
  className,
  ...props
}: InputProps) {
  const inputClasses = [
    styles.input,
    styles[size],
    leftIcon ? styles.hasLeftIcon : '',
    rightIcon ? styles.hasRightIcon : '',
    error ? styles.error : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={[styles.wrapper, fullWidth ? styles.full : ''].join(' ')}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}

      <div className={styles.inputWrapper}>
        {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
        <input className={inputClasses} required={required} {...props} />
        {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
      </div>

      {error && <span className={styles.errorMessage}>{error}</span>}
      {hint && !error && <span className={styles.hint}>{hint}</span>}
    </div>
  );
}
