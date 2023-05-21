export function initializeConveyThis() {
  const script = document.createElement('script');
  script.src = '//cdn.conveythis.com/javascript/conveythis-initializer.js';
  script.async = true;

  script.onload = () => {
    (window as any).ConveyThis_Initializer.init({
      api_key: 'pub_6d84628ade66aba881748ab6be350ec1',
    });
  };

  document.body.appendChild(script);
}
