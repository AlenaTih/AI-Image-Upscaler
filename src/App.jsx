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

// To do. Model dropdown —  make after the first release

// Set output folder

// Loader for uploading an image, and progress bar — for upscaling it


// To do. Make a possibility to delete an uploaded image before upscaling it

// To do. Make validation of input — set limitations for size and format of an image

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
  const [selectedForDeletion, setSelectedForDeletion] = useState(false)
  const [isLightMode, setIsLightMode] = useState(true) // Makes the app dark mode by default

  // const [isLightMode, setIsLightMode] = useState(false) // Makes the app light mode by default
  
    const toggleMode = () => {
      console.log("clicked", isLightMode)
      setIsLightMode(!isLightMode)

      const root = document.getElementById("root")

      if (isLightMode) {
        root.classList.add("light-mode")
        root.classList.remove("dark-mode")
     } else {
          root.classList.add("dark-mode")
          root.classList.remove("light-mode")
     }
    }

  const onDrop = useCallback((acceptedFiles) => {
    // setIsLoaderVisible(true)
    const file = acceptedFiles[0]
    console.log(file.name.split(".")[0])
    const newFileName = file.name.split(".")[0]

    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      alert("Please upload only jpg or png files!")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5 MB limit")
      return
    }

    if (selectedForDeletion) {
      return
    }

    setIsLoaderVisible(true)

    setFileName(newFileName)
    const fr = new FileReader()
    fr.onload = async () => {
      try {
        // throw (Error("I'm an error"))
        setSrc(fr.result)
      }
      catch (error) {
        console.error("Error uploading a file:", error)
      }
    }
    fr.readAsDataURL(file)

  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

useEffect(() => {
  if (src) {

    if (selectedForDeletion) {
      return
    }

    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = src
    img.onload = () => {
      if (img.height > 1000 || img.width > 1000) {
        alert("Image dimensions should not exceed 1000px")
        return
      }

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
    // const x = e.clientX - (window.innerWidth - offsetWidth) / 2 - 10
    const x = e.clientX - container.current.getBoundingClientRect().left
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

  const handleDelete = () => {
    setSelectedForDeletion(true)
    setSrc(null)
    window.location.reload()
  } 

  const showDropzone = () => {
    if (src) {
      document.querySelector(".dropzone").style.display = "none"
    }
  }

  showDropzone()

  
  const left = dragX * 100

  
  return (
    

        <div className="container">

          <header className="header">

            <h2>Image Upscaler</h2>

            <div className="navbar">

              <h3>Upscaler</h3>
              <a href="#how-it-works"><h3>How It Works</h3></a>
              <a href="#authors"><h3>Authors</h3></a>

              <button className="toggle-button" onClick={toggleMode}>Toggle Mode</button>

            </div>

          </header>

          <main className="main">

            <div className="main-left">

              <h2>AI tool</h2>
              <h1>Increase the resolution of your image</h1>
              <p>Nam viverra scelerisque dignissim. Vestibulum ac libero turpis. 
                Proin rutrum ultricies suscipit. Aliquam non aliquet dui, eget accumsan quam. 
                Sed eu ornare nibh.</p>

            </div>

          <div className="main-right">

            <div>

             <div className="dropzone" {...getRootProps()}>

              <input type="file" accept=".jpg, .png" {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
              )}
              <p>JPG / PNG format, up to 5 MB</p>
              

            </div>

              {src && (
                <div>

                {isLoaderVisible && (<div className="loader"></div>)}
        
        
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
        
                  {displayUpscaledImageSrc && isUpscaleClicked && !selectedForDeletion  && (
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

                {isProgressBarVisible && <ProgressBar progress={progress} />}
        
              </div>
              </div>
              )
              }

            </div>

          </div>

          </main>

          <section className="buttons-section">

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

          {src && (
            <button className="delete-button" onClick={handleDelete}>Delete</button>
          )}

              {src && !isUpscaleClicked && ( // Render upscale button only if an image is uploaded
                // and upscale button is not clicked
                  <div>
                    <button onClick={handleUpscale}>Upscale image</button>
                  </div>
                )}


          </section>

          <section className="how-it-works" id="how-it-works">
            <div>
            <h1>How It Works</h1>
            <p>Image Upscaler is an online service that zooms images and photos from 2 to 6 times. 
              It uses artificial intelligence that enlarges images without loss of quality, 
              making them clearer.</p>
            </div>

            <div>
              Upscaled images are here
            </div>

          </section>

          <section className="authors" id="authors">

            <div>
              <h1>Authors</h1>
              <p>Image Upscaler is an online service that zooms images and photos from 2 to 6 times. 
                It uses artificial intelligence that enlarges images without loss of quality, 
                making them clearer.</p>
            </div>

            <div>
              Information about authors is here
            </div>

          </section>

          <footer className="footer">

            <h2>Image Upscaler</h2>

            <div className="navbar">

              <h3>Share</h3>
              <h3>Facebook</h3>
              <h3>Twitter (X)</h3>
              <h3>LinkedIn</h3>

            </div>

          </footer>

        </div>

    
  )

}

export default App
