import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
 
import { Items } from '../api/items.js';
 
// Item component - represents a single todo item
export default class Item extends Component {
  
  render() {
    // Give items a different className when they are checked off,
    // so that we can style them nicely in CSS
    const itemClassName = classnames({});
 
    return (
      <li>
        <span className="text">
          <strong>{this.props.item.name}</strong>: {this.props.item.count}
        </span>
        <button className="delete" onClick={this.deleteThisItem.bind(this)}>&times;</button>
      </li>
    );
  }

  deleteThisItem() {
    Meteor.call('items.remove', this.props.item._id);
  }

}
 
Item.propTypes = {
  // This component gets the item to display through a React prop.
  // We can use propTypes to indicate it is required
  item: PropTypes.object.isRequired,
};