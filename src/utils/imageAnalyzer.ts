import * as tf from '@tensorflow/tfjs'
import '@tensorflow/tfjs-backend-webgl' // Import WebGL backend
import * as cocoSsd from '@tensorflow-models/coco-ssd' // Import cocoSsd model

export const analyzeImage = async (
  imageUrl: string,
  setPredictions: React.Dispatch<React.SetStateAction<Array<{ class: string; score: number }>>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsLoading(true)

  // Set WebGL backend
  await tf.setBackend('webgl')
  await tf.ready() // Ensure TensorFlow.js is fully loaded

  const model = await cocoSsd.load()

  const img = new Image()
  img.src = imageUrl
  img.onload = async () => {
    const predictions = await model.detect(img)
    setPredictions(predictions)
    setIsLoading(false)
  }
}
