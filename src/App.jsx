import React, { useCallback, useState, useEffect, useRef } from "react"
import { useDropzone } from "react-dropzone"
import Header from "./components/Header.jsx"
import Authors from "./components/Authors.jsx"
import Footer from "./components/Footer.jsx"
import ProgressBar from "./components/ProgressBar.jsx"
// import sunset from "./assets/sunset.png"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './App.css'

import Upscaler from "upscaler"
import x2 from "@upscalerjs/esrgan-slim/2x"
import x3 from "@upscalerjs/esrgan-slim/3x"
import x4 from "@upscalerjs/esrgan-slim/4x"

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
//   model: models.x4, container
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
  const [interpolation, setInterpolation] = useState("bicubic")
  const [upscaledImageSrc, setUpscaledImageSrc] = useState()
  const [displayUpscaledImageSrc, setDisplayUpscaledImageSrc] = useState(false)
  const [dragX, setDragX] = useState(.5)
  const [dragging, setDragging] = useState(false)
  const container = useRef()
  const [downloadFormat, setDownloadFormat] = useState("jpg") // Track selected download format
  const [scalingFactor, setScalingFactor] = useState(2) // Track selected scaling factor
  const [fileName, setFileName] = useState("")
  const [isUpscaleClicked, setIsUpscaleClicked] = useState(false) // Track whether the upscale button has been clicked
  const [isLoaderVisible, setIsLoaderVisible] = useState(false)
  const [isProgressBarVisible, setIsProgressBarVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const [selectedForDeletion, setSelectedForDeletion] = useState(false)


  // const containerSunset = useRef()
  // const [originalSizeSunset, setOriginalSizeSunset] = useState()
  // const [upscaledImgSrcSunset, setUpscaledImageSrcSunset] = useState()


    // upscaler.upscale(sunset).then((upscaledImgSrc) => {
    //   const img = document.createElement("img")
    //   img.src = upscaledImgSrc
    //   if (!document.getElementById("demo-container").hasChildNodes)
    //     console.log("It works")
    //     document.getElementById("demo-container").appendChild(img)
    // })


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
        // output: 'tensor',
        // progressOutput: 'base64',
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


  // const dragSunset = (e) => {
  //   if (dragging) {
  //   const offsetWidth = containerSunset.current.offsetWidth
  //   // const x = e.clientX - (window.innerWidth - offsetWidth) / 2 - 10
  //   const x = e.clientX - containerSunset.current.getBoundingClientRect().left
  //   setDragX(x / offsetWidth)

  //   }
  // }


  const downloadImage = () => {
    const link = document.createElement("a")
    const image = new Image()
    image.src = upscaledImageSrc
    image.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.height = image.height
      canvas.width = image.width
      const ctx = canvas.getContext("2d")
      ctx.drawImage(image, 0, 0)
      if (downloadFormat) {
        link.href = canvas.toDataURL(`image/${downloadFormat}`) // Convert image to selected format
        link.download = `${fileName}-upscaled.${downloadFormat}`
      } else {
        link.href = canvas.toDataURL
        link.download = `${fileName}-upscaled`
      }
      
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value)
    setScalingFactor(value)
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

  // const leftSunset = dragX * 100

  // upscaler.upscale(sunset).then((upscaledImgSrc) => {
  //   const img = document.createElement("img")
  //   img.src = upscaledImgSrc
  //   document.getElementById("demo-container").append(img)
  // })


//   useEffect(() => {
//     upscaler.upscale(sunset).then((upscaledImgSrcSunset) => {
//     const img = document.createElement("img")
//     img.src = upscaledImgSrcSunset

//     setUpscaledImageSrcSunset(upscaledImgSrcSunset)

//     const width = img.width
//     const height = img.height
//     setOriginalSizeSunset({
//       width,
//       height,
//     })
    
//   })
//   }
// )
  

  
  return (
    

        <div className="container">

          <header className="header">
            <Header />
          </header>

          <main className="main">

            <div className="left-and-right-container">

            <div className="main-left">

              <h2 className="title">AI tool</h2>
              <h1 className="title-description">Increase the resolution of your image</h1>
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
                <div className="upscale-container">

                {/* {isLoaderVisible && (<div className="loader"></div>)} */}
        
        
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

                {isLoaderVisible && (<div className="loader"></div>)}

                {isProgressBarVisible && <ProgressBar progress={progress} />}
        
              </div>
              </div>
              )
              }

            </div>

          </div>

          </div>

          <section className="buttons-section">

              <div className="scaling-slider">
                    <label className="level-label">Level</label>
                    <div className="label-input-container">
                      <input 
                        className="slider-input"
                        type="range" 
                        min="2" 
                        max="4" 
                        step="1" 
                        value={scalingFactor} 
                        onChange={handleSliderChange}
                      />
                      <div className="scale-labels-container">
                        <label className={`circle ${scalingFactor === 2 ? "active" : ""}`}
                          onClick={() => setScalingFactor(2)}>x2</label>
                        <label className={`circle ${scalingFactor === 3 ? "active" : ""}`}
                          onClick={() => setScalingFactor(3)}>x3</label>
                        <label className={`circle ${scalingFactor === 4 ? "active" : ""}`}
                          onClick={() => setScalingFactor(4)}>x4</label>
                      </div>
                    </div>
              </div>

              <div className="buttons-container-right">

                <div className="delete-upscale-buttons-container">

                  {src && !isUpscaleClicked && (
                    <button className="delete-button" onClick={handleDelete}>
                      {/* <FontAwesomeIcon icon="fa-regular fa-trash-can" /> */}
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                  )}

                      {src && !isUpscaleClicked && ( // Render upscale button only if an image is uploaded
                        // and upscale button is not clicked
                          <div className="upscale-button">
                            <button onClick={handleUpscale}>Upscale image</button>
                          </div>
                        )}

                </div>

                {displayUpscaledImageSrc && (
                        <>

                          <p>{scalingFactor}x upscaled using the esrgan-slim model</p>

                          <div className="download-buttons-container">

                            <button className="delete-button" onClick={handleDelete}>
                              <i className="fa-regular fa-trash-can"></i>
                            </button>

                              <button className="download-button" onClick={downloadImage}>
                                Download
                              </button>

                              <select className="download-button" value={downloadFormat}
                                onChange={(e) => setDownloadFormat(e.target.value)}
                                aria-label="Download the upscaled image">
                                  <label for="jpg" onClick={downloadImage}>Download .jpg</label>
                                  <option name="jpg" value=".jpg">Download .jpg</option>
                                  <label for="png" onClick={downloadImage}>Download .png</label>
                                  <option name="png" value=".png">Download .png</option>
                              </select>

                          </div>

                      </>
                    )}

                </div>


          </section>

          </main>

          

          <section className="how-it-works" id="how-it-works">
            <div className="how-it-works-left">
            <h1>How It Works</h1>
            <p>Image Upscaler is an online service that zooms images and photos from 2 to 6 times. 
              It uses artificial intelligence that enlarges images without loss of quality, 
              making them clearer.</p>
            </div>

            <div className="how-it-works-right">
              Upscaled images are here

              {/* <div
                  className="display"
                  style={{
                    width: originalSizeSunset ? originalSizeSunset.width * scale : null,
                    height: originalSizeSunset ? originalSizeSunset.height * scale : null,
                  }}
                >
                  {upscaledImgSrcSunset && (
                    <div
                      className="dragOverlay"
                      ref={containerSunset}
                      onMouseMove={dragSunset}
                      onMouseUp={stopDragging}
                    >
                      <div
                        className="dragger"
                        onMouseDown={startDragging}
                        style={{
                          left: `calc(${leftSunset}%)`,
                        }}
                      />
                    </div>
                  )}
                  <div className="image-container original">
                    <img
                      src={sunset}
                      alt="OriginalSunset"
                      width={originalSizeSunset ? originalSizeSunset.width * scale : null}
                      // style={{
                      //   imageRendering: interpolation === 'none' ? 'pixelated' : null,
                      // }}
                    />
                  </div>
        
                  {upscaledImgSrcSunset  && (
                    <div
                      className="image-container scaled-up"
                      style={{
                        width: `${100 - leftSunset}%`,
                        left: `${leftSunset}%`,
                      }}
                    >
                      <img
                        style={{
                          left: ((originalSizeSunset.width * scale * leftSunset) / 100) * -1,
                        }}
                        alt="Upscaled"
                        src={upscaledImgSrcSunset}
                        width={originalSizeSunset ? originalSizeSunset.width * scale : null}
                      />
                    </div>
                  )}
                </div> */}

            </div>

          </section>

          <section className="authors" id="authors">
            <Authors />
          </section>

          <footer className="footer">
            <Footer />
          </footer>

        </div>

    
  )

}

export default App
