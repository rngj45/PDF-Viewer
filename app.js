const canvas = document.getElementById('pdf-canvas');
const prevBtn = document.getElementById('prev-page');
const nextBtn = document.getElementById('next-page');
const pageNumber = document.getElementById('page-number');
const zoomInBtn = document.getElementById('zoom-in');
const zoomOutBtn = document.getElementById('zoom-out');
const pdfLib = require('pdf-lib');

let pdfDoc;
let currentPage;
let zoom = 1;

PDFJS.getDocument('path/to/your/pdfpdf.').then(function(pdf) {
  pdfDoc = pdf;
  renderPage(1);
});

prevBtn.addEventListener('click', function() {
  if (currentPage > 1) {
    currentPage--;
    renderPage(currentPage);
  }
});

nextBtn.addEventListener('click', function() {
  if (currentPage < pdfDoc.numPages) {
    currentPage++;
    renderPage(currentPage);
  }
});

zoomInBtn.addEventListener('click', function() {
  zoom += 0.2;
  renderPage(currentPage);
});

zoomOutBtn.addEventListener('click', function() {
  zoom -= 0.2;
  if (zoom < 0.2) {
    zoom = 0.2;
  }
  renderPage(currentPage);
});

function renderPage(pageNum) {
  currentPage = pageNum;
  pageNumber.value = currentPage;
  
  pdfDoc.getPage(currentPage).then(function(page) {
    const viewport = page.getViewport({ scale: zoom });
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    page.render({
      canvasContext: canvas.getContext('2d'),
      viewport: viewport
    });
  });

}
