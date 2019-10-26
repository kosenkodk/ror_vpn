import React from 'react'
import FooterSocialLinks from '../_sections/FooterSocialLinks'
import I18n from 'i18n-js/index.js.erb'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link';

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer pt-4 my-md-5">
        <div className="row">
          <div className="col-sm-4 col-md-2">
            <h5>{I18n.t('footer.product.title')}</h5>
            <ul className="list-unstyled text-small">
              <li><HashLink to="#" className="text-light">{I18n.t('footer.product.how_it_works')}</HashLink></li>
              <li><Link to="/coming_soon" className="text-light">{I18n.t('footer.product.why')} {I18n.t('vegaVPN')}
                {I18n.t('footer.product.vpn')}</Link>
              </li>
              <li><Link to="/coming_soon" className="text-light">{I18n.t('footer.product.pricing')}</Link></li>
              <li><Link to="/coming_soon" className="text-light">{I18n.t('footer.product.multihop_vpn')}</Link></li>
              <li><Link to="/coming_soon" className="text-light">{I18n.t('footer.product.server_status')}</Link></li>
              <li><Link to="/coming_soon" className="text-light">{I18n.t('footer.product.server_locations')}</Link></li>
              <li><Link to="/coming_soon" className="text-light">{I18n.t('footer.product.what_is_a_vpn_tunnel')}</Link></li>
              {/*
              <li><Link to="/coming_soon" className="text-light">{I18n.t('footer.product.vpn_performance')}</Link></li>
              <li><Link to="/coming_soon" className="text-light">{I18n.t('vegaVPN')}
                {I18n.t('footer.product.vpn_dns_server')}</Link></li>
              <li><Link to="/coming_soon" className="text-light">{I18n.t('footer.product.wi_fi_hotspot')}</Link></li>
              <li><Link to="/coming_soon" className="text-light">{I18n.t('footer.product.protection')}</Link></li>
              <li><Link to="/coming_soon" className="text-light">{I18n.t('footer.product.protocol_comparison')}</Link></li>
              <li><Link to="/coming_soon" className="text-light">{I18n.t('footer.product.privacy_laws')}</Link></li>
              <li><Link to="/coming_soon" className="text-light">{I18n.t('footer.product.comparison')}</Link></li>
              <li><Link to="/coming_soon" className="text-light">{I18n.t('footer.product.wireguard')}</Link></li> 
              */}
            </ul>
          </div>
          <div className="col-sm-4 col-md-2">
            <h5>{I18n.t('footer.company.title')}</h5>
            <ul className="list-unstyled text-small">
              <li><Link to="/coming_soon" className="text-light">{I18n.t('footer.company.about_us')}</Link></li>
              <li><Link to="/coming_soon" className="text-light">{I18n.t('footer.company.customer_reviews')}</Link></li>
              <li><Link to="/coming_soon" className="text-light">{I18n.t('footer.company.blog')}</Link></li>
              <li><Link to="/coming_soon" className="text-light">{I18n.t('footer.company.supported_projects')}</Link></li>
              <li><Link to="/coming_soon" className="text-light">{I18n.t('vegaVPN')} {I18n.t('footer.company.vpn_facts')}
              </Link></li>
              <li><Link to="/coming_soon" className="text-light">{I18n.t('footer.company.press_resources')}</Link></li>
            </ul>
          </div>
          <div className="col-sm-4 col-md-2">
            <h5>{I18n.t('footer.security.title')}</h5>
            <ul className="list-unstyled text-small">
              <li><Link to="/coming_soon" className="text-light">{I18n.t('footer.security.terms_of_service')}</Link>
              </li>
              <li><Link to="/coming_soon" className="text-light">{I18n.t('footer.security.privacy_policy')}
              </Link></li>
              <li><Link to="/coming_soon" className="text-light">{I18n.t('footer.security.report_vulnerability')}</Link></li>
              <li><Link to="/coming_soon" className="text-light">{I18n.t('footer.security.refund_policy')}</Link></li>
              <li><Link to="/coming_soon" className="text-light">{I18n.t('footer.security.warrant_canary')}</Link></li>
              <li><Link to="/coming_soon" className="text-light">{I18n.t('footer.security.legal_guidelines')}</Link></li>
              <li><Link to="/coming_soon" className="text-light">{I18n.t('footer.security.transparency_report')}</Link></li>
            </ul>
          </div>
          <div className="col-sm-4 col-md-2">
            <h5>{I18n.t('footer.download.title')}</h5>
            <ul className="list-unstyled text-small">
              <li><Link to="/coming_soon" className="text-light">{I18n.t('footer.download.windows_app')}</Link></li>
              <li><Link to="/coming_soon" className="text-light">{I18n.t('footer.download.macos_app')}</Link></li>
              <li><Link to="/coming_soon" className="text-light">{I18n.t('footer.download.ios_app')}</Link></li>
              <li><Link to="/coming_soon" className="text-light">{I18n.t('footer.download.android_app')}</Link></li>
              <li><Link to="/coming_soon" className="text-light">{I18n.t('footer.download.setup_linux')}</Link></li>
              <li><Link to="/coming_soon" className="text-light">{I18n.t('footer.download.setup_routers')}</Link></li>
              <li><Link to="/coming_soon" className="text-light">{I18n.t('footer.download.setup_nas')}</Link></li>
            </ul>
          </div>
          <div className="col-sm-4 col-md-2">
            <h5>{I18n.t('footer.support.title')}</h5>
            <ul className="list-unstyled text-small">
              <li><Link to="/coming_soon" className="text-light">{I18n.t('footer.support.help_center')}</Link></li>
              <li><Link to="/coming_soon" className="text-light">{I18n.t('footer.support.setup_guides')}</Link></li>
              <li><Link to="/coming_soon" className="text-light">{I18n.t('footer.support.privacy_guides')}</Link></li>
            </ul>
          </div>
          <div className="col-sm-4 col-md-2">
            <h5>{I18n.t('footer.contact.title')}</h5>
            <ul className="list-unstyled text-small">
              <li><HashLink to="/contact_us" className="text-light">{I18n.t('footer.contact.contact_us')}</HashLink></li>
              <li><Link to="/coming_soon" className="text-light">{I18n.t('footer.contact.twitter')}</Link></li>
            </ul>
          </div>
        </div>
        <FooterSocialLinks />
      </footer>)
  }
}
export default Footer