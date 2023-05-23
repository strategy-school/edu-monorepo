import React, { useRef, useEffect } from 'react';
import { TelegramUser } from '@/src/types';

export interface TelegramLoginButtonProps {
  botName: string;
  dataOnAuth?: (user: TelegramUser) => void;
  dataAuthUrl?: string;
  buttonSize?: 'large' | 'medium' | 'small';
  cornerRadius?: number;
  requestAccess?: boolean;
  usePic?: boolean;
  lang?: string;
}

function TelegramAuth(props: TelegramLoginButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const {
      botName,
      buttonSize = 'large',
      cornerRadius,
      requestAccess,
      usePic = true,
      dataOnAuth,
      dataAuthUrl,
      lang = 'ru',
    } = props;

    if (!!dataAuthUrl === !!dataOnAuth) {
      throw new Error(
        'One of this props should be defined: dataAuthUrl (Redirect URL), dataOnAuth (callback fn) should be defined.',
      );
    }

    if (dataOnAuth) {
      (window as any).telegramLoginWidgetCb = dataOnAuth;
    }

    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?9';
    script.async = true;

    const attributes = {
      'data-telegram-login': botName,
      'data-size': buttonSize,
      'data-radius': cornerRadius,
      'data-request-access': requestAccess ? 'write' : undefined,
      'data-userpic': usePic,
      'data-lang': lang,
      'data-auth-url': dataAuthUrl,
      'data-onauth': 'telegramLoginWidgetCb(user)',
    };

    for (const [k, v] of Object.entries(attributes)) {
      v !== undefined && script.setAttribute(k, `${v}`);
    }

    containerRef.current?.appendChild(script);

    return () => {
      if (containerRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        containerRef.current.innerHTML = '';
      }
      if ((window as any).telegramLoginWidgetCb) {
        delete (window as any).telegramLoginWidgetCb;
      }
    };
  }, [props]);

  return <div ref={containerRef}></div>;
}

export default TelegramAuth;
