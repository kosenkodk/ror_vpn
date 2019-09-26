import React from 'react'
import I18n from 'i18n-js/index.js.erb'

class FooterAccordion extends React.Component {
  render() {
    return (
      <footer className="footer pt-4 my-md-5">
        <div className="row">
          <div className="col-12">
            <div id="accordion" className="accordion col-12 mb-2">
              <div className="card mb-0 bg-transparent">
                <div className="card-header collapsed" data-toggle="collapse" href="#collapseProduct">
                  <a className="card-title">
                    {I18n.t('footer.product.title')}
                  </a>
                </div>
                <div id="collapseProduct" className="card-body collapse" data-parent="#accordion">
                  <ul className="list-unstyled text-small">
                    <li><a className="text-light" href="/coming_soon">{I18n.t('footer.product.how_it_works')}</a></li>
                    <li><a className="text-light" href="/coming_soon">{I18n.t('footer.product.why')} {I18n.t('vegaVPN')}
                      {I18n.t('footer.product.vpn')}</a>
                    </li>
                    <li><a className="text-light" href="/coming_soon">{I18n.t('footer.product.pricing')}</a></li>
                    <li><a className="text-light" href="/coming_soon">{I18n.t('footer.product.multihop_vpn')}</a></li>
                    <li><a className="text-light" href="/coming_soon">{I18n.t('footer.product.server_status')}</a></li>
                    <li><a className="text-light" href="/coming_soon">{I18n.t('footer.product.server_locations')}</a>
                    </li>
                    <li><a className="text-light" href="/coming_soon">{I18n.t('footer.product.what_is_a_vpn_tunnel')}</a>
                    </li>
                    <li><a className="text-light" href="/coming_soon">{I18n.t('footer.product.vpn_performance')}</a></li>
                    <li><a className="text-light" href="/coming_soon">{I18n.t('vegaVPN')}
                      {I18n.t('footer.product.vpn_dns_server')}</a></li>
                    <li><a className="text-light" href="/coming_soon">{I18n.t('footer.product.wi_fi_hotspot')}</a></li>
                    <li><a className="text-light" href="/coming_soon">{I18n.t('footer.product.protection')}</a></li>
                    <li><a className="text-light" href="/coming_soon">{I18n.t('footer.product.protocol_comparison')}</a>
                    </li>
                    <li><a className="text-light" href="/coming_soon">{I18n.t('footer.product.privacy_laws')}</a></li>
                    <li><a className="text-light" href="/coming_soon">{I18n.t('footer.product.comparison')}</a></li>
                    <li><a className="text-light" href="/coming_soon">{I18n.t('footer.product.wireguard')}</a></li>
                  </ul>
                </div>
                <div className="card-header collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseCompany">
                  <a className="card-title">
                    {I18n.t('footer.company.title')}
                  </a>
                </div>
                <div id="collapseCompany" className="card-body collapse" data-parent="#accordion">
                  <ul className="list-unstyled text-small">
                    <li><a className="text-light" href="/coming_soon">{I18n.t('footer.company.about_us')}</a></li>
                    <li><a className="text-light" href="/coming_soon">{I18n.t('footer.company.customer_reviews')}</a>
                    </li>
                    <li><a className="text-light" href="/coming_soon">{I18n.t('footer.company.blog')}</a></li>
                    <li><a className="text-light" href="/coming_soon">{I18n.t('footer.company.supported_projects')}</a>
                    </li>
                    <li><a className="text-light" href="/coming_soon">{I18n.t('vegaVPN')}
                      {I18n.t('footer.company.vpn_facts')}
                    </a></li>
                    <li><a className="text-light" href="/coming_soon">{I18n.t('footer.company.press_resources')}</a></li>
                  </ul>
                </div>
                <div className="card-header collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseSecurity">
                  <a className="card-title">
                    {I18n.t('footer.security.title')}
                  </a>
                </div>
                <div id="collapseSecurity" className="card-body collapse" data-parent="#accordion">
                  <ul className="list-unstyled text-small">
                    <li><a className="text-light" href="/coming_soon">{I18n.t('footer.security.terms_of_service')}</a>
                    </li>
                    <li><a className="text-light" href="/coming_soon">{I18n.t('footer.security.privacy_policy')}
                    </a></li>
                    <li><a className="text-light"
                      href="/coming_soon">{I18n.t('footer.security.report_vulnerability')}</a></li>
                    <li><a className="text-light" href="/coming_soon">{I18n.t('footer.security.refund_policy')}</a></li>
                    <li><a className="text-light" href="/coming_soon">{I18n.t('footer.security.warrant_canary')}</a></li>
                    <li><a className="text-light" href="/coming_soon">{I18n.t('footer.security.legal_guidelines')}</a>
                    </li>
                    <li><a className="text-light" href="/coming_soon">{I18n.t('footer.security.transparency_report')}</a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="card-header collapsed" data-toggle="collapse" href="#collapseDownload">
                <a className="card-title">
                  {I18n.t('footer.download.title')}
                </a>
              </div>
              <div id="collapseDownload" className="card-body collapse" data-parent="#accordion">
                <ul className="list-unstyled text-small">
                  <li><a className="text-light" href="/coming_soon">{I18n.t('footer.download.windows_app')}</a></li>
                  <li><a className="text-light" href="/coming_soon">{I18n.t('footer.download.macos_app')}</a></li>
                  <li><a className="text-light" href="/coming_soon">{I18n.t('footer.download.ios_app')}</a></li>
                  <li><a className="text-light" href="/coming_soon">{I18n.t('footer.download.android_app')}</a></li>
                  <li><a className="text-light" href="/coming_soon">{I18n.t('footer.download.setup_linux')}</a></li>
                  <li><a className="text-light" href="/coming_soon">{I18n.t('footer.download.setup_routers')}</a></li>
                  <li><a className="text-light" href="/coming_soon">{I18n.t('footer.download.setup_nas')}</a></li>
                </ul>
              </div>

              <div className="card-header collapsed" data-toggle="collapse" href="#collapseContact">
                <a className="card-title">
                  {I18n.t('footer.contact.title')}
                </a>
              </div>
              <div id="collapseContact" className="card-body collapse" data-parent="#accordion">
                <ul className="list-unstyled text-small">
                  <li><a className="text-light" href="/contacts/new">{I18n.t('footer.contact.contact_us')}</a></li>
                  <li><a className="text-light" href="/coming_soon">{I18n.t('footer.contact.twitter')}</a></li>
                </ul>
              </div>

              <div className="card-header collapsed" data-toggle="collapse" href="#collapseSupport">
                <a className="card-title">
                  {I18n.t('footer.support.title')}
                </a>
              </div>
              <div id="collapseSupport" className="card-body collapse" data-parent="#accordion">
                <ul className="list-unstyled text-small">
                  <li><a className="text-light" href="/coming_soon">{I18n.t('footer.support.help_center')}</a></li>
                  <li><a className="text-light" href="/coming_soon">{I18n.t('footer.support.setup_guides')}</a></li>
                  <li><a className="text-light" href="/coming_soon">{I18n.t('footer.support.privacy_guides')}</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center">
            {/* <%= render 'shared/footer_social_links' } */}
          </div>
        </div>
      </footer>
    )
  }
}
export default FooterAccordion