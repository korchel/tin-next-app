'use client';

import React, { useRef, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import clsx from "clsx";

import styles from './Modal.module.scss';

interface IModalProps {
  address: string,
  taxPayerNumber: string,
}

const Modal: React.FC<IModalProps> = ({ address, taxPayerNumber }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ref = useRef<null | HTMLDialogElement>(null);
  const showModal = searchParams.get('showModal');

  useEffect(() => {
    if (showModal === 'yes') {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [showModal]);

  const handleClose = () => {
    ref.current?.close();
    router.replace(`/info/${taxPayerNumber}`);
  };

  const modal: JSX.Element | null = showModal === 'yes'
    ? (
      <dialog ref={ref} className={styles.modal}>
        <p className={styles.modal__text}>Вы действительно хотите перейти на внешний ресурс?</p>
        <div className={styles.buttonGroup}>
          <button className={clsx(styles.buttonGroup__button, styles.buttonGroup__button_blue)} onClick={handleClose}>Отказаться</button>
          <a className={clsx(styles.buttonGroup__button, styles.buttonGroup__button_gray)} href={`https://yandex.ru/maps?text="${address}"`} onClick={handleClose} target="_blank">Перейти</a>
        </div>
      </dialog>
    ) : null;

  return modal;
};

export default Modal;