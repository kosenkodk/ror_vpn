import React from 'react';
import { NavHashLink as Link } from 'react-router-hash-link';
import { connect } from 'react-redux';
import icArrowLeftSrc from 'images/accordion_menu/arrow_left.svg'

class BackButtonWithTitle extends React.Component {
  render() {
    const { title, url, children } = this.props;
    return (
      <div className="btn-back-with-title d-flex">
        <div className="align-self-center mb-1">
          <Link to={url}>
            <img src={icArrowLeftSrc} className="img-fluid arrow" />
          </Link>
        </div>
        <div className="align-self-center">
          {title && <h4 className="mt-2 font-weight-bold">{title}</h4>}
          {children && children}
        </div>
      </div>
    );
  }
}

BackButtonWithTitle.defaultProps = {
  title: '',
  url: ''
}

function mapStateToProps(state) {
  // const { title } = state.page
  // return {
  //   title
  // };
  return state;
}

const connectedPage = connect(mapStateToProps)(BackButtonWithTitle);
export { connectedPage as BackButtonWithTitle };
