export const cursorEnter = () => {
  document.documentElement.classList.add( 'hover' );
};

export const cursorExit = () => {
  document.documentElement.classList.remove( 'hover' );
};