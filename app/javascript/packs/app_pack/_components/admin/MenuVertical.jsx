import React from 'react';
import { NavHashLink as Link } from 'react-router-hash-link';
import { connect } from 'react-redux';
import { urls } from 'config';

class MenuVertical extends React.Component {

  render() {
    const { items, user } = this.props;
    return (<ul className="mt-md-3 mt-lg-5 p-0 col sidebar accordion_menu list-group">
      {this.props.children}
      {/* <li className="list-group-item d-block d-sm-none"> {user && user.email}</li> */}
      {items ? items.map((item, index) =>
        <div onClick={this.props.onClick} key={item.path}>
          {/* desktops */}
          <Link key={`d${item.path}`} smooth to={item.path} className="d-none d-md-block" activeClassName=""
            location={{ pathname: document.location.pathname + document.location.hash }}>
            <li className="list-group-item">{item.name}</li>
          </Link>
          {/* mobiles */}
          <Link key={`m${item.path}`} smooth to={item.path} className="d-block d-md-none" activeClassName="active"
            location={{ pathname: document.location.pathname + document.location.hash }}>
            <li className="list-group-item">{item.name}</li>
          </Link>
        </div>
      )
        : <li className="list-group-item">no items</li>
      }
    </ul>
    );
  }
}

MenuVertical.defaultProps = {
  items: [
    urls.user_dashboard,
    urls.user_account,
    urls.tickets,
    urls.user_payment,
    urls.user_downloads,
    urls.user_invite_friend,
  ],
  accordionId: 'accordionMenuVertical',
  collapsedItemIndex: 0
}

function mapStateToProps(state) {
  const { title } = state.page
  const { loggedIn, user } = state.authentication;
  return {
    loggedIn, user, title
  };
}

const connectedPage = connect(mapStateToProps)(MenuVertical);
export { connectedPage as MenuVertical };
