import React from 'react';
import UploadArea from '../components/UploadArea';
import HeaderText from '../components/HeaderText';

const MainPage: React.FC = () => {
    return (
        <div style={{height: '100vh', padding: '200px', justifyContent: 'center', background: '#d8d3d3'}}>
            <HeaderText/>
            <UploadArea />
        </div>
    );
};

export default MainPage;
