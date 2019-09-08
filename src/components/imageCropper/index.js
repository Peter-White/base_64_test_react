import React, { Component } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import './index.css';

class ImageCropper extends Component {
  constructor() {
    super();

    this.state = {
      cropped: ""
    }
  }

  dataURItoBlob = (dataURI) => {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);

    // create a view into the buffer
    var ia = new Uint8Array(ab);

    // set the bytes of the buffer to the correct values
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    var blob = new Blob([ab], {type: mimeString});
    return blob;
  }

  _crop(){
    // image in dataUrl
    this.setState({cropped: this.refs.cropper.getCroppedCanvas().toDataURL()});
  }

  render() {
    return(
      <div className="col-md-8 offset-md-4">
        <div className="row">
          <div className="img-container">
            <Cropper ref='cropper' src={this.props.image} zoomable={false} viewMode={2} aspectRatio={1/1} background={false} autoCropArea={0.5} crop={this._crop.bind(this)} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6" id="btn-group">
            <button type="button" id="cancel" class="btn btn-success btn-block">Cancel</button>
          </div>
          <div className="col-md-6" id="btn-group">
            <button type="button" id="submit" class="btn btn-danger btn-block">Submit</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageCropper;
