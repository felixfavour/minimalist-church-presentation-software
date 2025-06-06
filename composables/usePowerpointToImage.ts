const usePowerpointToImage = async (pptFile: File) => {
  const formData = new FormData()
  formData.append('File', pptFile)
  formData.append('DocumentTitle', pptFile?.name)
  const {data} = await useFetch('https://v2.convertapi.com/convert/ppt/to/webp?Secret=HtJSxvJAJM58BhGG', {
    method: 'POST',
    body: formData
  })

  const images = (data.value as any)?.files?.map((image: any) => {
    return {
      data: image.FileData,
      name: image.FileName
    }
  })

  // TODO: Save image collection to indexedDB and MongoDB, link ID to slide

  return images
}

export default usePowerpointToImage