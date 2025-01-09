// utils/imageAnalyzer.ts
import * as cocoSsd from '@tensorflow-models/coco-ssd'

export const handleFileChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setFile: React.Dispatch<React.SetStateAction<File | null>>,
  setImageUrl: React.Dispatch<React.SetStateAction<string | null>>,
  analyzeImage: (imageUrl: string) => void
) => {
  if (e.target.files && e.target.files[0]) {
    const selectedFile = e.target.files[0]
    setFile(selectedFile)

    const objectUrl = URL.createObjectURL(selectedFile)
    setImageUrl(objectUrl)
    analyzeImage(objectUrl)
  }
}

export const analyzeImage = async (
  imageUrl: string,
  setPredictions: React.Dispatch<React.SetStateAction<Array<{ class: string; score: number }>>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsLoading(true)

  const model = await cocoSsd.load()

  const img = new Image()
  img.src = imageUrl
  img.onload = async () => {
    const predictions = await model.detect(img)
    setPredictions(predictions)
    setIsLoading(false)
  }
}
