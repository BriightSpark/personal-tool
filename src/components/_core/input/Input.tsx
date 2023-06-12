import React, { useState } from 'react';
import classnames from 'classnames';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';

interface InputModel {
  name: string,
  label: string,
  type: string,
  defaultValue?: string,
  readOnly?: boolean,
  placeHolder?: string,
  validation?: any,
  onBlur?: Function,
  id?: string,
  autoComplete?: string
  showError?: boolean
  required?: boolean
  staticLabel?: boolean
  className?: string
}

export default function Input( props : InputModel ) {

  const {
    defaultValue,
    name,
    label,
    type = 'text',
    readOnly,
    placeHolder = ' ',
    validation,
    onBlur,
    id,
    autoComplete = 'on',
    showError = true,
    required = false,
    staticLabel = false,
    className = ''
  } = props;
  const { t } = useTranslation();

  const [ showPw, setShowPw ] = useState( false );

  const formParameters = useFormContext();
  const { errors } = formParameters.formState;
  const isInvalid = errors && errors[name];

  const register = formParameters.register;

  const errorClass = classnames(
    { 'form-control--error-input': isInvalid },
  );

  const pwView = classnames( 'form-control--password-view', {
    'form-control--hide-pw': showPw
  } );

  function toggleViewPw() {
    setShowPw( !showPw );
  }

  function handleBlur( e: React.FocusEvent<HTMLInputElement> ) {
    onBlur?.( e );
  }

  return (
    <div className={ classNames( 'form-group', { 'form-group--static': staticLabel }, className ) } style={{ position: 'relative' }}>
      { staticLabel && <label className='form-label--static' htmlFor={ name }>{ label }</label> }
      <input
        id={ id }
        type={ type === 'password' && showPw ? 'text' : type }
        className={ `form-control ${ errorClass }` }
        { ...register( name, { valueAsNumber: type === 'number', ...validation } ) }
        placeholder={ placeHolder }
        readOnly={ readOnly }
        defaultValue={ defaultValue }
        autoComplete={ autoComplete }
        onBlur={ handleBlur }
        required={ required }
      />
      { !staticLabel && <label className='form-label' htmlFor={ name }>{ label }</label> }
      { type === 'password' && <button className={ pwView } onClick={ toggleViewPw }></button> }
      { isInvalid && showError && <div className='form-error--error-message' style={{ bottom: '-25px' }}>{ t( errors[name]?.message as string ) }</div> }
    </div>
  );
}
