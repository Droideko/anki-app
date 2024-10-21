import { useForm } from 'react-hook-form';
import { router } from 'expo-router';
import { isAxiosError } from 'axios';

import { DEFAULT_SIGN_UP_VALUES } from '../constants';

import { ErrorResponseData } from '@/src/shared/types/global';
import { useSession } from '@/src/shared/contexts/SessionProvider';
import { SignUpFormData } from '@/src/features/authentication/types';

const useOnLogIn = () => {
  const { control, handleSubmit, setError } = useForm<SignUpFormData>({
    defaultValues: DEFAULT_SIGN_UP_VALUES,
  });

  const { signIn } = useSession();

  const handleAuthError = (error: unknown) => {
    if (isAxiosError<ErrorResponseData>(error)) {
      if (error.response) {
        const serverErrors = error.response.data;

        const message = Array.isArray(serverErrors.message)
          ? serverErrors.message.join(', ')
          : serverErrors.message;

        setError('email', {
          type: 'server',
          message,
        }); // TODO возможно стоит подумать какие виды ошибок могут прийти чтобы их правильно распределить
      } else {
        setError('password', {
          type: 'server',
          message: 'Сервер не отвечает. Пожалуйста, попробуйте позже.',
        });
      }
    } else if (error instanceof Error) {
      console.error('Unexpected error:', error);
    }
  };

  const onSubmit = async (data: SignUpFormData) => {
    try {
      // SET LOADING

      await signIn(data);

      // TODO: Отправка события в Firebase Analytics (в будущем)
      // await analytics().logEvent("user_login", {
      //   userId: user.id,
      //   userRole: user.role,
      // });
      router.replace('/');
    } catch (error: unknown) {
      handleAuthError(error);
    }
  };

  return { control, handleSubmit: handleSubmit(onSubmit) };
};

export default useOnLogIn;
