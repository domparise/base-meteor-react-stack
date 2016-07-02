import React, { Component } from 'react';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import {IndexLink, Link} from 'react-router';
 
class AccountsUIWrapper extends Component {
  componentDidMount() {
    // Use Meteor Blaze to render login buttons
    this.view = Blaze.render(Template.loginButtons, this.refs.container);
  }
  componentWillUnmount() {
    // Clean up Blaze view
    Blaze.remove(this.view);
  }
  render() {
    // Just render a placeholder container that will be filled in
    return <span ref="container" />;
  }
}

const Navigation = () => (
  <ul>
    <li><IndexLink to="/" activeClassName="active">Index</IndexLink></li>
    <li><Link to="/one" activeClassName="active">Page One</Link></li>
    <li><Link to="/two" activeClassName="active">Page Two</Link></li>
  </ul>
)

export const Layout = ( { children } ) => (
  <div>
    <AccountsUIWrapper />
    <Navigation />
    { children }
  </div>
)