import { useForm } from 'react-hook-form';
import { router } from 'expo-router';

import { useSession } from '@shared/contexts/SessionProvider';
import { DEFAULT_SIGN_UP_VALUES } from '@shared/constants/category';
import { SignUpFormData } from '@shared/types/category';
import { handleFormError } from '@shared/utils/handleFormError';
import { useAsyncFn } from '@shared/hooks/useAsyncFn';

// TODO DELETE HOOK
const useOnLogIn = () => {
  const { control, handleSubmit, setError } = useForm<SignUpFormData>({
    defaultValues: DEFAULT_SIGN_UP_VALUES,
  });

  const { signIn } = useSession();

  const [state, onSubmit] = useAsyncFn(async (data: SignUpFormData) => {
    try {
      await signIn(data);
      router.replace('/');
    } catch (error: unknown) {
      handleFormError(error, setError, 'email');
    }
  });

  return {
    loading: state.loading,
    control,
    handleSubmit: handleSubmit(onSubmit),
  };
};

export default useOnLogIn;
