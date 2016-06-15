import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

let catalog= new Mongo.Collection('catalog');
catalog.schema = new SimpleSchema({
  name: {type:String},
  count: {type:Number}
});

export const Catalog = catalog;

///// SERVER /////
if (Meteor.isServer) { // This code only runs on the server
  Meteor.publish('catalog', function catalogPublication() {
    return Catalog.find({});
  });
}

///// SHARED METHODS /////
Meteor.methods({
  'catalog.insert'(name,count) {
    check(name, String);
    check(count, Number);
 
    if (!this.userId) { // Make sure the user is logged in before inserting a catalog
      throw new Meteor.Error('not-authorized'); 
    }
 
    Catalog.insert({ name, count });
  },
  'catalog.remove'(catalogId) {
    check(catalogId, String);

    if (!this.userId) { // error 
      throw new Meteor.Error('not-authorized');
    }

    Catalog.remove(catalogId);
  },
});
