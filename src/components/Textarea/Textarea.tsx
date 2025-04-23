// system
import React from 'react';

// models
import { TextareaModel } from '@/src/@core/models/Textarea/textarea.model';

// styles
import styles from './Textarea.module.scss';

export default function Textarea(props: TextareaModel) {
  const showError = props.required && props.value.trim() === '';

  return (
    <div className={styles['textarea']}>
      <textarea
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        required={props.required}
        disabled={props.disabled}
        className={`
          ${styles['textarea__input']} 
          ${props.disabled ? styles['textarea__input--disabled'] : ''} 
          ${props.required ? styles['textarea__input--required'] : ''}
        `}
      />
      {showError && (
        <span className="error-message" style={{ color: 'red', fontSize: '12px' }}>
          Este campo é obrigatório.
        </span>
      )}
    </div>
  );
}