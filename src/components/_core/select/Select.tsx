import React from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { useFormContext } from 'react-hook-form';

interface SelectModel {
  name: string,
  label: string,
  options: {
    value: string
    label: string
  }[],
  defaultValue?: string | number | readonly string[] | undefined,
  validation?: any,
  id?: string,
  autoComplete?: string,
}

export default function Select( props: SelectModel ) {
  const { name, label, options, defaultValue, validation = {}, id, autoComplete = 'on', ...restOfProps } = props;
  const { t } = useTranslation();
  const {
    register,
    formState: {
      errors
    }
  } = useFormContext();

  const isInvalid = errors && errors[name];

  return (
    <div className='form-group'>
      <select
        id={ id }
        className={ cn( 'form-select', { 'form-control--error-input': isInvalid } ) }
        autoComplete={ autoComplete }
        defaultValue={ defaultValue }
        { ...register( name, { ...validation } ) }
      >
        { options.map( ( { value, label } ) => (
          <option key={ value } value={ value }>{ label }</option>
        ) ) }
      </select>
      <label className='form-label' htmlFor={ name }>{ label }</label>
      { isInvalid && <div className='form-error--error-message' style={{ bottom: '-25px' }}>{ t( errors?.[name]?.message as string ) }</div> }
    </div>
  );
}
