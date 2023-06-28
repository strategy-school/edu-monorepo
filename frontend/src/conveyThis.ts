export function initializeConveyThis() {
  const script = document.createElement('script');
  script.src = '//cdn.conveythis.com/javascript/conveythis-initializer.js';
  script.async = true;

  script.onload = () => {
    (window as any).ConveyThis_Initializer.init({
      api_key: 'pub_b6236635d8b13309ffa3bb0425609bd9',
    });
  };

  document.body.appendChild(script);
}
