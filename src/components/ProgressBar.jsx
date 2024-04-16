import React from "react"
import "./ProgressBar.css"

// function ProgressBar(progress) {
//     return (
//         <div className="progress-bar-container">
//             <div className="progress-bar" style={{ width: `${progress}%`}}>
//                 <p>{`${progress}%`}</p>
//             </div>
//             {console.log(progress)}
//         </div>
//     )
// }

function ProgressBar(progress) {
    return (
        <div className="progress-bar-container">
            <div className="progress-bar"></div>
            {console.log(progress)}
        </div>
    )
}

export default ProgressBar
