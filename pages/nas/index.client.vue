<template>
  <div class="editor-container">
    <div class="toolbar mb-4">
      <Button label="Dịch toàn bộ nội dung" icon="pi pi-language" @click="translateAll" :loading="isTranslating" />
      <Button label="Áp dụng bản dịch" icon="pi pi-check" @click="applyFullTranslation" :disabled="!fullTranslatedContent" class="ml-2" />
    </div>
    
    <Editor
      ref="editorRef"
      v-model:modelValue="content"
      editorStyle="height: 300px"
      @selection-change="onSelectionChange"
    />
    
    <div v-if="isTranslating" class="mt-4">
      <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" />
      <span class="ml-2">Đang dịch...</span>
    </div>
    
    <div v-if="fullTranslatedContent && !isTranslating" class="mt-4">
      <h3>Xem trước bản dịch:</h3>
      <div class="p-2 border-1 surface-border border-round preview-content" v-html="fullTranslatedContent"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { EditorSelectionChangeEvent } from 'primevue/editor';
import type Editor from 'primevue/editor';

definePageMeta({ middleware: 'auth' });

const content = ref('<p>Hello <b>world</b>!</p><p>This is an example text. Welcome to our document editor.</p>');
const editorRef = ref<InstanceType<typeof Editor> | null>(null);
const fullTranslatedContent = ref('');
const isTranslating = ref(false);
let quillInstance: any | null = null;

// Giữ nguyên cách lấy instance Quill cũ thông qua sự kiện selection-change
const onSelectionChange = (event: EditorSelectionChangeEvent) => {
  quillInstance = event.instance;
};

// Giả lập dịch thuật API (thực tế bạn sẽ gọi API dịch)
const mockTranslateHTML = async (html: string): Promise<string> => {
  isTranslating.value = true;
  
  try {
    // Dịch HTML bằng cách sử dụng Quill Delta thay vì regex
    if (quillInstance) {
      return await translateUsingQuill(html);
    } else {
      // Fallback nếu không có Quill instance
      return await simpleHTMLTranslate(html);
    }
  } finally {
    setTimeout(() => {
      isTranslating.value = false;
    }, 1000); // Giả lập thời gian dịch
  }
};

// Dịch sử dụng Quill API để giữ nguyên định dạng
const translateUsingQuill = async (html: string): Promise<string> => {
  // Tạo một Quill editor tạm thời (ẩn) để xử lý nội dung HTML
  // Chúng ta sẽ gọi API dịch riêng cho từng đoạn văn bản
  
  // Lưu nội dung hiện tại của editor
  const originalContent = quillInstance?.root.innerHTML || '';
  // Đặt nội dung cần dịch vào editor
  quillInstance?.clipboard.dangerouslyPasteHTML(html);
  
  // Lấy toàn bộ văn bản từ editor
  const fullText = quillInstance?.getText() || '';
  
  // Danh sách các vị trí và độ dài văn bản trong editor
  const textSegments: { index: number; length: number; text: string }[] = [];
  
  // Tách các đoạn văn bản theo dấu xuống dòng
  let currentIndex = 0;
  let remainingText = fullText;
  
  // Loại bỏ khoảng trắng và xuống dòng ở đầu và cuối
  remainingText = remainingText.trim();
  
  while (remainingText.length > 0) {
    // Tìm vị trí kết thúc của đoạn (xuống dòng hoặc kết thúc văn bản)
    let segmentEndPos = remainingText.indexOf('\n');
    if (segmentEndPos === -1) segmentEndPos = remainingText.length;
    
    // Trích xuất đoạn văn bản
    const segmentText = remainingText.substring(0, segmentEndPos).trim();
    
    if (segmentText.length > 0) {
      // Tìm vị trí thực trong văn bản gốc
      const segmentIndex = quillInstance?.getText().indexOf(segmentText, currentIndex) || 0;
      
      if (segmentIndex >= 0) {
        textSegments.push({
          index: segmentIndex,
          length: segmentText.length,
          text: segmentText
        });
        
        // Cập nhật vị trí hiện tại
        currentIndex = segmentIndex + segmentText.length;
      }
    }
    
    // Cập nhật văn bản còn lại
    remainingText = remainingText.substring(segmentEndPos + 1).trim();
  }
  
  // Dịch từng đoạn văn bản và áp dụng vào editor
  // Bắt đầu từ cuối để tránh thay đổi vị trí của các đoạn trước
  for (let i = textSegments.length - 1; i >= 0; i--) {
    const segment = textSegments[i];
    
    if (segment.text.trim()) {
      // Dịch đoạn văn bản
      const translatedText = await mockTranslateText(segment.text);
      
      // Áp dụng bản dịch vào editor
      quillInstance?.deleteText(segment.index, segment.length);
      quillInstance?.insertText(segment.index, translatedText);
    }
  }
  
  // Lấy HTML với nội dung đã dịch
  const translatedHTML = quillInstance?.root.innerHTML || '';
  
  // Khôi phục nội dung gốc của editor
  quillInstance?.clipboard.dangerouslyPasteHTML(originalContent);
  
  return translatedHTML;
};

// Phương pháp dịch HTML đơn giản hơn cho trường hợp không có Quill
const simpleHTMLTranslate = async (html: string): Promise<string> => {
  // Tạo các marker đặc biệt để xác định vị trí các thẻ HTML
  const OPEN_MARKER = '___OPEN_TAG___';
  const CLOSE_MARKER = '___CLOSE_TAG___';
  
  // Thay thế tất cả các thẻ HTML bằng marker
  let markedText = html.replace(/<[^>]*>/g, tag => `${OPEN_MARKER}${tag}${CLOSE_MARKER}`);
  
  // Tách văn bản thành các phần
  const parts = markedText.split(new RegExp(`${OPEN_MARKER}|${CLOSE_MARKER}`));
  
  // Dịch chỉ các phần văn bản (không phải thẻ HTML)
  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 0 && parts[i].trim()) { // Các phần văn bản ở vị trí chẵn
      parts[i] = await mockTranslateText(parts[i]);
    }
  }
  
  // Kết hợp lại
  return parts.join('');
};

// Dịch một đoạn văn bản riêng lẻ
const mockTranslateText = (text: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mẫu dịch đơn giản từ tiếng Anh sang tiếng Việt
      const translations: Record<string, string> = {
        'Hello': 'Xin chào',
        'world': 'thế giới',
        'This is an example text': 'Đây là văn bản ví dụ',
        'Welcome to our document editor': 'Chào mừng đến với trình soạn thảo văn bản của chúng tôi',
        'example': 'ví dụ',
        'document': 'tài liệu',
        'editor': 'trình soạn thảo',
        'our': 'của chúng tôi'
      };
      
      let result = text;
      Object.entries(translations).forEach(([eng, vie]) => {
        // Sử dụng biên giới từ để thay thế chính xác
        const regex = new RegExp(`\\b${eng}\\b`, 'gi');
        result = result.replace(regex, vie);
      });
      
      resolve(result);
    }, 200); // Giả lập độ trễ mạng
  });
};

const translateAll = async () => {
  if (!editorRef.value) return;
  
  const currentHTML = content.value;
  
  try {
    // Dịch toàn bộ nội dung HTML
    fullTranslatedContent.value = await mockTranslateHTML(currentHTML);
  } catch (error) {
    console.error('Translation error:', error);
    // Hiển thị thông báo lỗi
  }
};

const applyFullTranslation = () => {
  if (!fullTranslatedContent.value) return;
  
  // Áp dụng bản dịch vào editor
  content.value = fullTranslatedContent.value;
  
  // Làm sạch bản dịch sau khi áp dụng
  fullTranslatedContent.value = '';
};
</script>

<style scoped>
.editor-container {
  max-width: 800px;
  margin: 0 auto;
}

.preview-content {
  background-color: #f8f9fa;
  min-height: 100px;
  max-height: 300px;
  overflow-y: auto;
}
</style>