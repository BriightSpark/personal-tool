import { cursorEnter, cursorExit } from 'library/utils/mouse-hover';
import React from 'react';
import { ReactSVG } from 'react-svg';

export const SocialNavigation = () => {

  const FACEBOOK_URL = 'https://www.facebook.com/billy.tran186/';
  const LINKEDIN_URL = 'https://www.linkedin.com/in/gia-bao-tran/';
  const GITHUB_URL = 'https://github.com/BriightSpark';
  const INSTAGRAM_URL = 'https://www.instagram.com/billytran186/';

  return (
    <nav className='social-navigation'>
      <ul className='social-navigation__bar'>
        <li className='social-navigation__icon social-navigation__facebook'>
          <a className='social-navigation__icon-link' href={ FACEBOOK_URL } onMouseEnter={ cursorEnter } onMouseLeave={ cursorExit }>
            <ReactSVG src='/svg/facebook.svg' />
          </a>
        </li>
        <li className='social-navigation__icon social-navigation__linkedin'>
          <a className='social-navigation__icon-link' href={ LINKEDIN_URL } onMouseEnter={ cursorEnter } onMouseLeave={ cursorExit }>
            <ReactSVG src='/svg/linkedin.svg' />
          </a>
        </li>
        <li className='social-navigation__icon social-navigation__github'>
          <a className='social-navigation__icon-link' href={ GITHUB_URL } onMouseEnter={ cursorEnter } onMouseLeave={ cursorExit }>
            <ReactSVG src='/svg/github.svg' />
          </a>
        </li>
        <li className='social-navigation__icon social-navigation__instagram'>
          <a className='social-navigation__icon-link' href={ INSTAGRAM_URL } onMouseEnter={ cursorEnter } onMouseLeave={ cursorExit }>
            <ReactSVG src='/svg/instagram.svg' />
          </a>
        </li>
      </ul>
    </nav>
  );
};
