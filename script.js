const canvas = document.getElementById('signatureCanvas');
const ctx = canvas.getContext('2d');
const clearBtn = document.getElementById('clearBtn');
const saveBtn = document.getElementById('saveBtn');
const downloadLink = document.getElementById('downloadLink');

let isDrawing = false;
let lastX = 0;
let lastY = 0;

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 2;
ctx.strokeStyle = '#000';

function draw(e) {
    if (!isDrawing) return;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    downloadLink.removeAttribute('href');
});

saveBtn.addEventListener('click', () => {
    // Create a temporary canvas
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');

    // Draw a white background on the temporary canvas
    tempCtx.fillStyle = 'white';
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

    // Draw the signature on the temporary canvas
    tempCtx.drawImage(canvas, 0, 0);

    // Assign the image data to the download link
    downloadLink.href = tempCanvas.toDataURL('image/png');
});
