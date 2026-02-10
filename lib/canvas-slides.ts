import JSZip from 'jszip';
import FileSaver from 'file-saver';
import type { SlideData } from './slide-data';

// Function to preload an image
function preloadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous'; // Important for CORS

    img.onload = () => resolve(img);
    img.onerror = (e) => reject(new Error(`Failed to load image: ${src}`));

    img.src = src;
  });
}

// Function to draw a slide on canvas
async function drawSlideOnCanvas(
  canvas: HTMLCanvasElement,
  slide: any,
  index: number,
  profileImage: HTMLImageElement,
): Promise<void> {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Scale factor for the new resolution
  const scale = 2; // 300->600, 400->800

  // Clear canvas
  ctx.fillStyle = '#0f172a'; // Dark blue background
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Set text styles
  ctx.textAlign = 'center';
  ctx.font = `bold ${18 * scale}px Inter, sans-serif`;
  ctx.fillStyle = 'white';

  // Draw based on slide type
  if (slide.type === 'cover') {
    // Draw profile image
    const imageSize = 60 * scale;
    const imageX = canvas.width / 2 - imageSize / 2;
    const imageY = 120 * scale - imageSize / 2;

    // Draw image border/background
    ctx.beginPath();
    ctx.arc(canvas.width / 2, 120 * scale, imageSize / 2 + 4 * scale, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(59, 130, 246, 0.3)';
    ctx.fill();

    // Draw the actual image in a circular clip
    ctx.save();
    ctx.beginPath();
    ctx.arc(canvas.width / 2, 120 * scale, imageSize / 2, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(profileImage, imageX, imageY, imageSize, imageSize);
    ctx.restore();

    // Draw title
    ctx.font = `bold ${18 * scale}px Inter, sans-serif`;
    ctx.fillStyle = 'white';
    ctx.fillText(slide.title, canvas.width / 2, 180 * scale);

    // Draw subtitle
    ctx.font = `${14 * scale}px Inter, sans-serif`;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fillText(slide.subtitle || '', canvas.width / 2, 210 * scale);
  } else if (slide.type === 'content') {
    // Draw bar
    ctx.fillStyle = 'rgb(59, 130, 246)';
    ctx.fillRect(40 * scale, 60 * scale, 32 * scale, 4 * scale);

    // Draw title
    ctx.textAlign = 'left';
    ctx.font = `bold ${18 * scale}px Inter, sans-serif`;
    ctx.fillStyle = 'white';
    ctx.fillText(slide.title, 40 * scale, 90 * scale);

    // Draw content (multi-line with better Chinese text handling)
    ctx.font = `${14 * scale}px Inter, sans-serif`;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';

    const content = slide.content || '';
    const maxWidth = canvas.width - 80 * scale;
    const lineHeight = 24 * scale;
    let y = 120 * scale;

    // For Chinese text, we need to handle character by character
    // since words aren't separated by spaces
    if (/[\u4e00-\u9fa5]/.test(content)) {
      let line = '';
      // Process character by character for Chinese text
      for (let i = 0; i < content.length; i++) {
        const char = content.charAt(i);
        const testLine = line + char;
        const metrics = ctx.measureText(testLine);

        if (metrics.width > maxWidth) {
          ctx.fillText(line, 40 * scale, y);
          line = char;
          y += lineHeight;
        } else {
          line = testLine;
        }
      }
      // Draw the last line
      if (line) {
        ctx.fillText(line, 40 * scale, y);
      }
    } else {
      // Original logic for non-Chinese text
      const words = content.split(' ');
      let line = '';

      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;

        if (testWidth > maxWidth && i > 0) {
          ctx.fillText(line, 40 * scale, y);
          line = words[i] + ' ';
          y += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, 40 * scale, y);
    }
  } else if (slide.type === 'end') {
    // Draw profile image
    const imageSize = 70 * scale;
    const imageX = canvas.width / 2 - imageSize / 2;
    const imageY = 120 * scale - imageSize / 2;

    // Draw image border/background
    ctx.beginPath();
    ctx.arc(canvas.width / 2, 120 * scale, imageSize / 2 + 4 * scale, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(59, 130, 246, 0.3)';
    ctx.fill();

    // Draw the actual image in a circular clip
    ctx.save();
    ctx.beginPath();
    ctx.arc(canvas.width / 2, 120 * scale, imageSize / 2, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(profileImage, imageX, imageY, imageSize, imageSize);
    ctx.restore();

    // Draw name
    ctx.textAlign = 'center';
    ctx.font = `bold ${18 * scale}px Inter, sans-serif`;
    ctx.fillStyle = 'white';
    ctx.fillText(slide.name || 'Meathill', canvas.width / 2, 180 * scale);

    // Draw title
    ctx.font = `${14 * scale}px Inter, sans-serif`;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fillText(slide.title, canvas.width / 2, 210 * scale);

    // Draw bar
    ctx.fillStyle = 'rgb(59, 130, 246)';
    ctx.fillRect(canvas.width / 2 - 20 * scale, 225 * scale, 40 * scale, 2 * scale);

    // Draw message
    if (slide.message) {
      ctx.font = `italic ${14 * scale}px Inter, sans-serif`;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';

      // Handle multi-line message with better Chinese text handling
      const message = `"${slide.message}"`;
      const maxWidth = canvas.width - 100 * scale;
      const lineHeight = 22 * scale;
      let y = 260 * scale;

      // For Chinese text, handle character by character
      if (/[\u4e00-\u9fa5]/.test(message)) {
        let line = '';
        // Process character by character for Chinese text
        for (let i = 0; i < message.length; i++) {
          const char = message.charAt(i);
          const testLine = line + char;
          const metrics = ctx.measureText(testLine);

          if (metrics.width > maxWidth) {
            ctx.fillText(line, canvas.width / 2, y);
            line = char;
            y += lineHeight;
          } else {
            line = testLine;
          }
        }
        // Draw the last line
        if (line) {
          ctx.fillText(line, canvas.width / 2, y);
        }
      } else {
        // Original logic for non-Chinese text
        const words = message.split(' ');
        let line = '';

        for (let i = 0; i < words.length; i++) {
          const testLine = line + words[i] + ' ';
          const metrics = ctx.measureText(testLine);
          const testWidth = metrics.width;

          if (testWidth > maxWidth && i > 0) {
            ctx.fillText(line, canvas.width / 2, y);
            line = words[i] + ' ';
            y += lineHeight;
          } else {
            line = testLine;
          }
        }
        ctx.fillText(line, canvas.width / 2, y);
      }
    }

    // Draw footer
    ctx.font = `${12 * scale}px Inter, sans-serif`;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fillText('感谢您的关注', canvas.width / 2, 300 * scale);
  }
}

// Function to download all slides as a zip file
export async function downloadCanvasSlides(slideData: SlideData) {
  // Create a loading indicator
  const loadingElement = document.createElement('div');
  loadingElement.className = 'fixed inset-0 bg-black/70 flex items-center justify-center z-50';
  loadingElement.innerHTML = `
    <div class="bg-slate-800 p-6 rounded-lg shadow-xl text-white">
      <div class="mb-4">正在生成图片，请稍候...</div>
      <div class="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
        <div id="progress-bar" class="bg-blue-500 h-full w-0 transition-all duration-300"></div>
      </div>
    </div>
  `;
  document.body.appendChild(loadingElement);

  try {
    // First, preload the profile image
    let profileImage: HTMLImageElement;
    try {
      // Update progress to show we're loading the image
      const progressBar = document.getElementById('progress-bar');
      if (progressBar) {
        progressBar.style.width = '10%';
      }

      // Try to get the image from the DOM first
      const imgElement = document.querySelector('img[src*="meathill.png"]') as HTMLImageElement;

      if (imgElement && imgElement.complete && imgElement.naturalWidth !== 0) {
        // If the image is already loaded in the DOM, create a canvas copy to avoid CORS issues
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = imgElement.naturalWidth;
        tempCanvas.height = imgElement.naturalHeight;
        const tempCtx = tempCanvas.getContext('2d');
        if (tempCtx) {
          tempCtx.drawImage(imgElement, 0, 0);

          // Create a new image from the canvas data
          profileImage = new Image();
          profileImage.src = tempCanvas.toDataURL('image/png');

          // Wait for this new image to load
          await new Promise<void>((resolve) => {
            profileImage.onload = () => resolve();
          });
        } else {
          throw new Error('Could not get canvas context');
        }
      } else {
        // If not found in DOM or not loaded, try to load it directly
        profileImage = await preloadImage('/images/meathill.png');
      }

      // Update progress after image is loaded
      if (progressBar) {
        progressBar.style.width = '20%';
      }
    } catch (error) {
      console.error('Failed to load profile image:', error);
      // Create a fallback image with a colored circle and text
      const fallbackCanvas = document.createElement('canvas');
      fallbackCanvas.width = 200;
      fallbackCanvas.height = 200;
      const fallbackCtx = fallbackCanvas.getContext('2d');

      if (fallbackCtx) {
        fallbackCtx.fillStyle = 'rgba(59, 130, 246, 0.8)';
        fallbackCtx.beginPath();
        fallbackCtx.arc(100, 100, 100, 0, Math.PI * 2);
        fallbackCtx.fill();

        fallbackCtx.fillStyle = 'white';
        fallbackCtx.font = 'bold 80px sans-serif';
        fallbackCtx.textAlign = 'center';
        fallbackCtx.textBaseline = 'middle';
        fallbackCtx.fillText('M', 100, 100);

        profileImage = new Image();
        profileImage.src = fallbackCanvas.toDataURL('image/png');

        await new Promise<void>((resolve) => {
          profileImage.onload = () => resolve();
        });
      } else {
        throw new Error('Could not create fallback image');
      }
    }

    const zip = new JSZip();
    const folder = zip.folder(slideData.slug);

    if (!folder) {
      throw new Error('Failed to create zip folder');
    }

    // Create a canvas for drawing slides with the new resolution
    const canvas = document.createElement('canvas');
    canvas.width = 600; // New width
    canvas.height = 800; // New height

    // Process each slide
    for (let i = 0; i < slideData.slides.length; i++) {
      const slide = slideData.slides[i];

      // Draw the slide on canvas
      await drawSlideOnCanvas(canvas, slide, i, profileImage);

      // Convert to PNG and add to zip
      const imageData = canvas.toDataURL('image/png');
      const base64Data = imageData.replace(/^data:image\/png;base64,/, '');
      folder.file(`slide-${i + 1}.png`, base64Data, { base64: true });

      // Update progress
      const progressBar = document.getElementById('progress-bar');
      if (progressBar) {
        // Start from 20% (after image loading) and go to 90%
        const progress = 20 + ((i + 1) / slideData.slides.length) * 70;
        progressBar.style.width = `${progress}%`;
      }
    }

    // Update progress to show we're generating the zip
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
      progressBar.style.width = '90%';
    }

    // Generate and download the zip file
    const content = await zip.generateAsync({ type: 'blob' });
    FileSaver.saveAs(content, `${slideData.slug}.zip`);

    // Complete the progress bar
    if (progressBar) {
      progressBar.style.width = '100%';
    }
  } catch (error) {
    console.error('Error downloading slides:', error);
    alert('下载失败，请重试');
  } finally {
    // Remove the loading indicator after a short delay to show completion
    setTimeout(() => {
      document.body.removeChild(loadingElement);
    }, 500);
  }
}
