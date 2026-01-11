import { Buffer } from 'buffer';

import * as FileSystem from 'expo-file-system';

import { BASE_URL } from '@shared/constants/api';
import { apiClient } from '@shared/api/apiClient';
import { API_ENDPOINTS } from '@shared/api/endpoints';

function generateHash(text: string): string {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const chr = text.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Приведение к 32-битному целому
  }
  return hash.toString();
}

export const ttsService = {
  /**
   * Получает URI аудиофайла для заданного текста.
   * Если файл уже сохранён в кэше, возвращается его URI.
   * Если нет – запрашивается у сервера, сохраняется в кэше и возвращается URI.
   */
  getSpeech: async (
    speechText: string,
    languageCode: string,
  ): Promise<string> => {
    // Объединяем текст и язык для генерации уникального хеша
    const hash = generateHash(speechText + languageCode);
    // Включаем код языка в имя файла
    const fileUri =
      FileSystem.cacheDirectory + `tts_${languageCode}_${hash}.mp3`;

    // Проверяем, существует ли файл в кэше
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    if (fileInfo.exists) {
      console.log('CACHED  : ', speechText, languageCode);
      return fileUri;
    }

    // Файл не найден, делаем запрос к серверу
    const response = await apiClient.get(
      `${BASE_URL}${API_ENDPOINTS.TTS.BASE}?speechText=${encodeURIComponent(speechText)}&languageCode=${languageCode}`,
      {
        responseType: 'arraybuffer',
      },
    );

    const base64Audio = Buffer.from(response.data, 'binary').toString('base64');

    // Сохраняем аудиофайл в кэше с указанием кодировки base64
    await FileSystem.writeAsStringAsync(fileUri, base64Audio, {
      encoding: FileSystem.EncodingType.Base64,
    });

    return fileUri;
  },
};
