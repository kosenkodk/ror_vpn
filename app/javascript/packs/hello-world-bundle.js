import ReactOnRails from 'react-on-rails';

import HelloWorld from '../bundles/HelloWorld/components/HelloWorld';
import Features from '../bundles/HelloWorld/components/Features';
import Feature from '../bundles/HelloWorld/components/Feature';
// import Features from "../components/Features";

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  HelloWorld, Features, Feature
});
