
import React, { useState } from 'react';
import styles from './UploadArea.module.css'; 

const UploadArea: React.FC = () => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragEnter = () => setIsDragging(true);
    const handleDragLeave = () => setIsDragging(false);

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
        const file = event.dataTransfer.files[0];
        // Handle dropped file
        console.log('File dropped:', file);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files[0];
        // Handle selected file
        console.log('File selected:', file);
    };

    return (
        <div className={styles.uploadAreaContainer}> {}
            <div
                className={`${styles.uploadArea} ${isDragging ? styles.dragging : ''}`}
                onDragEnter={handleDragEnter}
                onDragOver={(e) => e.preventDefault()}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                 
                <input
                    type="file"
                    className={styles.hidden}
                    onChange={handleInputChange}
                    id="file-upload" 
                />
                <label htmlFor="file-upload" className={styles.uploadButton}>
                    {isDragging ? 'Drop your file here' : 'cloud_upload'} 
                </label>

            </div>
        </div>
    );
};

export default UploadArea;
