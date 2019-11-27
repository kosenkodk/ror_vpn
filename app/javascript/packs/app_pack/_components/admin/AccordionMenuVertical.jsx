import React from 'react';
import { NavHashLink as Link } from 'react-router-hash-link';
import { connect } from 'react-redux';
import { urls } from 'config';

class AccordionMenuVertical extends React.Component {

  render() {
    const { items } = this.props;
    const content2 =
      <div class="accordion" id="accordionExample" >
        <div class="card">
          <div class="card-header" id="headingOne">
            <h5 class="mb-0">
              <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                Collapsible Group Item #1
            </button>
            </h5>
          </div>

          <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
            <div class="card-body">
              <ul class="submenu mr-3"><li><a class="text-light" href="/user/dashboard/#plans">Plans</a></li><li><a class="text-light" href="/user/dashboard/#subscriptions">Subscriptions</a></li><li><a class="text-light" href="/user/dashboard/#billing">Billing</a></li></ul>

            </div>
          </div>


          <div class="card">
            <div class="card-header" id="headingTwo">
              <h5 class="mb-0">
                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  Collapsible Group Item #2
            </button>
              </h5>
            </div>
            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
              <div class="card-body">

                <ul class="submenu"><li><a class="text-light" href="/user/account/#email">Change email</a></li><li><a class="text-light" href="/user/account/#password">Change password</a></li><li><a class="text-light" href="/user/account/#twofaAuth">Two-factor authentication</a></li><li><a class="text-light" href="/user/account/#delete">Delete Account</a></li></ul>      </div>

            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header" id="headingThree">
            <h5 class="mb-0">
              <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                Collapsible Group Item #3
            </button>
            </h5>
          </div>
          <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
            <div class="card-body">
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
          </div>
          </div>
        </div>
      </div>
    const accordionId = 'accordionMenuVertical'
    const content = <div class="accordion" id={accordionId}>
      {items.map((item, index) =>
        <div key={item.path} class="card">
          {item.urls ?
            <React.Fragment>
              <div class="card-header" id={`heading${index}`}>
                <h5 class="mb-0">
                  <button class="btn btn-link" type="button" data-toggle="collapse" data-target={`#collapse${index}`} aria-expanded="true" aria-controls={`collapse${index}`}>
                    {item.name}
                  </button>
                </h5>
              </div>

              <div id={`collapse${index}`} class="collapse" aria-labelledby={`heading${index}`} data-parent={`#${accordionId}`}>
                <div class="card-body border">
                  <ul className="submenu border">
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
    return (
      <React.Fragment>
        {content2}
        {content}
      </React.Fragment>
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
