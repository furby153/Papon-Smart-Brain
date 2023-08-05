import './App.css';
import React from 'react';
import ParticlesBg from 'particles-bg'
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

const returnClarifaiRequestOptions = (imageUrl) => {
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = 'c5399a2074724d5e9e660023be3cd7d1';
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = 'paponmat';       
    const APP_ID = 'Smart-Brain';
    // const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';    
    const IMAGE_URL = imageUrl;

    ///////////////////////////////////////////////////////////////////////////////////
    // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
    ///////////////////////////////////////////////////////////////////////////////////

    const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
      ]
    });

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
    };

    return requestOptions;
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrlState: '',
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value);
    this.setState({ input: event.target.value});
  }

  onButtonSubmit = async () => {
    this.setState({imageUrlState: this.state.input});
    // Change this to whatever model you want to use
    const MODEL_ID = 'face-detection'

    try {
      const response = await fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", returnClarifaiRequestOptions(this.state.input));
      const result = await response.json();
      console.log(result.outputs[0].data.regions[0].region_info.bounding_box);
    } catch (error) {
      console.log('error', error);
    }

  }
  
  render() {
    return (
      <div className="App">
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition 
          imageUrl={this.state.imageUrlState}
        />
        <ParticlesBg color="#ffff00" num={100} type="cobweb" bg={true} />
      </div>
    );
  }
  
}

export default App;
