import React, { Component } from 'react';
import Cropper from 'react-cropper';
import Dropzone from 'react-dropzone';
import 'cropperjs/dist/cropper.css';
import './index.css';

class ImageUpload extends Component {
  constructor() {
    super();

    this.state = {
      imageName: "",
      imageType: "",
      image: "",
      cropped: "",
      imgClass: "empty"
    }
  }

  readImage = (files) => {
    let image = files[0];
    let imageURL = URL.createObjectURL(image);

    const image2base64 = require('image-to-base64');
    image2base64(imageURL) // you can also to use url
      .then(
          (response) => {
            this.setState({
              image: `data:${image.type};base64, ${response}`,
              imageName: image.name,
              imageType: image.type
            })
          }
      )
      .catch(
          (error) => {
              console.log(error); //Exepection error....
          }
      )
      this.setState({imgClass: "empty"});
  }

  setImage = async(e) => {
    e.preventDefault();
    if(this.state.cropped !== "") {
      const data = new FormData();
      data.append('file', this.dataURItoBlob(this.state.cropped));
      data.append('filename', this.state.imageName);

      fetch('http://127.0.0.1:5000/api/post', {
        method: 'POST',
        body: data,
      }).then((response) => {
        response.json().then((body) => {
          console.log(body);
        });
      });
    } else {
      console.log("No image found");
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

  onDragEnter = () => {
    this.setState({imgClass: "full"});
  }

  onDragLeave = () => {
    this.setState({imgClass: "empty"});
  }

  onDropRejected = () => {
    console.log("Not an image");
    this.setState({imgClass: "empty"});
  }

  render() {
    return (
      <div className="container" ref="thing">
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <form onSubmit={this.setImage}>
              <div className="form-group">
                <div className={this.state.imgClass} id="img-select">
                  <Dropzone
                    onDropAccepted={this.readImage.bind(this)}
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
                </div>
              </div>
              <div className="form-group">
                <Cropper ref='cropper' src={this.state.image} zoomable={false} viewMode={0} aspectRatio={1} background={false} autoCropArea={0.5} crop={this._crop.bind(this)} />
              </div>
              <div className="form-group">
                <img src={this.state.cropped} />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageUpload;
