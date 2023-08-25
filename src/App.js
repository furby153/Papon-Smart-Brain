import './App.css';
import React from 'react';
import ParticlesBg from 'particles-bg'
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

const initialState = {
  input: '',
  imageUrlState: '',
  box: {},
  route:'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }  

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    }});
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const faceDetectedImage = document.getElementById('inputimage');
    const width = Number(faceDetectedImage.width);
    const height = Number(faceDetectedImage.height);
    // console.log('width: '+width, 'height: '+height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  displayFaceBox = (box) => {
    // console.log(box);
    this.setState({box: box})
  }

  onInputChange = (event) => {
    console.log(event.target.value);
    this.setState({ input: event.target.value});
  }

  onPicturesSubmit = async () => {
    this.setState({ imageUrlState: this.state.input });
 
    try {
      const response = await fetch(
        'http://localhost:3000/clarifai', {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            input: this.state.input
          }),
      });
      
      if (response) {
        const fetchResponse = await fetch(
          'http://localhost:3000/image', {
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: this.state.user.id
          }),
        });
  
      const count = await fetchResponse.json();
  
      this.setState(
        Object.assign(this.state.user, 
          {entries: count}
        ));
      }
  
      const result = await response.json();
      console.log(result);
      // console.log(result.outputs[0].data.regions[0].region_info.bounding_box);
      this.displayFaceBox(this.calculateFaceLocation(result));
    } catch (error) {
      console.log('error', error);
    }
  };

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn , imageUrlState, route, box } = this.state;
    return (
      <div className="App">
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {this.state.route === 'home'
          ? <div>
              <Logo />
              <Rank 
                name={this.state.user.name} 
                entries={this.state.user.entries}
              /> 
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onPicturesSubmit={this.onPicturesSubmit}
              />
              <FaceRecognition 
                box={box}
                imageUrl={imageUrlState}
              />
            </div>
          : (
              (route === 'signin' || route === 'signout')
              ? <SignIn 
                  onRouteChange={this.onRouteChange}
                  loadUser={this.loadUser}
                />
              : <Register 
                  onRouteChange={this.onRouteChange}
                  loadUser={this.loadUser}
                />
            )
        }
        
        
        <ParticlesBg color="#ffff00" num={100} type="cobweb" bg={true} />
      </div>
    );
  }
  
}

export default App;
