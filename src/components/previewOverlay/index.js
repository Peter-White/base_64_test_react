import React, { Component } from 'react';
import './index.css';

class PreviewOverlay extends Component {

  render() {
    return(
      <div onClick={this.props.hidePreview} className={this.props.overlay} id="overlay">
        <div id="preview" className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <img src={this.props.cropped} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PreviewOverlay;
