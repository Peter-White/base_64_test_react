import React, { Component } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import './index.css';

class FileUpload extends Component {
  constructor(props) {
      super(props);

      this.state = {
        imageURL: '',
      };

      this.handleUploadImage = this.handleUploadImage.bind(this);
    }

    handleUploadImage(ev) {
      ev.preventDefault();

      const data = new FormData();
      data.append('file', this.uploadInput.files[0]);
      data.append('filename', this.fileName.value);
      data.append('test', "TEST")

      fetch('http://127.0.0.1:5000/api/upload', {
        method: 'POST',
        body: data,
      }).then((response) => {
        response.json().then((body) => {
          this.setState({ imageURL: `http://127.0.0.1:5000/${body.file}` });
        });
      });
    }

    render() {
      return (
        <form onSubmit={this.handleUploadImage}>
          <div>
            <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
          </div>
          <div>
            <input ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Enter the desired name of file" />
          </div>
          <br />
          <div>
            <button>Upload</button>
          </div>
          <img src={this.state.imageURL} alt="img" />
        </form>
      );
    }
}

export default FileUpload;
