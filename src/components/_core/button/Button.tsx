import React, { MouseEventHandler } from 'react';
import { useFormContext } from 'react-hook-form';

interface FormButtonModel {
  label?: string
  children?: any
  id?: string
  type?: 'submit' | 'button'
  onClicked?: MouseEventHandler<HTMLButtonElement>
}

export default function FormButton( props : FormButtonModel ) {
  const { label, children, id, type = 'submit', onClicked = () => {} } = props;

  const formParameters = useFormContext();
  const { isValid } = formParameters.formState;

  return (
    <button
      disabled={ type === 'submit' && !isValid }
      type={ type }
      className={ 'form-button' }
      id={ id }
      onClick={ onClicked }
    >{ label || children }</button>
  );
}
