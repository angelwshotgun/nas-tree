// server/api/translate.ts
import { GoogleGenAI } from '@google/genai';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { text, targetLanguages } = body;

    if (!text || !targetLanguages || !Array.isArray(targetLanguages)) {
      return createError({
        statusCode: 400,
        message: 'Thiếu thông tin cần thiết',
      });
    }

    // Lấy API key từ runtime config
    const config = useRuntimeConfig();
    const apiKey = config.GOOGLE_AI_API_KEY;
    const apiKey2 = config.GOOGLE_AI_API_KEY2;

    if (!apiKey && !apiKey2) {
      return createError({
        statusCode: 500,
        message: 'Thiếu cấu hình API Key',
      });
    }

    // Khởi tạo Google Generative AI với apiKey chính
    let genAI = new GoogleGenAI({ apiKey: apiKey });

    // Tạo prompt cho việc dịch
    const languages: Record<string, string> = {
      ko: 'Korean',
      fr: 'French',
      ja: 'Japanese',
      es: 'Spanish',
      th: 'Thai',
      // Thêm các ngôn ngữ khác nếu cần
    };

    // Tạo kết quả trả về
    const translations: Record<string, string> = {};

    // Dịch sang từng ngôn ngữ
    for (const langCode of targetLanguages) {
      if (languages[langCode]) {
        try {
          const prompt = `You are a professional translator. Translate the following text to ${languages[langCode]}. 
          The translation should:
          - Maintain the original meaning and context
          - Use natural, fluent language
          - Preserve any technical terms or proper nouns
          - Keep the same tone and style as the original
          - Be culturally appropriate for the target language
          
          Original text: "${text}"
          
          Provide only the translation without any additional text or explanations.`;

          const result = await genAI.models.generateContent({
            contents: [{ text: prompt }],
            model: 'gemini-2.0-flash-001',
          });
          const translatedText = (result.text || '').trim();

          translations[langCode] = translatedText;
        } catch (error) {
          if (apiKey2) {
            // Thử lại với apiKey2 nếu có lỗi
            genAI = new GoogleGenAI({ apiKey: apiKey2 });
            const prompt = `You are a professional translator. Translate the following text to ${languages[langCode]}. 
            The translation should:
            - Maintain the original meaning and context
            - Use natural, fluent language
            - Preserve any technical terms or proper nouns
            - Keep the same tone and style as the original
            - Be culturally appropriate for the target language
            
            Original text: "${text}"
            
            Provide only the translation without any additional text or explanations.`;

            const result = await genAI.models.generateContent({
              contents: [{ text: prompt }],
              model: 'gemini-2.0-flash-001',
            });
            const translatedText = (result.text || '').trim();

            translations[langCode] = translatedText;
          } else {
            throw error;
          }
        }
      }
    }

    return {
      success: true,
      translations,
    };
  } catch (error) {
    console.error('Lỗi dịch:', error);
    return createError({
      statusCode: 500,
      message: 'Lỗi khi xử lý yêu cầu dịch',
    });
  }
});
