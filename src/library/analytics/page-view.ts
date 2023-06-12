export const sendPageView = () => {
  if ( typeof window.gtag !== 'undefined' ) {
    window?.gtag( 'event', 'page_view', {
      page_title: document.title,
      page_location: window.location.origin,
      page_path: window.location.pathname,
      send_to: process.env.NEXT_PUBLIC_GOOGLE_TAG
    } );
  }
};