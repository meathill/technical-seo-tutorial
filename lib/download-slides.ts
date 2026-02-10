import html2canvas from 'html2canvas';
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import type { SlideData } from './slide-data';

// Function to create a slide element for capturing
function createSlideElement(slide: any, index: number): HTMLElement {
  const slideElement = document.createElement('div');
  slideElement.style.width = '300px';
  slideElement.style.height = '400px';
  slideElement.style.position = 'relative';
  slideElement.style.overflow = 'hidden';
  slideElement.style.backgroundColor = '#0f172a';
  slideElement.style.color = 'white';
  slideElement.style.fontFamily = 'Inter, sans-serif';

  // Common styles
  const styles = `
    <style>
      .slide-container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 16px;
      }
      .text-center { text-align: center; }
      .flex-center {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }
      .title {
        font-weight: bold;
        font-size: 18px;
        margin-bottom: 8px;
        color: white;
      }
      .subtitle {
        font-size: 14px;
        opacity: 0.7;
        color: white;
      }
      .content {
        font-size: 14px;
        line-height: 1.5;
        opacity: 0.8;
        color: white;
      }
      .avatar-placeholder {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: rgba(59, 130, 246, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 12px;
        color: white;
        font-weight: bold;
      }
      .bar {
        height: 4px;
        width: 32px;
        background-color: rgb(59, 130, 246);
        margin-bottom: 12px;
      }
      .small-text {
        font-size: 12px;
        opacity: 0.5;
      }
      .message {
        font-style: italic;
        margin-bottom: 8px;
      }
    </style>
  `;

  // Create content based on slide type
  if (slide.type === 'cover') {
    slideElement.innerHTML = `
      ${styles}
      <div class="slide-container flex-center text-center">
        <div class="avatar-placeholder">M</div>
        <div class="title">${slide.title}</div>
        <div class="subtitle">${slide.subtitle || ''}</div>
      </div>
    `;
  } else if (slide.type === 'content') {
    slideElement.innerHTML = `
      ${styles}
      <div class="slide-container">
        <div class="bar"></div>
        <div class="title">${slide.title}</div>
        <div class="content">${slide.content || ''}</div>
      </div>
    `;
  } else if (slide.type === 'end') {
    slideElement.innerHTML = `
      ${styles}
      <div class="slide-container flex-center text-center">
        <div class="avatar-placeholder" style="width: 70px; height: 70px; font-size: 24px;">M</div>
        <div class="title">${slide.name || 'Meathill'}</div>
        <div class="subtitle" style="margin-bottom: 12px;">${slide.title}</div>
        <div style="width: 40px; height: 2px; background-color: rgb(59, 130, 246); margin-bottom: 12px;"></div>
        ${slide.message ? `<div class="content message">"${slide.message}"</div>` : ''}
        <div class="small-text">感谢您的关注</div>
      </div>
    `;
  }

  return slideElement;
}

// Function to download all slides as a zip file
export async function downloadAllSlides(slideData: SlideData) {
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
    const zip = new JSZip();
    const folder = zip.folder(slideData.slug);

    if (!folder) {
      throw new Error('Failed to create zip folder');
    }

    // Create a temporary container for rendering slides
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '-9999px';
    document.body.appendChild(tempContainer);

    // Process each slide
    for (let i = 0; i < slideData.slides.length; i++) {
      const slide = slideData.slides[i];

      // Create and append the slide element
      const slideElement = createSlideElement(slide, i);
      tempContainer.appendChild(slideElement);

      // Capture the slide as an image
      const canvas = await html2canvas(slideElement, {
        width: 600,
        height: 800,
        scale: 2, // Higher scale for better quality
        backgroundColor: '#0f172a',
      });

      // Convert to PNG and add to zip
      const imageData = canvas.toDataURL('image/png');
      const base64Data = imageData.replace(/^data:image\/png;base64,/, '');
      folder.file(`slide-${i + 1}.png`, base64Data, { base64: true });

      // Remove the slide element
      tempContainer.removeChild(slideElement);

      // Update progress
      const progressBar = document.getElementById('progress-bar');
      if (progressBar) {
        progressBar.style.width = `${((i + 1) / slideData.slides.length) * 100}%`;
      }
    }

    // Clean up the temporary container
    document.body.removeChild(tempContainer);

    // Generate and download the zip file
    const content = await zip.generateAsync({ type: 'blob' });
    FileSaver.saveAs(content, `${slideData.slug}.zip`);
  } catch (error) {
    console.error('Error downloading slides:', error);
    alert('下载失败，请重试');
  } finally {
    // Remove the loading indicator
    document.body.removeChild(loadingElement);
  }
}
