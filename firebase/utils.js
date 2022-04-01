/* eslint-disable prettier/prettier */
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

export {
    auth,
    firestore,
    storage,
};

export const handleUserProfile = async ({userAuth, addionalData}) => {
    if (!userAuth){
        return;
    }
    const {uid} = userAuth;

    const userRef = firestore.doc(`users/${uid}`);
    const snapshot  = await userRef.get();

    if (!snapshot.exists){
        const {displayName, email} = userAuth;
        const timestemp = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt:timestemp,
                ...addionalData,
            });

        } catch (err){
            console.log(err);
        }
    }
    return userRef;
};

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject);
    });
};
