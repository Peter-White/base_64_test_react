import React, { Component } from 'react';
import Cropper from 'react-cropper';
import Dropzone from 'react-dropzone';
import 'cropperjs/dist/cropper.css';
import './index.css';

class ImageDropper extends Component {
  constructor() {
    super();

    this.state = {
      error: "",
      imgClass: "empty"
    }
  }

  onDragEnter = () => {
    this.setState({imgClass: "full"});
  }

  onDragLeave = () => {
    this.setState({imgClass: "empty"});
  }

  onDropRejected = () => {
    this.setState({imgClass: "empty", error: "Not an image file. Change the extention or try other file."});
  }

  render() {
    return (
      <div className="col-md-8 offset-md-4">
       <div className={this.state.imgClass} id="img-select">
          <Dropzone
            onDropAccepted={this.props.readImage.bind(this)}
            onDropRejected={this.onDropRejected}
            accept="image/*"
            onDragEnter={this.onDragEnter}
            onDragLeave={this.onDragLeave}
            multiple={false}>
            {({getRootProps, getInputProps}) => {
              return (
                <div
                {...getRootProps()}
                >
                <input {...getInputProps()} />
                {
                  <p>Try dropping some files here, or click to select files to upload.</p>
                }
                </div>
              )
            }}
          </Dropzone>
          <p className="error">{this.state.error}</p>
        </div>
      </div>
    );
  }
}

export default ImageDropper;
