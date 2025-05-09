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
    
    if (!apiKey) {
      return createError({
        statusCode: 500,
        message: 'Thiếu cấu hình API Key',
      });
    }

    // Khởi tạo Google Generative AI
    const genAI = new GoogleGenAI({apiKey: apiKey});

    // Tạo prompt cho việc dịch
    const languages: Record<string, string> = {
      'ko': 'Korean',
      'fr': 'French',
      'ja': 'Japanese',
      'es': 'Spanish',
      'th': 'Thai',
      // Thêm các ngôn ngữ khác nếu cần
    };

    // Tạo kết quả trả về
    const translations: Record<string, string> = {};

    // Dịch sang từng ngôn ngữ
    for (const langCode of targetLanguages) {
      if (languages[langCode]) {
        const prompt = `Translate the following text from English to ${languages[langCode]}. 
        Return only the translated text, without any explanations or additional text.
        
        Text to translate: "${text}"`;
        
        const result = await genAI.models.generateContent({
          contents: [{ text: prompt }],
          model: 'gemini-2.0-flash-001',
        });
        const translatedText = result.text || '';
        
        translations[langCode] = translatedText;
      }
    }

    return {
      success: true,
      translations
    };
  } catch (error) {
    console.error('Lỗi dịch:', error);
    return createError({
      statusCode: 500,
      message: 'Lỗi khi xử lý yêu cầu dịch',
    });
  }
});