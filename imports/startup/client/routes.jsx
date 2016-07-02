import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { Layout } from '../../ui/Layout.jsx';
import { Index } from '../../ui/Index.jsx';

import { One } from '../../ui/One.jsx';
import { Two } from '../../ui/Two.jsx';
import { NotFound } from '../../ui/NotFound.jsx';
import { Hello } from '../../ui/Hello.jsx';

Meteor.startup( () => {
  render(
    <Router history={ browserHistory }>
      <Route path="/" component={ Layout }>
        <IndexRoute component={ Index } />
        <Route path="/one" component={ One } />
        <Route path="/two" component={ Two } />
        <Route path="/hello/:name" component={ Hello } />
      </Route>
      <Route path="*" component={ NotFound } />
    </Router>,
    document.getElementById( 'react-root' )
  );
});