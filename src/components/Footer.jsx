import React from "react"

function Footer() {
    const getDynamicYear = () => {
        const date = new Date()
        const year = date.getFullYear()
        return year
    }

    const currentUrl = window.location.href // The URL of the current page
    const shareText = encodeURIComponent("Check out this awesome project!")

    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?url=${encodeURIComponent(currentUrl)}&p[summary]=${shareText}`
    const twitterShareUrl = `https://x.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${shareText}`
    const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}&text=${shareText}`

    // href="http://www.facebook.com/sharer.php?s=100&p[title]=YOUR_TITLE&p[summary]=YOUR_SUMMARY&p[url]=YOUR_URL&p[images][0]=YOUR_IMAGE_TO_SHARE_OBJECT"

    return (
        <>
            <div className="footer-title-container">
                <h2 className="footer-title">{getDynamicYear()} &copy; Image Upscaler</h2>
            </div>

            <div className="footer-navbar">

                <h3 className="footer-share">Share</h3>
                <a className="footer-social" href={facebookShareUrl} target="_blank" rel="noopener noreferrer">Facebook</a>
                <a className="footer-social" href={twitterShareUrl} target="_blank" rel="noopener noreferrer">X (Twitter)</a>
                <a className="footer-social" href={linkedinShareUrl} target="_blank" rel="noopener noreferrer">LinkedIn</a>

            </div>
        </>
    )
}

export default Footer
