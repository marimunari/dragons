// system
import React from 'react';
import Image from 'next/image';

// models
import { ModalModel } from '@/src/@core/models/Modal/modal.model';

// internal components
import Button from '../Button/Button';

// internal icons
import WarningIcon from '@/src/assets/icons/warning-icon.png';

// styles
import styles from './Modal.module.scss';

export default function Modal(props: ModalModel) {
  if (!props.isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modal__content}>
        <Image
          src={WarningIcon}
          alt="Warning icon"
          width={100}
          height={100}
          className={styles.modal__icon}
        />
        <h2 className={styles.modal__title}>{props.title}</h2>
        <p className={styles.modal__message}>{props.message}</p>
        <div className={styles.modal__actions}>
          <Button
            variant="text"
            color="gray"
            text="Cancelar"
            onClick={props.onClose}
          />
          <Button
            variant="text"
            color="red"
            text={props.isLoading ? 'Excluindo...' : 'Confirmar'}
            onClick={props.onConfirm}
            disabled={props.isLoading}
          />
        </div>
      </div>
    </div>
  );
}