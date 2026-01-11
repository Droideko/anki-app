import { useFormStore } from '@shared/store/useGenerateFormStore';
import { useAsyncFn } from '@shared/hooks/useAsyncFn';
import { openaiService } from '@shared/api/openaiService';
import { GenerateFormData } from '@shared/types/language';
import { useDetectSoundStore } from '@shared/store/useDetectSoundStore';

const useGenerateSubmit = () => {
  const formStore = useFormStore();
  const { setCheck } = useDetectSoundStore();

  const [state, sendData] = useAsyncFn(async (payload: GenerateFormData) => {
    return openaiService.generateCards(payload);
  }, []);

  const onSubmit = async (data: { topic: string }) => {
    const payload: GenerateFormData = {
      ...data,
      type: formStore.type,
      frontLanguage: formStore.frontLanguage,
      backLanguage: formStore.backLanguage,
      languageLevel: formStore.languageLevel,
      count: formStore.count,
      example: formStore.example,
      usedPhrases: formStore.usedPhrases,
    };

    await sendData(payload);
    setCheck(true);
  };

  return { state, onSubmit };
};

export default useGenerateSubmit;
