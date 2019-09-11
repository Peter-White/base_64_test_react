import React, { Component } from 'react';
import ImageDropper from '../imageDropper';
import ImageCropper from '../imageCropper';
import './index.css';

class ImageHandler extends Component {
  constructor() {
    super();

    this.state = {
      imageName: "",
      imageType: "",
      imageInDB: "",
      image: "",
      cropped: ""
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
    .then(data => this.setState({imageInDB: `data:image/png;base64, ${data["image"]}`}));
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

  setImage = (image) => {
    this.setState({imageInDB: image});
  }

  cancelImage = () => {
    this.setState({image: ""})
  }

  postImage = async(cropped) => {
    if(cropped !== "") {
      const data = new FormData();
      data.append('file', this.dataURItoBlob(cropped));
      data.append('filename', this.state.imageName);
      data.append('filetype', this.state.imageType);

      fetch('http://127.0.0.1:5000/api/post', {
        method: 'POST',
        body: data,
      }).then((response) => {
        response.json().then((body) => {
          this.setImage(`data:image/png;base64, ${body.image}`);
        });
      });
    } else {
      console.log("No image found");
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
              imageType: image.type,
              error: ""
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

  render() {
    let option;

    if (this.state.image === "") {
      option = <ImageDropper setImage={this.setImage} readImage={this.readImage} />;
    } else {
      option = <ImageCropper image={this.state.image} cancelImage={this.cancelImage} postImage={this.postImage} />;
    }

    return (
      <div className="container">
          {option}
        <div className="row">
          <div className="col-md-8 offset-md-4">
            <img src={this.state.imageInDB} />
          </div>
        </div>
      </div>
    );
  }
}

export default ImageHandler;
