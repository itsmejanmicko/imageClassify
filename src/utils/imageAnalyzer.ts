import * as tf from '@tensorflow/tfjs'
import '@tensorflow/tfjs-backend-webgl' 
import * as cocoSsd from '@tensorflow-models/coco-ssd'

export const handleFileChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setFile: React.Dispatch<React.SetStateAction<File | null>>,
  setImageUrl: React.Dispatch<React.SetStateAction<string | null>>,
  analyzeImage: (imageUrl: string) => void
) => {
  if (e.target.files && e.target.files[0]) {
    const selectedFile = e.target.files[0]
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']

    if (!allowedTypes.includes(selectedFile.type)) {
      alert('Please upload a valid image file (JPG, PNG, or GIF).')
      return
    }

    setFile(selectedFile)

    // Revoke the old object URL to free up memory
    setImageUrl((prevUrl) => {
      if (prevUrl) URL.revokeObjectURL(prevUrl)
      return null
    })

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

  try {
    // Initialize TensorFlow backend
    await tf.setBackend('webgl').catch(async () => {
      console.warn('WebGL backend not available, falling back to CPU.')
      await tf.setBackend('cpu')
    })
    await tf.ready()

    const model = await cocoSsd.load()

    const img = new Image()
    img.src = imageUrl
    img.onload = async () => {
      const predictions = await model.detect(img)
      setPredictions(predictions)
    }
  } catch (error) {
    console.error('Error during prediction:', error)
    alert('An error occurred while analyzing the image. Please try again.')
  } finally {
    setIsLoading(false)
  }
}
