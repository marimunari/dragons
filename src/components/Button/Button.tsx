// system
import React from 'react';

// models
import { ButtonModel } from '@/src/@core/models/Button/button.model';

// styles
import styles from './Button.module.scss';

export default function Button(props: ButtonModel) {
  const showIcon = props.variant === 'icon' || props.variant === 'iconText';
  const showText = props.variant === 'text' || props.variant === 'iconText';

  const baseClass = styles.button;
  const iconClass = showIcon ? styles['button--icon'] : '';
  const textClass = showText ? styles['button__text'] : '';
  const roundedClass = props.type === 'rounded' ? styles['button--rounded'] : '';
  const iconTextClass = showIcon && showText ? styles['button--icon-text'] : '';
  const colorClass = styles[`button--${props.color}`];
  const disabledClass = props.disabled ? styles['button--disabled'] : '';

  return (
    <button
      type={props.htmlType}
      onClick={props.onClick}
      disabled={props.disabled}
      className={`${baseClass} ${iconClass} ${textClass} ${roundedClass} ${iconTextClass} ${colorClass} ${disabledClass}`}
    >
      {showIcon && props.icon && <span className={styles['button__icon']}>{props.icon}</span>}
      {showText && <span className={styles['button__text']}>{props.text}</span>}
    </button>
  );
};