import React from 'react';
import { NavHashLink as Link } from 'react-router-hash-link';
import { connect } from 'react-redux';
import { userActions } from '../../_actions';
import { urls } from 'config';

class AccordionMenuVertical extends React.Component {


  render() {
    const { items } = this.props;

    return (
      <div class="accordion" id="accordionExample">
        {items.map((item, index) =>
          <div key={item.path} class="card">
            {item.urls ?
              <React.Fragment>
                <div class="card-header" id="headingOne">
                  <h5 class="mb-0">
                    <button class="btn btn-link" type="button" data-toggle="collapse" data-target={`#collapse${index}`} aria-expanded="true" aria-controls="collapseOne">
                      {item.name}
                    </button>
                  </h5>
                </div>

                <div id={`collapse${index}`} class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                  <div class="card-body">
                    <ul className="submenu ml-3">
                      {item.urls && Object.values(item.urls).map(subItem =>
                        <li key={subItem.path}>
                          <Link smooth className="text-light" activeClassName="active" to={subItem.path}
                            location={{ pathname: document.location.pathname + document.location.hash }}>
                            {subItem.name}
                          </Link>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </React.Fragment>
              :

              <div className="card-header collapsed" data-toggle="collapse">
                <Link key={item.path} smooth to={item.path} activeClassName="active"
                  location={{ pathname: document.location.pathname + document.location.hash }}>
                  {item.name}
                </Link>
              </div>
            }
          </div>
        )};
       </div>
    );

  }
}

AccordionMenuVertical.defaultProps = {
  items: [
    urls.user_dashboard,
    urls.user_account,
    urls.tickets,
    urls.user_payment,
    urls.user_downloads,
    urls.user_invite_friend,
  ]
}



function mapStateToProps(state) {
  const { title } = state.page
  const { loggedIn, user } = state.authentication;
  return {
    loggedIn, user, title
  };
}

const connectedPage = connect(mapStateToProps)(AccordionMenuVertical);
export { connectedPage as AccordionMenuVertical };
