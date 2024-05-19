'use client';

import { useEffect } from 'react';
import { FieldValues, useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import InputMask from '@mona-health/react-input-mask';

import styles from './SearchField.module.scss';
import SearchIcon from './searchIcon.svg';

const SearchField = () => {
  const { register, handleSubmit, setFocus, formState: { errors } } = useForm();
  const router = useRouter();
  
  const onSubmit = (value: FieldValues) => {
    router.push(`/info/${value.taxPayerNumber}`);
  };

  useEffect(() => {
    setFocus('taxPayerNumber');
  }, []);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputContainer}>
        <p className={styles.inputContainer__errorMessage}>{errors.taxPayerNumber?.message as string}</p>
        <InputMask
          {...register('taxPayerNumber', {minLength: {value: 10, message: 'Номер должен состоять из 10 цифр'} })}
          mask='9999999999'
          maskPlaceholder={null}
          className={styles.inputContainer__input}
          placeholder="ИНН организации"
          aria-label="ИНН организации"
        />
        <button type="submit" className={styles.inputContainer__button}>
          <SearchIcon />
        </button>
      </div>
    </form>
  )
};

export default SearchField;