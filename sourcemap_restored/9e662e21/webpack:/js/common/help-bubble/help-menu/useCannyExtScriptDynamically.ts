/* NOTE: Hook dynamically and conditionally loads
 ** Canny hook when the Help Center button (help-button) is clicked,
 **  saving unnecessary script loading.
 ** Hook is too different from useStripeExtScriptDynamically to abstract.
 */
import { useIsCurrentUserLoggedIn } from '@js/common/current-user';
import { useEffect } from 'react';

export const useCannyExtScriptDynamically = (): void => {
  const CANNY_SCRIPT_ID = 'canny-help-button';

  const isLoggedIn = useIsCurrentUserLoggedIn();

  useEffect(() => {
    let script = document.querySelector(
      `script[id="${CANNY_SCRIPT_ID}"]`
    ) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/javascript');
      script.setAttribute('id', CANNY_SCRIPT_ID);
      script.setAttribute('async', 'false');

      if (isLoggedIn) {
        const inlineCode = document.createTextNode(
          '!function(w,d,i,s){function l(){if(!d.getElementById(i)){var f=d.getElementsByTagName(s)[0],e=d.createElement(s);e.type="text/javascript",e.async=!0,e.src="https://canny.io/sdk.js",f.parentNode.insertBefore(e,f)}}if("function"!=typeof w.Canny){var c=function(){c.q.push(arguments)};c.q=[],w.Canny=c,"complete"===d.readyState?l():w.attachEvent?w.attachEvent("onload",l):w.addEventListener("load",l,!1)}}(window,document,"canny-jssdk","script");'
        );

        script.appendChild(inlineCode);
      }

      document.body.appendChild(script);
    }
  }, [isLoggedIn]);
};
