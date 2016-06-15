import React from 'react';
import { IndexLink, Link } from 'react-router';

export const Navigation = () => (
  <ul>
    <li><IndexLink to="/" activeClassName="active">Index</IndexLink></li>
    <li><Link to="/one" activeClassName="active">Page One</Link></li>
    <li><Link to="/two" activeClassName="active">Page Two</Link></li>
  </ul>
)