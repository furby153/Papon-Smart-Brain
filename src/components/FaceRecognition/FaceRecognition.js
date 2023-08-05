import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({ imageUrl }) => {
    return (
        <div className='center'>
            <img
                className='imageToShow'
                src={imageUrl}
                alt=''
            /> 
        </div>
    );
}

export default FaceRecognition;

//'https://cdn.pixabay.com/photo/2018/06/14/21/11/girl-3475649_1280.jpg';