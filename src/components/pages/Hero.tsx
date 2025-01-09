import { useState } from 'react'
import { Upload, Search } from 'lucide-react'
import { handleFileChange, analyzeImage } from '../../utils/imageAnalyzer'

export default function Hero() {
  const [file, setFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [predictions, setPredictions] = useState<Array<{ class: string; score: number }>>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <div className="w-full max-w-md mx-auto p-4 mt-12 h-screen bg-primary flex flex-col">
      <label
        htmlFor="file-upload"
        className="relative block w-full h-40 border-2 border-dashed border-purple-300 rounded-2xl cursor-pointer hover:border-purple-400 transition-colors"
        aria-label="Upload an image"
      >
        <input
          id="file-upload"
          type="file"
          className="sr-only"
          accept=".jpg,.jpeg,.png,.gif"
          onChange={(e) =>
            handleFileChange(e, setFile, setImageUrl, (imageUrl) =>
              analyzeImage(imageUrl, setPredictions, setIsLoading)
            )
          }
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-2">
            <Upload className="w-6 h-6 text-purple-600" />
          </div>
          <span className="text-purple-600 text-lg">Upload File</span>
        </div>
      </label>

      {file && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg flex items-center justify-between">
          <span className="text-sm text-gray-600">{file.name}</span>
          <button className="p-2 rounded-full hover:bg-purple-100 transition-colors">
            <Search className="w-5 h-5 text-purple-600" />
          </button>
        </div>
      )}

      {imageUrl && !isLoading && (
        <div className="mt-8">
          <img
            src={imageUrl}
            alt="Uploaded"
            className="max-w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      )}

      {isLoading && (
        <div className="mt-8 flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white border-solid"></div>
          <span className="ml-4 text-purple-600 text-lg">Analyzing Image...</span>
        </div>
      )}

      {predictions.length > 0 && !isLoading && (
        <div className="mt-8 bg-gray-50 p-4 rounded-md">
          <h3 className="text-xl text-purple-600 mb-4">Predictions:</h3>
          <ul>
            {predictions.map((prediction, index) => (
              <li key={index} className="text-gray-600">
                {prediction.class} - Confidence: {(prediction.score * 100).toFixed(2)}%
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
