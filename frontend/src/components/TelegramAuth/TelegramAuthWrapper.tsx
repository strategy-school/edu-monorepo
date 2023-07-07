import React from 'react';
import TelegramAuth, {
  TelegramLoginButtonProps,
} from '@/src/components/TelegramAuth/TelegramAuth';
import { TelegramUser } from '@/src/types';
import { telegramLogin } from '@/src/dispatchers/users/usersThunks';
import { useAppDispatch } from '@/src/store/hooks';
import { useRouter } from 'next/router';

const TelegramAuthWrapper: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const onTelegramLogin = async (user: TelegramUser) => {
    const data = {
      firstName: user.first_name,
      lastName: user.last_name ? user.last_name : null,
      avatar: user.photo_url ? user.photo_url : null,
      telegramId: user.id.toString(),
      telegramUsername: user.username,
    };
    await dispatch(telegramLogin(data)).unwrap();
    void router.push('/telegram-login');
  };

  const telegramAuthProps: TelegramLoginButtonProps = {
    botName: 'strategia_authorization_bot',
    dataOnAuth: onTelegramLogin,
    buttonSize: 'large',
    requestAccess: true,
  };

  return <TelegramAuth {...telegramAuthProps} />;
});

TelegramAuthWrapper.displayName = 'TelegramAuthWrapper'; // Assigning display name

export default TelegramAuthWrapper;
