// system
import React from 'react';

// models
import { SelectModel, SelectOptionModel } from '@/src/@core/models/Select/select.model';

// styles
import styles from './Select.module.scss';

export default function Select(props: SelectModel) {
  const showError = props.required && props.value === '';

  /**
   * Method responsible for handling the change event of the select input
   * @param e - the event triggered by the select input, which contains the target value
   * @returns {void}
   */
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    const selectedOption = props.options.find(option => option.value === e.target.value);

    if (selectedOption) {
      props.onChange(selectedOption);
    }
  };

  return (
    <section className={styles['select']}>
      {props.icon && (
        <span className={styles['select__icon']}>{props.icon}</span>
      )}
      <select
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={handleChange}
        disabled={props.disabled}
        required={props.required}
        className={`${styles['select__input']} ${showError ? styles['select__input--error'] : ''} ${props.disabled ? styles['select__input--disabled'] : ''}`}
      >
        {props.placeholder && <option value="">{props.placeholder}</option>}
        {props.options.map((option: SelectOptionModel) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </section>
  );
}
