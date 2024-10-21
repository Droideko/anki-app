import { useForm } from "react-hook-form";
import { isAxiosError } from "axios";
import { router } from "expo-router";
import { SignUpFormData } from "@/src/features/authentication/types";
import { DEFAULT_SIGN_UP_VALUES } from "../constants";
import { useSession } from "@/src/shared/contexts/SessionProvider";
import { ErrorResponseData } from "@/src/shared/types/global";

const useOnSignUp = () => {
  const { signUp } = useSession();
  const { control, handleSubmit, setError } = useForm<SignUpFormData>({
    defaultValues: DEFAULT_SIGN_UP_VALUES,
  });

  const onSubmit = async (data: SignUpFormData) => {
    // TODO переделать на useAsync и возможно вынести логику catch в отдельный хук с useEffect()
    try {
      await signUp(data);

      // TODO: Отправка события в Firebase Analytics (в будущем)
      // await analytics().logEvent("user_sign_up", {
      //   userId: user.id,
      //   userRole: user.role,
      // });

      router.replace("/");
    } catch (error: unknown) {
      if (isAxiosError<ErrorResponseData>(error)) {
        if (error.response) {
          const serverErrors = error.response.data;

          const message = Array.isArray(serverErrors.message)
            ? serverErrors.message.join(", ")
            : serverErrors.message;

          setError("email", {
            type: "server",
            message,
          }); // TODO возможно стоит подумать какие виды ошибок могут прийти чтобы их правильно распределить
        } else {
          setError("password", {
            type: "server",
            message: "Сервер не отвечает. Пожалуйста, попробуйте позже.",
          });
        }
      }
      if (error instanceof Error) {
        console.error("Unexpected error:", error);
      }
    }
  };

  return { control, handleSubmit: handleSubmit(onSubmit) };
};

export default useOnSignUp;
