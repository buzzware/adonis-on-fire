// @ts-ignore
import type {
  UserProviderContract,
  ProviderUserContract
} from '@ioc:Adonis/Addons/Auth'
import {User} from '@firebase/auth-types';
// import Config from '@ioc:Adonis/Core/Config'
// const firebase = Config.get('app.appKey')
import { firebase } from '../../config/firebase';

/**
 * Shape of the user object returned by the "FirebaseAuthProvider"
 * class. Feel free to change the properties as you want
 */
export class FirebaseUser {
  user: User
  rememberMeToken: string | null

  constructor(user: User) {
    this.user = user
  }
}

/**
 * The shape of configuration accepted by the FirebaseAuthProvider.
 * At a bare minimum, it needs a driver property
 */
export type FirebaseAuthProviderConfig = {
  driver: 'firebase'
}

/**
 * Provider user works as a bridge between your User provider and
 * the AdonisJS auth module.
 */
class ProviderUser implements ProviderUserContract<FirebaseUser> {
  constructor(public user: FirebaseUser | null) {}

  public getId() {
    return this.user ? this.user.user.uid : null
  }

  public getRememberMeToken() {
    return this.user ? this.user.rememberMeToken : null
  }

  public setRememberMeToken(token: string) {
    if (!this.user) {
      return
    }
    this.user.rememberMeToken = token
  }

  // async
  public verifyPassword(plainPassword: string) {
    if (!this.user) {
      throw new Error('Cannot verify password for non-existing user')
    }
    //return this.hash.verify(this.user.password, plainPassword)
    return firebase.signIn(this.user.user.email,plainPassword);
  }
}

/**
 * The User provider implementation to lookup a user for different
 * operations
 */
export class FirebaseAuthProvider implements UserProviderContract<FirebaseUser> {
  constructor(
    public config: FirebaseAuthProviderConfig
  ) {}

  public async getUserFor(user: FirebaseUser | null) {
    return new ProviderUser(user)
  }

  public async updateRememberMeToken(user: ProviderUser) {
    await firebase.crupdate('UserExtra', user.getId(), { rememberMeToken: user.getRememberMeToken() })
  }

  public async findByRememberMeToken(userId: string | number, token: string) {
    const userExtra = await firebase.getOneWhere('UserExtra','rememberMeToken','==',token,'email','==',userId);
    const user = await firebase.getUser(userExtra.id);
    return this.getUserFor(user || null)
  }

  public async findById(id: string | number) {
    const user = await firebase.getUser(id.toString())
    return this.getUserFor(user || null)
  }

  public async findByUid(uidValue: string) {
    const userExtra = await firebase.getOneWhere('UserExtra','email','==',uidValue);
    const user = await firebase.getUser(userExtra.id);
    return this.getUserFor(user || null)
  }
}
