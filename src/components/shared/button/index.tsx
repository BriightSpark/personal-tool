import React from 'react';
import Link from 'components/shared/link';
import { cursorEnter, cursorExit } from 'library/utils/mouse-hover';

interface ButtonModel {
  className?: string
  children?: any
  label?: string
  type?: 'button' | 'submit' | 'reset'
  size?: string
  color?: string
  colorScheme?: string
  icon?: string
  textType?: string
  disabled?: boolean
  href: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export const Button = ( { className, children, label, type, size, color, icon, disabled, href, textType, onClick } : ButtonModel ) => {

  const classNames = (
    `${ className } 
    button button--size-${ size } 
    button button--textType-${ textType } 
    button--type-${ type } 
    button--${ color } 
    button__icon--${ icon }`
  );

  function getButton() {
    return (
      <button className={ classNames } disabled={ disabled } type={ type } onClick={ onClick } onMouseEnter={ cursorEnter } onMouseLeave={ cursorExit }>
        { label || children }
      </button>
    );
  }

  function getLink() {

    const isExternal = href.includes( 'https' );
    return isExternal ?
      ( <a className={ classNames } href={ href } onMouseEnter={ cursorEnter } onMouseLeave={ cursorExit }>
        { children }
      </a> ) : (
        <Link className={ classNames } href={ href } scroll={ false }>
          <a onMouseEnter={ cursorEnter } onMouseLeave={ cursorExit }>
            { children }
          </a>
        </Link>
      );
  }

  return href ? getLink() : getButton();
};

Button.defaultProps = {
  className: '',
  type: 'button',
  size: 'medium',
  textType: 'normal',
  color: 'primary',
  disabled: false,
  href: false
};

export default Button;
