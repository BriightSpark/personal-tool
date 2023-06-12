import React, { MouseEventHandler } from 'react';
import cn from 'classnames';
import { cursorEnter, cursorExit } from 'library/utils/mouse-hover';

interface TagModel {
  id: string
  name: string
  active?: boolean
  handleOnClick?: MouseEventHandler<HTMLButtonElement>
}

export default function Tag( { id, name, active = false, handleOnClick = () => {} } : TagModel ) {

  return (
    <div className={ cn( 'post-tag', { 'post-tag--active': active } ) }>
      <button
        data-tag-id={ id }
        onClick={ handleOnClick }
        onMouseEnter={ cursorEnter } onMouseLeave={ cursorExit }
      >
        { name }
      </button>
    </div>
  );
}
