import html2canvas from "html2canvas"
import JSZip from "jszip"
import FileSaver from "file-saver"
import type { SlideData } from "./slide-data"

// Function to capture a single slide as an image
export async function captureSlideAsImage(slideElement: HTMLElement, width = 300, height = 400): Promise<string> {
  // Create a clone of the element to avoid modifying the original
  const clone = slideElement.cloneNode(true) as HTMLElement

  // Set the clone's dimensions to the desired output size
  clone.style.width = `${width}px`
  clone.style.height = `${height}px`
  clone.style.transform = "none"
  clone.style.position = "absolute"
  clone.style.top = "-9999px"
  clone.style.left = "-9999px"

  // Add the clone to the document temporarily
  document.body.appendChild(clone)

  try {
    // Capture the element as a canvas
    const canvas = await html2canvas(clone, {
      width,
      height,
      scale: 2, // Higher scale for better quality
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#0f172a", // Match the background color
    })

    // Convert canvas to image data URL
    return canvas.toDataURL("image/png")
  } finally {
    // Clean up
    document.body.removeChild(clone)
  }
}

// Function to download all slides as a zip file
export async function downloadSlidesAsZip(slideData: SlideData, slideElements: HTMLElement[]) {
  // Create a new zip file
  const zip = new JSZip()
  const folder = zip.folder(slideData.slug)

  if (!folder) {
    throw new Error("Failed to create zip folder")
  }

  // Show loading state
  const loadingElement = document.createElement("div")
  loadingElement.className = "fixed inset-0 bg-black/70 flex items-center justify-center z-50"
  loadingElement.innerHTML = `
    <div class="bg-slate-800 p-6 rounded-lg shadow-xl text-white">
      <div class="mb-4">正在生成图片，请稍候...</div>
      <div class="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
        <div id="progress-bar" class="bg-primary h-full w-0 transition-all duration-300"></div>
      </div>
    </div>
  `
  document.body.appendChild(loadingElement)

  try {
    // Capture each slide as an image
    for (let i = 0; i < slideElements.length; i++) {
      const slideElement = slideElements[i]
      const imageData = await captureSlideAsImage(slideElement)

      // Remove the data URL prefix to get the base64 data
      const base64Data = imageData.replace(/^data:image\/png;base64,/, "")

      // Add the image to the zip file
      folder.file(`slide-${i + 1}.png`, base64Data, { base64: true })

      // Update progress bar
      const progressBar = document.getElementById("progress-bar")
      if (progressBar) {
        progressBar.style.width = `${((i + 1) / slideElements.length) * 100}%`
      }
    }

    // Generate the zip file
    const content = await zip.generateAsync({ type: "blob" })

    // Download the zip file
    FileSaver.saveAs(content, `${slideData.slug}.zip`)
  } finally {
    // Remove loading element
    document.body.removeChild(loadingElement)
  }
}
