import React, { useCallback, useState, useEffect, useRef } from 'react'
import { useDropzone } from 'react-dropzone'
import ProgressBar from './components/ProgressBar.jsx'
import './App.css'

import Upscaler from 'upscaler'
import x2 from '@upscalerjs/esrgan-slim/2x'
import x3 from '@upscalerjs/esrgan-slim/3x'
import x4 from '@upscalerjs/esrgan-slim/4x'

// import models from '@upscalerjs/esrgan-slim'
// import * as models from '@upscalerjs/esrgan-slim'

// import deblurringModel from '@upscalerjs/maxim-deblurring'
// import denoisingModel from '@upscalerjs/maxim-denoising'

// const upscaler = new Upscaler({
//   model: x2,
// })

// const upscaler = new Upscaler({
//   model: models.x2,
//   model: models.x3,
//   model: models.x4,
// })

const upscaler = new Upscaler({
  modelx2: x2,
  modelx3: x3,
  modelx4: x4,
})

// const deblurrer = new Upscaler({
//   model: deblurringModel,
// })

// const denoiser = new Upscaler({
//   model: denoisingModel,
// })

// upscaler.dispose().then(() => {
//   console.log("All cleaned up!");
// })

// Model dropdown —  make after the first release

// Set output folder

// Loader for uploading an image, and progress bar — for upscaling it

// function App({ isLightMode, toggleMode })

function App() {
  const [src, setSrc] = useState()
  const [originalSize, setOriginalSize] = useState()
  const [scale, setScale] = useState(1)
  const [interpolation, setInterpolation] = useState('bicubic')
  const [upscaledImageSrc, setUpscaledImageSrc] = useState()
  const [displayUpscaledImageSrc, setDisplayUpscaledImageSrc] = useState(false)
  const [dragX, setDragX] = useState(.5)
  const [dragging, setDragging] = useState(false)
  const container = useRef()
  const [downloadFormat, setDownloadFormat] = useState('jpg') // Track selected download format
  const [scalingFactor, setScalingFactor] = useState(2) // Track selected scaling factor
  const [fileName, setFileName] = useState("")
  const [isUpscaleClicked, setIsUpscaleClicked] = useState(false) // Track whether the upscale button has been clicked
  const [isLoaderVisible, setIsLoaderVisible] = useState(false)
  const [isProgressBarVisible, setIsProgressBarVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  const onDrop = useCallback((acceptedFiles) => {
    setIsLoaderVisible(true)
    const file = acceptedFiles[0]
    console.log(file.name.split(".")[0])
    const newFileName = file.name.split(".")[0]
    setFileName(newFileName)
    const fr = new FileReader()
    fr.onload = async () => {
      try {
        // throw (Error("I'm an error"))
        setSrc(fr.result)
      }
      catch (error) {
        // Handle errors
        console.error("Error uploading a file:", error)
      }
    }
    fr.readAsDataURL(file)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

useEffect(() => {
  if (src) {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = src
    img.onload = () => {
      setIsProgressBarVisible(true) // Show progress bar when upscaling starts
      upscaler.upscale(img, {
        onProgress: (percentage) => setProgress(percentage),
      }).then((upscaledSrc) => {
        setUpscaledImageSrc(upscaledSrc)
        setIsLoaderVisible(false)
        setIsProgressBarVisible(false) // Hide progress bar when upscaling completes
        const width = img.width
        const height = img.height
        setOriginalSize({
          width,
          height,
        })
      }).catch(error => {
        console.error('Error upscaling image:', error)
        setIsProgressBarVisible(false) // Hide progress bar in case of error
      }) .finally(() => {
        setIsProgressBarVisible(false)
      })
    }
  }
}, [src])

  useEffect(() => {
    if (originalSize && isUpscaleClicked) { // Only trigger upscale process if the upscale button is clicked
      let upscaledImageSrcTimer
      const timer = setTimeout(() => {
        setScale(scalingFactor)
        upscaledImageSrcTimer = setTimeout(() => {
          setDisplayUpscaledImageSrc(true)
          setIsLoaderVisible(false)
          setIsProgressBarVisible(false)
        }, 1200)
      }, 300)
      return () => {
        clearTimeout(timer)
        clearTimeout(upscaledImageSrcTimer)
      }
    }
  }, [originalSize, isUpscaleClicked])

  const handleUpscale = () => {
    setIsUpscaleClicked(true)
    // setIsLoaderVisible(true)
    setIsProgressBarVisible(true)
  }

  const startDragging = () => {
    setDragging(true)
  }

  const drag = (e) => {
    if (dragging) {
    const offsetWidth = container.current.offsetWidth
    const x = e.clientX - (window.innerWidth - offsetWidth) / 2 - 10
    setDragX(x / offsetWidth)

    }
  }

  const stopDragging = () => {
    console.log('stop')
    setDragging(false)
  }

  const downloadImage = () => {
    const link = document.createElement("a")
    const image = new Image()
    image.src = upscaledImageSrc
    image.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = image.width
      canvas.height = image.height
      const ctx = canvas.getContext("2d")
      ctx.drawImage(image, 0, 0)
      link.href = canvas.toDataURL(`image/${downloadFormat}`) // Convert image to selected format
      link.download = `${fileName}-upscaled.${downloadFormat}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const handleScalingFactorChange = (factor) => {
    setScalingFactor(factor)
  }

  if (src) {
    const left = dragX * 100
    return (
      <div>

        {isLoaderVisible && (<div className="loader"></div>)}

        {isProgressBarVisible && <ProgressBar progress={progress} />}

        {src && !isUpscaleClicked && ( // Render upscale button only if an image is uploaded
        // and upscale button is not clicked
          <div>
            <button onClick={handleUpscale}>Upscale image</button>
          </div>
        )}

      <div
        className="original-image"

        style={{
          width: originalSize ? originalSize.width * scale : null,
        }}
      >

        <div className="header">
          {displayUpscaledImageSrc && (
          <>
          <div className="interpolation">
            <button
              className={interpolation === 'none' ? 'active' : null}
              onClick={() => setInterpolation('none')}
            >
              None
            </button>
            <button
              className={interpolation === 'bicubic' ? 'active' : null}
              onClick={() => setInterpolation('bicubic')}
            >
              Bicubic interpolation
            </button>
          </div>
          <div>Upscaled image</div>
          </>
          )}
        </div>
        <div
          className="display"
          style={{
            width: originalSize ? originalSize.width * scale : null,
            height: originalSize ? originalSize.height * scale : null,
          }}
        >
          {displayUpscaledImageSrc && (
            <div
              className="dragOverlay"
              ref={container}
              onMouseMove={drag}
              onMouseUp={stopDragging}
            >
              <div
                className="dragger"
                onMouseDown={startDragging}
                style={{
                  left: `calc(${left}%)`,
                }}
              />
            </div>
          )}
          <div className="image-container original">
            <img
              src={src}
              alt="Original"
              width={originalSize ? originalSize.width * scale : null}
              style={{
                imageRendering: interpolation === 'none' ? 'pixelated' : null,
              }}
            />
          </div>

          {displayUpscaledImageSrc && isUpscaleClicked  && (
            <div
              className="image-container scaled-up"
              style={{
                width: `${100 - left}%`,
                left: `${left}%`,
              }}
            >
              <img
                style={{
                  left: ((originalSize.width * scale * left) / 100) * -1,
                }}
                alt="Upscaled"
                src={upscaledImageSrc}
                width={originalSize ? originalSize.width * scale : null}
              />
            </div>
          )}
        </div>
          {displayUpscaledImageSrc && (
            <>
              <p>{scalingFactor}x upscaled using the esrgan-slim model</p>
              
              <div className="download-options">
                <label>
                  <input
                    type="radio"
                    value="jpg"
                    checked={downloadFormat === "jpg"}
                    onChange={() => setDownloadFormat("jpg")}
                  />
                  JPG
                </label>
                <label>
                  <input
                    type="radio"
                    value="png"
                    checked={downloadFormat === "png"}
                    onChange={() => setDownloadFormat("png")}
                  />
                  PNG
                </label>
          </div>
          <button onClick={downloadImage}>Download Upscaled Image</button>

            </>
          )}
      </div>
      </div>
    )
  }

  return (
    <div>

        <div>

          <div className="scaling-options">
            <label>
              Scaling Factor:
              <select value={scalingFactor} onChange={(e) => handleScalingFactorChange(parseInt(e.target.value))}>
                <option value={2}>2x</option>
                <option value={3}>3x</option>
                <option value={4}>4x</option>
              </select>
            </label>
          </div>

          <div className="dropzone" {...getRootProps()}>

            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag 'n' drop some files here, or click to select files</p>
            )}

          </div>

        </div>

    </div>
  )

}

export default App
