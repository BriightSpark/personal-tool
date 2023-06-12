import React from 'react';
import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';

interface CheckboxModel {
  name: string
  label: string
  className?: string;
  readOnly?: boolean
  validation?: any
  registerConfig?: any
  checked?: boolean
  disabled?: boolean
}

export default function Checkbox( props : CheckboxModel ) {
  const { name, label, className, readOnly, validation = {}, registerConfig = {}, checked, disabled } = props;
  const classes = classNames( 'form-checkbox-wrap', className );
  const formParameters = useFormContext();
  const register = formParameters.register;

  return (
    <div className={ classes }>
      <input
        id = { name }
        type='checkbox'
        checked={ checked }
        disabled={ disabled }
        className='form-checkbox'
        readOnly={ readOnly }
        { ...register( name, { ...validation, ...registerConfig } ) }
      />
      <label className='form-checkbox-label' htmlFor={ name }>{ label }</label>
    </div>
  );
}
