import { Meteor } from 'meteor/meteor';
import {WebApp} from 'meteor/webapp'
import {app} from './app'

Meteor.startup(async () => {
  WebApp.connectHandlers.use('/api', app)

});
