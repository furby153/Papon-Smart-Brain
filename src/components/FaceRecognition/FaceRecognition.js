import React from 'react';

const FaceRecognition = ({imageUrl}) => {
    return (
        <div className='center'>
            <img 
                src={imageUrl}
                alt='pic from link'
            /> 
        </div>
    );
}

export default FaceRecognition