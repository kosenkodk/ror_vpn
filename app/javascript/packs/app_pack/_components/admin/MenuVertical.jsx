import React from 'react';
import { NavHashLink as Link } from 'react-router-hash-link';
import { connect } from 'react-redux';
import { urls } from 'config';

class MenuVertical extends React.Component {

  render() {
    const { items } = this.props;
    return (<ul className="mt-md-5 p-0 col sidebar accordion_menu list-group">
      {items ? items.map((item, index) =>
        <div onClick={this.props.onClick} key={item.path}>
          <Link key={item.path} smooth to={item.path} className="" activeClassName=""
            location={{ pathname: document.location.pathname + document.location.hash }}>
            <li className="list-group-item" >{item.name}</li>
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
