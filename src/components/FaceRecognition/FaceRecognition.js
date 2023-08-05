import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({ imageUrl, box }) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img
                    className='imageToShow'
                    id='inputimage'
                    src={imageUrl}
                    alt=''
                />
                <div 
                    className='bounding-box'
                    style={
                        {
                        top: box.topRow,
                        right: box.rightCol,
                        bottom: box.bottomRow,
                        left: box.leftCol,
                        }
                    }
                >
                </div> 
            </div>
            
        </div>
    );
}

export default FaceRecognition;

//'https://cdn.pixabay.com/photo/2018/06/14/21/11/girl-3475649_1280.jpg';

//https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1