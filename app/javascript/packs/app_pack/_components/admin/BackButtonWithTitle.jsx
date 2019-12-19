import React from 'react';
import { NavHashLink as Link } from 'react-router-hash-link';
import { connect } from 'react-redux';
import icArrowLeftSrc from 'images/accordion_menu/arrow_left.svg'

class BackButtonWithTitle extends React.Component {
  render() {
    const { title, url, children } = this.props;
    return (
      <React.Fragment>
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
        <div className="flex-row mt-3 mb-3"><div className="border border-gray"></div></div>
      </React.Fragment>
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
