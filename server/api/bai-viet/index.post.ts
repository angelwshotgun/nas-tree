import { storageBucket } from '~/server/utils/firebase-admin.ts'

export default defineEventHandler(async (event) => {
  const form = await readMultipartFormData(event)

  const tieu_de = form?.find(f => f.name === 'tieu_de')?.data?.toString() || ''
  const noi_dung = form?.find(f => f.name === 'noi_dung')?.data?.toString() || ''
  const vi_tri = form?.find(f => f.name === 'vi_tri')?.data?.toString() || ''
  const thumucId = form?.find(f => f.name === 'thumucId')?.data?.toString() || ''

  const imagesData = []

  const files = form?.filter(f => f.name === 'image')

  if (files && files.length > 0) {
    for (const file of files) {
      if (file.filename && file.data) {
        const fileName = `images/${Date.now()}-${file.filename}`
        const fileUpload = storageBucket.file(fileName)

        await fileUpload.save(file.data, {
          contentType: file.type,
          public: true,
        })

        const imageUrl = `https://storage.googleapis.com/${storageBucket.name}/${fileName}`

        imagesData.push({
          imageUrl: imageUrl
        })
      }
    }
  }

  const baiviet = await useDrizzle().insert(tables.baiviet).values({
    tieu_de: tieu_de,
    noi_dung: noi_dung,
    anh: JSON.stringify(imagesData),  // Lưu mảng ảnh dưới dạng JSON string
    vi_tri: vi_tri,  // Lưu vi_tri từ form
    createdAt: new Date(),
    updatedAt: new Date(),
    thumucId: Number(thumucId),  // Chuyển thumucId thành kiểu number (nếu cần)
  }).returning().get()

  return baiviet
})
