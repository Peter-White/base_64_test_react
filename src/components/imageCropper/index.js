import React, { Component } from 'react';
import Cropper from 'react-cropper';
import PreviewOverlay from '../previewOverlay';
import 'cropperjs/dist/cropper.css';
import './index.css';

class ImageCropper extends Component {
  constructor() {
    super();

    this.state = {
      cropped: "",
      overlay: "hide"
    }
  }

  submitImage = (e) => {
    e.preventDefault();
    this.props.postImage(this.state.cropped);
  }

  _crop(){
    // image in dataUrl
    this.setState({cropped: this.refs.cropper.getCroppedCanvas().toDataURL()});
  }

  showPreview = () => {
    const cropper = this.refs.cropper;

    let cropped = cropper.getCroppedCanvas();

    console.log(cropped);
    this.setState({overlay: "show"});
  }

  hidePreview = () => {
    this.setState({overlay: "hide"});
  }

  render() {
    return(
      <div className="row">
        <PreviewOverlay hidePreview={this.hidePreview} overlay={this.state.overlay} cropped={this.state.cropped} />
        <div className="col-md-8 offset-md-4">
          <div className="row">
            <div className="img-container">
              <Cropper ref='cropper' src={this.props.image} zoomable={false} viewMode={2} aspectRatio={1/1} background={false} autoCropArea={0.5} crop={this._crop.bind(this)} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4" id="btn-group">
              <button type="button" id="cancel" className="btn btn-danger btn-block" onClick={this.props.cancelImage}>Cancel</button>
            </div>
            <div className="col-md-4" id="btn-group">
              <button type="button" id="previewButton" className="btn btn-primary btn-block" onClick={this.showPreview}>Preview</button>
            </div>
            <div className="col-md-4" id="btn-group">
              <button type="button" id="submit" onClick={this.submitImage} className="btn btn-success btn-block">Submit</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageCropper;
