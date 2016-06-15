import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
let items = new Mongo.Collection('items');
items.schema = new SimpleSchema({
  name: {type:String},
  count: {type:Number}
});

export const Items = items;

///// SERVER /////
if (Meteor.isServer) { // This code only runs on the server
  Meteor.publish('items', function itemsPublication() {
    return Items.find({});
  });
}

///// SHARED METHODS /////
Meteor.methods({
  'items.insert'(name,count) {
    check(name, String);
    check(count, Number);
 
    if (!this.userId) { throw new Meteor.Error('not-authorized'); }
 
    Items.insert({ name, count });
  },
  'items.remove'(itemId) {
    check(itemId, String);

    if (!this.userId) { throw new Meteor.Error('not-authorized'); } 

    Items.remove(itemId);
  },
  'items.reset'() {
    if (!this.userId) { throw new Meteor.Error('not-authorized'); } 
    Items.remove({});
    Items.insert({name:'scalpel blades',count:12});
    Items.insert({name:'gowns',count:200});
    Items.insert({name:'V Clamps',count:7});
  }
});
