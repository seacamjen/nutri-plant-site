import { Injectable, NgZone } from '@angular/core';
import firebase from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Router } from "@angular/router";

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userState: any;

  constructor(public afs: AngularFirestore, 
              public afAuth: AngularFireAuth, 
              public router: Router, 
              public ngZone: NgZone) 
              { 
                this.afAuth.authState.subscribe(user => {
                  if (user) {
                    this.userState = user;
                    localStorage.setItem('user', JSON.stringify(this.userState));
                  } else {
                    // localStorage.setItem('user', '');
                  }
                })
              }

  signIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.setUserData(result.user!);
        // this.ngZone.run(() => {
        //   console.log('Route to products')
        //   this.router.navigate(['removal']);
        // });
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  get isLoggedIn(): boolean {
    if (localStorage.getItem('user') !== null) {
      const user = JSON.parse(localStorage.getItem('user')!);
      return (user !== null && user.emailVerified !== false) ? true : false;
    } else {
      return false;
    }
    
  }

  signUp(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.sendVerificationMail();
        this.setUserData(result.user!);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  sendVerificationMail() {
    return this.afAuth.currentUser.then(u => u?.sendEmailVerification())
      .then(() => {
        this.router.navigate(['email-verification'])
      })
  }

  forgotPassword(passwordResetEmail: string) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error.message);
      })
  }

  setUserData(user: firebase.User) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userState: User = {
      uid: user.uid,
      email: user.email!,
      displayName: user.displayName!,
      photoURL: user.photoURL!,
      emailVerified: user.emailVerified
    }
    return userRef.set(userState, {
      merge: true
    })
  }

  async signOut() {
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }

  async authLogin(provider: firebase.auth.AuthProvider) {
    try {
      const result = await this.afAuth.signInWithPopup(provider);
      this.ngZone.run(() => {
        this.router.navigate(['products']);
      });
      this.setUserData((result.user!));
    } catch (error) {
      window.alert(error);
    }
  }

}

//https://www.remotestack.io/angular-firebase-authentication-example-tutorial/