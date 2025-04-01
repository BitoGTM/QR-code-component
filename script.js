// QR Code Generator
document.addEventListener('DOMContentLoaded', function () {
  // Elements
  const qrForm = document.getElementById('qrForm');
  const urlInput = document.getElementById('urlInput');
  const qrImage = document.getElementById('qrImage');
  const generateBtn = document.getElementById('generateBtn');
  const resetBtn = document.getElementById('resetBtn');
  const downloadBtn = document.getElementById('downloadBtn');
  const errorMessage = document.getElementById('errorMessage');
  const defaultQrImage = './images/image-qr-code.png';

  // Default state
  let currentQrUrl = '';

  // Initialize with default QR code
  qrImage.src = defaultQrImage;
  downloadBtn.style.display = 'none';

  // Generate QR code when form is submitted
  qrForm.addEventListener('submit', function (e) {
    e.preventDefault();
    generateQRCode();
  });

  // Reset button functionality
  resetBtn.addEventListener('click', function () {
    urlInput.value = '';
    qrImage.src = defaultQrImage;
    errorMessage.textContent = '';
    downloadBtn.style.display = 'none';
    document.querySelector('.QRtitle').textContent = 'Improve your front-end skills by building projects';
    document.querySelector('.QRpara').textContent = 'Scan the QR code to visit Frontend Mentor and take your coding skills to the next level';
  });

  // Download button functionality
  downloadBtn.addEventListener('click', function () {
    if (!currentQrUrl) return;

    const link = document.createElement('a');
    link.href = currentQrUrl;
    link.download = 'qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  // Generate QR code function
  function generateQRCode() {
    const url = urlInput.value.trim();

    if (!url) {
      showError('Please enter a URL');
      return;
    }

    try {
      new URL(url);
      errorMessage.textContent = '';

      qrImage.src = 'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="none" stroke="%23000" stroke-width="2" opacity="0.2"/><path d="M12 2a10 10 0 0 1 10 10" stroke="%23000" stroke-width="2" fill="none"><animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/></path></svg>';

      const qrCodeUrl = `https://chart.googleapis.com/chart?cht=qr&chl=${encodeURIComponent(url)}&chs=250x250&choe=UTF-8&chld=L|0`;

      const testImg = new Image();
      testImg.onload = function () {
        qrImage.src = qrCodeUrl;
        currentQrUrl = qrCodeUrl;

        document.querySelector('.QRtitle').textContent = 'Your QR Code is Ready!';
        document.querySelector('.QRpara').textContent = 'Scan this QR code to visit: ' + url;

        downloadBtn.style.display = 'block';
      };

      testImg.onerror = function () {
        showError('Failed to generate QR code. Please try again.');
        qrImage.src = defaultQrImage;
      };

      testImg.src = qrCodeUrl;

    } catch (error) {
      showError('Please enter a valid URL (include http:// or https://)');
      qrImage.src = defaultQrImage;
    }
  }

  function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.opacity = 1;
    setTimeout(() => {
      errorMessage.style.opacity = 0;
    }, 3000);
  }

  // Trigger Bito suggestions for forEach
  const sampleData1 = ['Generate', 'Reset', 'Download'];
  const sampleData2 = ['Frontend', 'Mentor', 'QR'];
  const sampleData3 = ['https://example.com', 'https://bito.ai', 'https://google.com'];

  const btnGroup = document.querySelector('.button-group');
  const title = document.querySelector('.QRtitle');

  for (let i = 0; i < sampleData1.length; i++) {
    const btn = document.createElement('button');
    btn.textContent = sampleData1[i];
    btn.className = 'btn secondary-btn';
    btnGroup.appendChild(btn);
  }

  for (let i = 0; i < sampleData2.length; i++) {
    const span = document.createElement('span');
    span.textContent = ' ' + sampleData2[i];
    title.appendChild(span);
  }

  for (let i = 0; i < sampleData3.length; i++) {
    console.log('Validating URL:', sampleData3[i]);
  }
});
