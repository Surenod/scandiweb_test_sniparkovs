// Import React
import React, { PureComponent } from "react";

export class ProductGallery extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      bigImgUrl: this.props.product.gallery[0],
    };
    this.setBigImg = this.setBigImg.bind(this);
  }

  // Set state to display gallery big image
  setBigImg(url) {
    this.setState({ bigImgUrl: url });
  }

  render() {
    const {product} = this.props;
    const {bigImgUrl} = this.state;
    return (
      <div className="product-details-gallery">
        {/* Create gallery images */}
        <ul className="product-details-gallery__list">
          {product.gallery.map((photo, index) => {
            return (
              <li key={index} className="product-details__img">
                <img
                  src={photo}
                  alt={product.id}
                  onClick={() => this.setBigImg(photo)}
                />
              </li>
            );
          })}
        </ul>
        {/* Create gallery big image */}
        <div className="product-details__img--big">
          <img
            src={bigImgUrl}
            alt={product.id}
          />
        </div>
      </div>
    );
  }
}

export default ProductGallery;
