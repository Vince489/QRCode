document.getElementById('upload-btn').addEventListener('click', function() {
    const fileInput = document.getElementById('file-input').files[0];
    if (fileInput) {
        const formData = new FormData();
        formData.append('file', fileInput);

        fetch('/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            const qrCodeImg = document.getElementById('qr-code');
            qrCodeImg.src = data.src;
            qrCodeImg.style.display = 'block';
        })
        .catch(error => console.error('Error:', error));
    } else {
        alert('Please select an audio file');
    }
});
