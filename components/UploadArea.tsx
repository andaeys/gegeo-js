
import React, { useState } from 'react';
import styles from './UploadArea.module.css'; 
import { validateGeoJSONFile } from '../utils/jsonValidation';
import MapViewer from './MapView';

const UploadArea: React.FC = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [isValidFile, setIsValidFile] = useState<boolean | null>(null);
    const [geoJSONData, setGeoJSONData] = useState<string>('');
    const [showErrorDialog, setShowErrorDialog] = useState<boolean>(false);

    const handleDragEnter = () => setIsDragging(true);
    const handleDragLeave = () => setIsDragging(false);

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
        handleFile(event.dataTransfer.files[0]);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleFile(event.target.files[0]);
    };

    const handleFile = (file: File) => {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const fileContent = event.target?.result as string;
            const isValid = validateGeoJSONFile(fileContent);
            setIsValidFile(isValid);
            setGeoJSONData(fileContent); // Set GeoJSON data for visualization
            console.log(`File validation result: ${isValid}`);
            if (!isValid) {
                setShowErrorDialog(true);
            }
        };
        reader.readAsText(file);
    };

    const handleCloseDialog = () => {
        setIsValidFile(null);
        setGeoJSONData('');
        setShowErrorDialog(false);
    };

    return (
        <div className={styles.uploadAreaContainer}>
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
            {isValidFile && (
                <MapViewer onClose={handleCloseDialog} geoJSONData={geoJSONData} />
            )}
            {showErrorDialog && (
                <div className={styles.popup}>
                    <div className={styles.popupContent}>
                        <p>Invalid JSON file. Please upload a valid GeoJSON file.</p>
                        <button onClick={handleCloseDialog}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadArea;