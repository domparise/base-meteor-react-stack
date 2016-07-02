import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
 
import { Items } from '../api/items.js';
 
import Item from './Item.jsx'; 

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      items:this.props.items
    };
  }

  handleSubmit(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    const name = this.refs.nameInput.value.trim();
    const count = parseInt(this.refs.countInput.value);
 
    Meteor.call('items.insert', name, count);

    // Clear form
    this.refs.nameInput.value = '';
    this.refs.countInput.value = '';
  }

  render() {
    return (
      <div className="container">
        <header>

          <h1>Items in box ({this.props.items.length})</h1>

          { this.props.currentUser && (
            <form className="new-item" onSubmit={this.handleSubmit.bind(this)} >
              <input type="text" ref="nameInput" placeholder="Item name" />
              <input type="number" ref="countInput" placeholder="How many?" />
              <input type="submit" value="Confirm"/>
            </form>
          )}
        </header>
 
        <ul>
          {this.props.items.map((item,i) => <Item key={item._id} item={item} />)}
        </ul>
      </div>
    );
  }
}
 
App.propTypes = {
  items: PropTypes.array.isRequired,
  currentUser: PropTypes.object,
};
 
export default createContainer(() => { 
  Meteor.subscribe('items');
  return {
    // items: [{name:'scalpel blades',count:12},{name:'gowns',count:200}),{name:'V Clamps',count:7}],
    items: Items.find().fetch(),
    currentUser: Meteor.user(),
  };
}, App);
