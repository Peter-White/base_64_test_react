import React, { Component } from 'react';
import ImageHandler from './components/imageHandler';
import FileUpload from './components/fileUpload';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <ImageHandler />
      </div>
    );
  }
}

export default App;
