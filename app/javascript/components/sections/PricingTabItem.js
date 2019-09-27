import React from 'react'
import I18n from 'i18n-js/index.js.erb'

class PricingTabItem extends React.Component {

  render() {
    // const { item } = this.props;

    return (
      <React.Fragment>
        <h1>{this.props.item.title}</h1>
        {/*<div class="card mb-3 active">
          <!-- <div class="card-header">
          </div> -->
  <div class="card-body">
            <% if item.price > 0 %>
    <h1 class="card-title pricing-card-title pt-0 mt-0 mb-0">
              <span class="text-sm-1 align-text-top">$</span><%= item.try(:price) %>
    </h1>
            <% else %>
    <h1 class="card-title pricing-card-title">Free</h1>
            <% end %>
    <span class="text-sm-1 align-text-top pt-n5">Per month</span>
            <h5 class="card-title"></h5>
            <div class="row">
              <% if item.price > 0 %>
      <div class="col-md-6 offset-0">
                <ul class="text-left list-unstyled">
                  <% item.features.split(',').each do |feature| %>
          <li><%= image_tag 'icons/icon_checkbox_on.png', {class: 'img-fluid', alt: '' } %> <%= feature %></li>
                  <% end %>
        </ul>
              </div>
              <div class="col-md-6 offset-0 text-right">
                <p class="pb-0">
                  <%= link_to "Save $ #{item.try(:price_duration_sale)}", '#', {class: "btn btn-blue active rounded-pill text-white"} %>
        </p>
                <h5 class="card-title text-info"><strike>$ <%= item.try(:price_duration) %></strike></h5>
                <h5 class="card-title"><%= item.try(:price_comment) %></h5>
              </div>
              <div class="col-md-12 pt-2">
                <!-- <button type="button" class="btn btn-outline-primary rounded-pill mb-n9">Best offer</button> -->
        <%= link_to 'Start my free trial', '#', {class: 'btn btn-outline-primary'} %>
      </div>
              <% else %>
      <% featureCollection1, featureCollection2 = devide_on_two_collections item.features.split(',') %>
      <div class="col-md-4 offset-0">
                <ul class="text-left list-unstyled">
                  <% featureCollection1.each do |feature| %>
          <li><%= image_tag 'icons/icon_checkbox_on.png', {class: 'img-fluid', alt: '' } %> <%= feature %></li>
                  <% end %>
        </ul>
              </div>
              <div class="col-md-4"></div>
              <div class="col-md-4 offset-0">
                <ul class="text-left list-unstyled">
                  <% featureCollection2.each do |feature| %>
          <li><%= image_tag 'icons/icon_checkbox_on.png', {class: 'img-fluid', alt: '' } %> <%= feature %></li>
                  <% end %>
        </ul>
              </div>
              <% end %>
    </div>
          </div>

          <!-- <div class="card-footer">
          </div> -->
</div>
    */}
      </React.Fragment >
    )
  }

}
export default PricingTabItem