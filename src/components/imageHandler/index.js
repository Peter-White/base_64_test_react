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

  setImage = (image) => {
    this.setState({image: image})
  }

  setImage = async(e) => {
    e.preventDefault();
    if(this.state.cropped !== "") {
      const data = new FormData();
      data.append('file', this.dataURItoBlob(this.state.cropped));
      data.append('filename', this.state.imageName);
      data.append('filetype', this.state.imageType);

      fetch('http://127.0.0.1:5000/api/post', {
        method: 'POST',
        body: data,
      }).then((response) => {
        response.json().then((body) => {
          this.props.setImage(`data:image/png;base64, ${body.image}`);
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
      option = <ImageCropper image={this.state.image} />;
    }

    return (
      <div className="container">
        <div className="row">
          {option}
        </div>
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
