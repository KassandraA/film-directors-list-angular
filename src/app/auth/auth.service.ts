import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable()
export class AuthService {
    token: string;
    errorMessage: string;

    constructor(private router: Router) {}

    getToken() {
        firebase.auth().currentUser.getIdToken()
        .then(
            (token: string) => this.token = token
            );
        return this.token;
    }

    signinUser(email: string, password: string) {
        const answer = firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(response => {
                this.router.navigate(['/']);
                console.log('User was signed in');
                this.getToken();

            })
            .catch((error) => {
                this.errorMessage = error.message;
                console.log('SigninUser error', error);
            });
        return answer;
    }

    registerUser(email: string, password: string) {
        const answer =  firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(response => {
                this.router.navigate(['/']);
                console.log('User was registered');
                this.getToken();
            })
            .catch((error) => {
                this.errorMessage = error.message;
                console.log('RegisterUser error:', error);
            });
            return answer;
    }

    logout() {
        firebase.auth().signOut()
            .then(() => {
                this.token = null;
                console.log('User was logged out');
            })
            .catch((error) => {
                console.log('Logout error:', error);
            });
    }

    isAuthenticated() {
        return this.token !== null && this.token !== undefined;
    }

    getUser() {
        const user = firebase.auth().currentUser;
        if (user != null) {
            return user.email;
        }
    }
}
