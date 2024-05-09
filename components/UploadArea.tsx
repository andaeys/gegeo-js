
import React, { useState } from 'react';
import styles from './UploadArea.module.css'; 
import { validateGeoJSONFile } from '../utils/jsonValidation';

const UploadArea: React.FC = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [isValidFile, setIsValidFile] = useState<boolean | null>(null);

    const handleDragEnter = () => setIsDragging(true);
    const handleDragLeave = () => setIsDragging(false);

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
        
        // console.log('File dropped:', file);
        handleFile(event.target.files[0]); 
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log('File selected:', file);
        handleFile(event.target.files[0]); 
    };

    const handleFile = (file: File) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            const fileContent = event.target?.result as string;
            const isValid = validateGeoJSONFile(fileContent);
            setIsValidFile(isValid);
            console.log(`File validation result: ${isValid}`);
        };
        reader.readAsText(file); // Read file as text
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
