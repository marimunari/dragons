// system
import React from 'react';

// models
import { InputModel } from '@/src/@core/models/Input/input.model';

// styles
import styles from './Input.module.scss';

export default function Input(props: InputModel) {
  const showError = props.required && props.value.trim() === '';

  return (
    <div className={styles.input}>
      {props.label && (
        <label htmlFor={props.id} className={styles.input__label}>
          {props.label}
        </label>
      )}
      <div className={styles.input__container}>
        {props.icon && (
          <div className={styles.input__icon}>
            {props.icon}
          </div>
        )}
        <input
          id={props.id}
          name={props.name}
          type={props.type}
          placeholder={props.placeholder}
          disabled={props.disabled}
          required={props.required}
          value={props.value}
          onChange={props.onChange}
          className={`${styles.input__field} ${props.icon ? styles['input__field--with-icon'] : ''} ${showError ? styles['input__field--error'] : ''}`}
        />
      </div>
      {showError && (
        <span className={styles.input__error}>
          Este campo é obrigatório.
        </span>
      )}
    </div>
  );
}
