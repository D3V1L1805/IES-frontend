// src/ImageUpload.js
import React, { useState } from 'react';
import axios from 'axios';
import './ImageUpload.css'; // Import CSS for styling

const ImageUpload = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [responseText, setResponseText] = useState('');

    const handleImageChange = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedImage) return;

        const formData = new FormData();
        formData.append('file', selectedImage);

        try {
            const response = await axios.post('https://ies-backend-rxth.onrender.com/upload-photo', formData);
            setResponseText(response.data.description);
        } catch (error) {
            console.error('Error uploading image:', error);
            setResponseText('Error uploading image');
        }
    };

    return (
        <div className="upload-container">
            <div className='Header'>
                Welcome to Image Interpreter AI
            </div>
            <div className='SubHeader'>
                Upload Image and get image description
            </div>
            <div className='SH'>
                <div className='SH1'>Safe</div>
                <strong>&#183;</strong>
                <div className='SH1'>Secure</div>
                <strong>&#183;</strong>
                <div className='SH1'>Reliable</div>
            </div>
            <div style={{ marginTop: '40vh' }}>
                <input type="file" onChange={handleImageChange} />
                <button onClick={handleUpload}>Upload</button>
            </div>
            {selectedImage && (
                <div className="image-preview">
                    <img src={URL.createObjectURL(selectedImage)} alt="Preview" />
                </div>
            )}
            {responseText && (
                <div className={`description-box ${responseText ? 'visible' : ''}`}>
                    {responseText}
                </div>
            )}
        </div>
    );
};

export default ImageUpload;