import {Mongo} from 'meteor/mongo'
import { User } from '/imports/user'

export const UserCollection=new Mongo.Collection<User>('users')