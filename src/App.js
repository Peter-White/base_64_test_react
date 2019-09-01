import React, { Component } from 'react';
import ImageUpload from './components/imageUpload';
import FileUpload from './components/fileUpload';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      image: ""
    }
  }

  componentWillMount() {
    fetch('http://127.0.0.1:5000/api/image', {
      methods: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => this.setState({image: `data:image/png;base64, ${data["image"]}`}));
  }

  setImage = (image) => {
    this.setState({image: image})
  }

  render() {
    return (
      <div className="App">
        <ImageUpload setImage={this.setImage}/>
        <img src={this.state.image} />
        <FileUpload />
      </div>
    );
  }
}

export default App;
