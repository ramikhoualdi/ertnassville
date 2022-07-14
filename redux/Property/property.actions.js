import propertyTypes from './property.types';
import {auth, firestore, storage} from '../../firebase/utils';
import uuid from 'react-native-uuid';

// PreFix Function
const isPropertyIdFound = async () => {
  const currentEmail = auth().currentUser.email;

  const propertyId_ExistRef = firestore().doc(
    'propertyIds/UAqCWjB5b3hytoTOFui9',
  );
  const propertyIds = await propertyId_ExistRef.get();
  const propertyArray = propertyIds.data().properties;
  let currentID = '';
  let i = 0;
  let IDFound = false;
  while (i < propertyArray.length && !IDFound) {
    console.log(
      '==========================================',
      propertyArray[i].email,
      currentEmail,
    );
    if (propertyArray[i].email.toLowerCase() === currentEmail.toLowerCase()) {
      currentID = propertyArray[i].RandomPropertyID;
      IDFound = true;
    }
    i++;
  }
  return {IDFound, currentID};
};

const isPropertyIdFoundAnswer = async id => {
  const propertyId_ExistRef = firestore().doc(
    'propertyIds/UAqCWjB5b3hytoTOFui9',
  );
  const propertyIds = await propertyId_ExistRef.get();
  const propertyArray = propertyIds.data().properties;
  let currentID = '';
  let i = 0;
  let IDFound = false;
  while (i < propertyArray.length && !IDFound) {
    if (propertyArray[i].RandomPropertyID === id) {
      currentID = propertyArray[i].RandomPropertyID;
      IDFound = true;
    }
    i++;
  }
  return {IDFound, currentID};
};

// AUTHENTICATION
export const setCurrentProperty = () => ({
  type: propertyTypes.SET_CURRENT_PROPERTY,
  payload: true,
});

export const recoveryProperty =
  ({email}) =>
  async dispatch => {
    try {
      await auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          dispatch({
            type: propertyTypes.RECOVERY_SUCCESS,
            payload: true,
          });
        })
        .catch(() => {
          const err = ['Email Not Found! Please Enter A Valid Email'];
          dispatch({
            type: propertyTypes.SET_ERRORS,
            payload: err,
          });
        });
    } catch (err) {
      console.log(err);
    }
  };

export const signOutProperty = () => async dispatch => {
  try {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        dispatch({
          type: propertyTypes.OUT_CURRENT_PROPERTY,
        });
        console.log('User Signed out From Action ::');
      });
  } catch (err) {
    console.log('Error from Sign out action !!');
    console.log(err);
  }
};

export const signInProperty =
  ({email, password}) =>
  async dispatch => {
    try {
      console.log('From Property Sign In action');
      await auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          dispatch({
            type: propertyTypes.PROPERTY_SIGN_IN_SUCCESS,
            payload: true,
          });
          dispatch({
            type: propertyTypes.SET_CURRENT_PROPERTY,
            payload: true,
          });
        })
        .catch(err => {
          console.log('--- --- --- ---');
          console.log(err);
          console.log('--- --- --- ---');
          const error = ["These credientials dosn't much !!"];
          dispatch({
            type: propertyTypes.SET_ERRORS,
            payload: error,
          });
        });
    } catch (err) {
      console.log('from catch in login redux actions');
      const error = ['Login problem'];
      dispatch({
        type: propertyTypes.SET_ERRORS,
        payload: error,
      });
    }
  };

export const signUpProperty =
  ({
    propertyName,
    firstName,
    lastName,
    address,
    email,
    phone,
    password,
    isSelected,
  }) =>
  async dispatch => {
    if (isSelected === true) {
      try {
        await auth()
          .createUserWithEmailAndPassword(email, password)
          .then(async () => {
            const testP1 = firestore().doc('propertyIds/UAqCWjB5b3hytoTOFui9');
            const testP2 = await testP1.get();
            if (!testP2.exists) {
              firestore()
                .collection('propertyIds')
                .doc('UAqCWjB5b3hytoTOFui9')
                .set({
                  properties: [
                    {
                      RandomPropertyID: '00000000',
                      email: 'null',
                    },
                  ],
                });
            }
            const propertyId_ExistRef = firestore().doc(
              'propertyIds/UAqCWjB5b3hytoTOFui9',
            );
            const propertyIds = await propertyId_ExistRef.get();
            const propertyArray = propertyIds.data().properties;
            var arrayIds = [];
            for (let i = 0; i < propertyArray.length; i++) {
              arrayIds.push(propertyArray[i].id);
            }
            var RandomPropertyID1 = '00000000';
            let validPropertyID = false;
            while (!validPropertyID) {
              const RandomPropertyID = Math.random().toString().slice(2, 10);
              const Exist = propertyArray.indexOf(RandomPropertyID);
              if (propertyArray[0] === '00000000') {
                propertyArray[0] = RandomPropertyID;
                RandomPropertyID1 = RandomPropertyID;
                validPropertyID = true;
              } else {
                if (Exist === -1) {
                  propertyArray.push({RandomPropertyID, email});
                  RandomPropertyID1 = RandomPropertyID;
                  validPropertyID = true;
                }
              }
            }
            const docRef = firestore().doc('propertyIds/UAqCWjB5b3hytoTOFui9');
            await docRef.set({
              properties: propertyArray,
            });
            const userRef = firestore().doc(`property/${RandomPropertyID1}`);
            const snapshot = await userRef.get();
            if (!snapshot.exists) {
              console.log(' == USER NOT FOUND IN FIRESTORE ==');
              const timestemps = new Date();
              const userOb = {
                RandomPropertyID1,
                propertyName,
                firstName,
                lastName,
                address,
                email,
                phone,
                password,
                timestemps,
              };
              try {
                await userRef.set(userOb);
              } catch (err) {
                console.log('Line 187');
                console.log(err);
              }
            }
            dispatch({
              type: propertyTypes.PROPERTY_SIGN_UP_SUCCESS,
              payload: true,
            });
            dispatch({
              type: propertyTypes.SET_CURRENT_PROPERTY,
              payload: true,
            });
          })
          .catch(err => {
            if (err.code === 'auth/email-already-in-use') {
              const error = 'This email address is already in use!';
              console.log(error);
              dispatch({
                type: propertyTypes.SET_ERRORS,
                payload: error,
              });
            }
            if (err.code === 'auth/invalid-email') {
              const error = 'This email address is invalid!';
              console.log(error);
              dispatch({
                type: propertyTypes.SET_ERRORS,
                payload: error,
              });
            }
            console.log(err);
          });
      } catch (err) {
        const error = 'Please check your information again';
        dispatch({
          type: propertyTypes.SET_ERRORS,
          payload: error,
        });
        console.log(error);
      }
    } else {
      console.log('Agree to the terms is required!!');
      const err = ['Agree to the terms is required!!'];
      dispatch({
        type: propertyTypes.SET_ERRORS,
        payload: err,
      });
    }
  };

// PROPERTY
export const fetchProperty = () => async dispatch => {
  try {
    console.log('From fetchContact Action');
    const {IDFound, currentID} = await isPropertyIdFound();
    console.log('HERE FROM isPropertyIdFound()........................');
    console.log({IDFound, currentID});
    if (IDFound) {
      const contactsListRef = firestore().doc(`property/${currentID}`);
      const contactsList = await contactsListRef.get();
      const contactsArray = contactsList.data();
      dispatch({
        type: propertyTypes.FETCH_PROPERTY,
        payload: contactsArray,
      });
    } else {
      const error = 'Something Went Wrong !!';
      dispatch({
        type: propertyTypes.SET_ERRORS,
        payload: error,
      });
    }
  } catch (err) {
    console.log('error from fetchPrperty catch !!');
    console.log(err);
  }
};
// FUNC ================================================
// ACCESS
export const fetchAccess = props => async dispatch => {
  console.log('props from fetchAccess Actions', props);
  try {
    console.log('From fetchAccess Action');
    const {IDFound, currentID} = await isPropertyIdFound();
    console.log('HERE FROM isPropertyIdFound()........................');
    console.log({IDFound, currentID});
    if (IDFound) {
      const contactsListRef = firestore().doc(`access/${currentID}`);
      const contactsList = await contactsListRef.get();
      console.log(' accessList =====  ', contactsList);
      if (contactsList.exists) {
        let contactsArray = contactsList.data().access;
        let FinalArray = [];
        for (let i = 0; i < contactsArray.length; i++) {
          if (!contactsArray[i].deletedAt) {
            FinalArray.push(contactsArray[i]);
          }
        }
        dispatch({
          type: propertyTypes.FETCH_ACCESS,
          payload: FinalArray,
        });
      } else {
        dispatch({
          type: propertyTypes.FETCH_ACCESS,
          payload: null,
        });
      }
    } else {
      const error = 'Something Went Wrong !!';
      dispatch({
        type: propertyTypes.SET_ERRORS,
        payload: error,
      });
    }
  } catch (err) {
    console.log('catch fetchAccess');
    console.log(err);
  }
};
export const saveAccess = (emergency, title, phone) => async dispatch => {
  let createdAt = new Date();
  let updatedAt = new Date();
  let deletedAt = null;
  let done = false;
  const myOb = {
    emergency,
    title,
    phone,
    done,
    createdAt,
    updatedAt,
    deletedAt,
  };
  console.log('myOb >>>>>>>>>>>>>>>>> ', myOb);
  try {
    console.log('From saveAccess Action');
    const {IDFound, currentID} = await isPropertyIdFound();
    console.log('HERE FROM isPropertyIdFound()........................');
    console.log({IDFound, currentID});
    if (IDFound) {
      const userRef = firestore().doc(`access/${currentID}`);
      const snapshot = await userRef.get();
      let contacts_array = snapshot.data();
      if (contacts_array) {
        let access = contacts_array.access;
        let nb = access.length;
        access.push({
          nb,
          emergency,
          title,
          phone,
          done,
          createdAt,
          updatedAt,
          deletedAt,
        });
        try {
          await userRef.set({access});
          dispatch({
            type: propertyTypes.ADD_ACCESS_SUCCESS,
            payload: true,
          });
        } catch (err) {
          console.log('error in Line 350');
          console.log(err);
        }
      } else {
        try {
          await userRef.set({
            access: [
              {
                nb: 0,
                emergency: emergency,
                title: title,
                phone: phone,
                done: done,
                createdAt: createdAt,
                updatedAt: updatedAt,
                deletedAt: deletedAt,
              },
            ],
          });
          dispatch({
            type: propertyTypes.ADD_ACCESS_SUCCESS,
            payload: true,
          });
        } catch (err) {
          console.log('error in Line 371');
          console.log(err);
        }
      }
    }
  } catch (err) {
    console.log('catch from saveAccess !!');
    console.log(err);
  }
};
export const deleteAccess = nb => async dispatch => {
  console.log('nb from delete Access =>', nb);
  try {
    console.log('INsode Try catch deleteAccess');
    const {IDFound, currentID} = await isPropertyIdFound();
    console.log('HERE FROM isPropertyIdFound()........................');
    console.log({IDFound, currentID});
    if (IDFound) {
      const userRef = firestore().doc(`access/${currentID}`);
      const snapshot = await userRef.get();
      let contacts_array = snapshot.data();
      let access = contacts_array.access;
      console.log(access);
      access[nb].deletedAt = new Date();
      console.log(access);
      try {
        await userRef.set({access});
        dispatch({
          type: propertyTypes.DELETE_ACCESS_SUCCESS,
          payload: true,
        });
      } catch (err) {
        console.log('error in Line 1538');
        console.log(err);
      }
    }
  } catch (err) {
    console.log('err delete Access');
    console.log(err);
  }
};
export const doneAccess = nb => async dispatch => {
  console.log('nb from Done Access =>', nb);
  try {
    console.log('inside try catch DoneAccess');
    const {IDFound, currentID} = await isPropertyIdFound();
    console.log('HERE FROM isPropertyIdFound()........................');
    console.log({IDFound, currentID});
    if (IDFound) {
      const userRef = firestore().doc(`access/${currentID}`);
      const snapshot = await userRef.get();
      let contacts_array = snapshot.data();
      let access = contacts_array.access;
      console.log(access);
      access[nb].done = true;
      console.log(access);
      try {
        await userRef.set({access});
        dispatch({
          type: propertyTypes.DONE_ACCESS_SUCCESS,
          payload: true,
        });
      } catch (err) {
        console.log('error in Line 523');
        console.log(err);
      }
    }
  } catch (err) {
    console.log('err Done Access');
    cnonsole.log(err);
  }
};
export const resetFetchAccess = () => ({
  type: propertyTypes.RESET_FETCH_ACCESS,
});
export const ResetAddAccessForm = () => ({
  type: propertyTypes.RESET_ADDACCESS_FORMS,
});
export const ResetDeleteAccessForm = () => ({
  type: propertyTypes.RESET_DELETEACCESS_FORMS,
});
export const ResetDoneAccessForm = () => ({
  type: propertyTypes.RESET_DONE_ACCESS_SUCCESS,
});
// CONTACT
export const fetchContact = () => async dispatch => {
  try {
    console.log('From fetchContact Action');
    const {IDFound, currentID} = await isPropertyIdFound();
    console.log('HERE FROM isPropertyIdFound()........................');
    console.log({IDFound, currentID});
    if (IDFound) {
      const contactsListRef = firestore().doc(`contacts/${currentID}`);
      const contactsList = await contactsListRef.get();
      console.log(' contactList =====  ', contactsList);
      if (contactsList.exists) {
        let contactsArray = contactsList.data().contacts;
        let FinalArray = [];
        for (let i = 0; i < contactsArray.length; i++) {
          if (!contactsArray[i].deletedAt) {
            FinalArray.push(contactsArray[i]);
          }
        }
        dispatch({
          type: propertyTypes.FETCH_CONTACT,
          payload: FinalArray,
        });
      } else {
        dispatch({
          type: propertyTypes.FETCH_CONTACT,
          payload: null,
        });
      }
    } else {
      const error = 'Something Went Wrong !!';
      dispatch({
        type: propertyTypes.SET_ERRORS,
        payload: error,
      });
    }
    //  Get Associate ID
  } catch (err) {
    console.log('error from fetchContact catch !!');
    console.log(err);
  }
};
export const saveContact = (photo, name, phone) => async dispatch => {
  let createdAt = new Date();
  let updatedAt = new Date();
  let deletedAt = null;
  const myOb = {
    name,
    phone,
    photo,
    createdAt,
    updatedAt,
    deletedAt,
  };
  console.log('myOb >>>>>>>>>>>>>>>>> ', myOb);
  try {
    console.log('From saveContact Action');
    const {IDFound, currentID} = await isPropertyIdFound();
    console.log('HERE FROM isPropertyIdFound()........................');
    console.log({IDFound, currentID});
    try {
      const url_name = phone.substr(
        phone.indexOf(' '),
        phone.length - phone.indexOf(' ') - 1,
      );
      const reference = storage().ref(
        `/${currentID}/contacts/contacts_${url_name}.png`,
      );
      await reference.putFile(photo);
      var url = await storage()
        .ref(`/${currentID}/contacts/contacts_${url_name}.png`)
        .getDownloadURL();
    } catch (err) {
      console.log('first try catch saveContact =>');
      console.log(err);
    }
    if (IDFound) {
      const userRef = firestore().doc(`contacts/${currentID}`);
      const snapshot = await userRef.get();
      let contacts_array = snapshot.data();
      if (contacts_array) {
        let contacts = contacts_array.contacts;
        let number = phone;
        let photo = url;
        let nb = contacts.length;
        contacts.push({
          nb,
          name,
          number,
          photo,
          createdAt,
          updatedAt,
          deletedAt,
        });
        try {
          await userRef.set({contacts});
          dispatch({
            type: propertyTypes.ADD_CONTACT_SUCCESS,
            payload: true,
          });
        } catch (err) {
          console.log('error in 376');
          console.log(err);
        }
      } else {
        try {
          await userRef.set({
            contacts: [
              {
                nb: 0,
                name: name,
                number: phone,
                photo: url,
                createdAt: createdAt,
                updatedAt: updatedAt,
                deletedAt: deletedAt,
              },
            ],
          });
          dispatch({
            type: propertyTypes.ADD_CONTACT_SUCCESS,
            payload: true,
          });
        } catch (err) {
          console.log('error in 398');
          console.log(err);
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
};
export const deleteContact = nb => async dispatch => {
  console.log('nb from delete Contacts =>', nb);
  try {
    console.log('INsode Try catch deleteContacts');
    const {IDFound, currentID} = await isPropertyIdFound();
    console.log('HERE FROM isPropertyIdFound()........................');
    console.log({IDFound, currentID});
    if (IDFound) {
      const userRef = firestore().doc(`contacts/${currentID}`);
      const snapshot = await userRef.get();
      let contacts_array = snapshot.data();
      let contacts = contacts_array.contacts;
      console.log(contacts);
      contacts[nb].deletedAt = new Date();
      console.log(contacts);
      try {
        await userRef.set({contacts});
        dispatch({
          type: propertyTypes.DELETE_CONTACT_SUCCESS,
          payload: true,
        });
      } catch (err) {
        console.log('error in Line 745');
        console.log(err);
      }
    }
  } catch (err) {
    console.log('err delete Contacts');
    console.log(err);
  }
};
export const resetFetchContact = () => ({
  type: propertyTypes.RESET_FETCH_CONTACT,
});
export const ResetAddContactForm = () => ({
  type: propertyTypes.RESET_ADDCONTACT_FORMS,
});
export const ResetDeleteContactForm = () => ({
  type: propertyTypes.RESET_DELETECONTACT_FORMS,
});

// DESCRIPTION
export const fetchDescription = () => async dispatch => {
  try {
    console.log('From fetchDescription Action');
    const {IDFound, currentID} = await isPropertyIdFound();
    console.log('HERE FROM isPropertyIdFound()........................');
    console.log({IDFound, currentID});
    if (IDFound) {
      const contactsListRef = firestore().doc(`descriptions/${currentID}`);
      const contactsList = await contactsListRef.get();
      console.log(' descriptionstList =====  ', contactsList);
      if (contactsList.exists) {
        let contactsArray = contactsList.data().descriptions;
        let FinalArray = [];
        for (let i = 0; i < contactsArray.length; i++) {
          if (!contactsArray[i].deletedAt) {
            FinalArray.push(contactsArray[i]);
          }
        }
        dispatch({
          type: propertyTypes.FETCH_DESCRIPTION,
          payload: FinalArray,
        });
      } else {
        dispatch({
          type: propertyTypes.FETCH_DESCRIPTION,
          payload: null,
        });
      }
    } else {
      const error = 'Something Went Wrong !!';
      dispatch({
        type: propertyTypes.SET_ERRORS,
        payload: error,
      });
    }
    //  Get Associate ID
  } catch (err) {
    console.log('catch first try catch fetchDescription');
    console.log(err);
  }
};
export const saveDescription = (document, documentType, title, desc) => async dispatch => {
  let createdAt = new Date();
  let updatedAt = new Date();
  let deletedAt = null;
  const myOb = {
    document,
    documentType,
    title,
    desc,
    createdAt,
    updatedAt,
    deletedAt,
  };
  console.log('myOb >>>>>>>>>>>>>>>>> ', myOb);
  var fileLink = '';
  try {
    console.log('From saveDescription Action');
    const {IDFound, currentID} = await isPropertyIdFound();
    console.log('HERE FROM isPropertyIdFound()........................');
    console.log({IDFound, currentID});
    try {
      const url_uuid = uuid.v4();
      const reference = storage().ref(
        `/${currentID}/descriptions/descriptions_${url_uuid}`,
      );
      await reference.putFile(document);
      const url = await storage()
        .ref(`/${currentID}/descriptions/descriptions_${url_uuid}`)
        .getDownloadURL();
        fileLink = url;
    } catch (err) {
      console.log('first try catch saveDescription =>');
      console.log(err);
    }
    if (IDFound) {
      const userRef = firestore().doc(`descriptions/${currentID}`);
      const snapshot = await userRef.get();
      let contacts_array = snapshot.data();
      if (contacts_array) {
        let file = fileLink;
        let description = desc;
        let descriptions = contacts_array.descriptions;
        let nb = descriptions.length;
        descriptions.push({
          nb,
          file,
          documentType,
          title,
          description,
          createdAt,
          updatedAt,
          deletedAt,
        });
        try {
          await userRef.set({descriptions});
          dispatch({
            type: propertyTypes.ADD_DESCRIPTION_SUCCESS,
            payload: true,
          });
        } catch (err) {
          console.log('error in 376');
          console.log(err);
        }
      } else {
        try {
          let file = fileLink;
          let description = desc;
          await userRef.set({
            descriptions: [
              {
                nb: 0,
                file: file,
                documentType: documentType,
                title: title,
                description: description,
                createdAt: createdAt,
                updatedAt: updatedAt,
                deletedAt: deletedAt,
              },
            ],
          });
          dispatch({
            type: propertyTypes.ADD_DESCRIPTION_SUCCESS,
            payload: true,
          });
        } catch (err) {
          console.log('error in 398');
          console.log(err);
        }
      }
    }
  } catch (err) {
    console.log('error first try catch saveDescription');
    console.log(err);
  }
};
export const deleteDescription = nb => async dispatch => {
  console.log('nb from delete Descriptions =>', nb);
  try {
    console.log('INsode Try catch deleteDescriptions');
    const {IDFound, currentID} = await isPropertyIdFound();
    console.log('HERE FROM isPropertyIdFound()........................');
    console.log({IDFound, currentID});
    if (IDFound) {
      const userRef = firestore().doc(`descriptions/${currentID}`);
      const snapshot = await userRef.get();
      let contacts_array = snapshot.data();
      let descriptions = contacts_array.descriptions;
      console.log(descriptions);
      descriptions[nb].deletedAt = new Date();
      console.log(descriptions);
      try {
        await userRef.set({descriptions});
        dispatch({
          type: propertyTypes.DELETE_DESCRIPTION_SUCCESS,
          payload: true,
        });
      } catch (err) {
        console.log('error in Line 1538');
        console.log(err);
      }
    }
  } catch (err) {
    console.log('err delete Descriptions');
    console.log(err);
  }
};
export const resetFetchDescription = () => ({
  type: propertyTypes.RESET_FETCH_DESCRIPTION,
});
export const ResetAddDescriptionForm = () => ({
  type: propertyTypes.RESET_ADDDESCRIPTION_FORMS,
});
export const ResetDeleteDescriptionForm = () => ({
  type: propertyTypes.RESET_DELETEDESCRIPTION_FORMS,
});

// DOCUMENT
export const fetchDocument = () => async dispatch => {
  try {
    console.log('From fetchDocument Action');
    const {IDFound, currentID} = await isPropertyIdFound();
    console.log('HERE FROM isPropertyIdFound()........................');
    console.log({IDFound, currentID});
    if (IDFound) {
      const documentsListRef = firestore().doc(`documents/${currentID}`);
      const documentsList = await documentsListRef.get();
      console.log(' documentList =====  ', documentsList);
      if (documentsList.exists) {
        let documentsArray = documentsList.data().documents;
        let FinalArray = [];
        for (let i = 0; i < documentsArray.length; i++) {
          if (!documentsArray[i].deletedAt) {
            FinalArray.push(documentsArray[i]);
          }
        }
        dispatch({
          type: propertyTypes.FETCH_DOCUMENT,
          payload: FinalArray,
        });
      } else {
        dispatch({
          type: propertyTypes.FETCH_DOCUMENT,
          payload: null,
        });
      }
    } else {
      const error = 'Something Went Wrong !!';
      dispatch({
        type: propertyTypes.SET_ERRORS,
        payload: error,
      });
    }
    //  Get Associate ID
  } catch (err) {
    console.log('error from fetchDocument catch !!');
    console.log(err);
  }
};
export const saveDocument = (doc, name, type) => async dispatch => {
  let createdAt = new Date();
  let updatedAt = new Date();
  let deletedAt = null;
  const myOb = {
    doc,
    name,
    createdAt,
    updatedAt,
    deletedAt,
  };
  console.log('myOb >>>>>>>>>>>>>>>>> ', myOb);
  try {
    console.log('From saveDocument Action');
    const {IDFound, currentID} = await isPropertyIdFound();
    console.log('HERE FROM isPropertyIdFound()........................');
    console.log({IDFound, currentID});
    try {
      const url_uuid = uuid.v4();
      console.log('url_uuid =>', url_uuid);
      const reference = storage().ref(
        `/${currentID}/documents/documents_${url_uuid}`,
      );
      await reference.putFile(doc);
      var url = await storage()
        .ref(`/${currentID}/documents/documents_${url_uuid}`)
        .getDownloadURL();
      console.log('getDownloadUrl => ', url);
      // Save on firestore
      if (IDFound) {
        const userRef = firestore().doc(`documents/${currentID}`);
        const snapshot = await userRef.get();
        let contacts_array = snapshot.data();
        if (contacts_array) {
          let documents = contacts_array.documents;
          let nb = documents.length;
          let docRef = url;
          documents.push({
            nb,
            name,
            docRef,
            type,
            createdAt,
            updatedAt,
            deletedAt,
          });
          try {
            await userRef.set({documents});
            dispatch({
              type: propertyTypes.ADD_DOCUMENT_SUCCESS,
              payload: true,
            });
          } catch (err) {
            console.log('error in Line 1192');
            console.log(err);
          }
        } else {
          try {
            await userRef.set({
              documents: [
                {
                  nb: 0,
                  name: name,
                  docRef: url,
                  type: type,
                  createdAt: createdAt,
                  updatedAt: updatedAt,
                  deletedAt: deletedAt,
                },
              ],
            });
            dispatch({
              type: propertyTypes.ADD_DOCUMENT_SUCCESS,
              payload: true,
            });
          } catch (err) {
            console.log('error in Line 1216');
            console.log(err);
          }
        }
      }
      // Save on Firestore
    } catch (err) {
      console.log('first try catch saveDocument =>');
      console.log(err);
    }
  } catch (err) {
    console.log('Error Line 724');
    console.log(err);
  }
};
export const deleteDocument = nb => async dispatch => {
  console.log('nb from delete Document =>', nb);
  try {
    console.log('INsode Try catch deleteDocument');
    const {IDFound, currentID} = await isPropertyIdFound();
    console.log('HERE FROM isPropertyIdFound()........................');
    console.log({IDFound, currentID});
    if (IDFound) {
      const userRef = firestore().doc(`documents/${currentID}`);
      const snapshot = await userRef.get();
      let contacts_array = snapshot.data();
      let documents = contacts_array.documents;
      console.log(documents);
      documents[nb].deletedAt = new Date();
      console.log(documents);
      try {
        await userRef.set({documents});
        dispatch({
          type: propertyTypes.DELETE_DOCUMENT_SUCCESS,
          payload: true,
        });
      } catch (err) {
        console.log('error in Line 1261');
        console.log(err);
      }
    }
  } catch (err) {
    console.log('err delete Elevator');
    console.log(err);
  }
};
export const resetFetchDocument = () => ({
  type: propertyTypes.RESET_FETCH_DOCUMENT,
});
export const ResetAddDocumentForm = () => ({
  type: propertyTypes.RESET_ADDDOCUMENT_FORMS,
});
export const ResetDeleteDocumentForm = () => ({
  type: propertyTypes.RESET_DELETEDOCUMENT_FORMS,
});

// ELEVATOR
export const fetchElevator = props => async dispatch => {
  console.log('props from fetchElevators Actions', props);
  try {
    console.log('From fetchElevator Action');
    const {IDFound, currentID} = await isPropertyIdFound();
    console.log('HERE FROM isPropertyIdFound()........................');
    console.log({IDFound, currentID});
    if (IDFound) {
      const contactsListRef = firestore().doc(`elevators/${currentID}`);
      const contactsList = await contactsListRef.get();
      console.log(' elevatorList =====  ', contactsList);
      if (contactsList.exists) {
        let contactsArray = contactsList.data().elevators;
        let FinalArray = [];
        for (let i = 0; i < contactsArray.length; i++) {
          if (!contactsArray[i].deletedAt) {
            FinalArray.push(contactsArray[i]);
          }
        }
        dispatch({
          type: propertyTypes.FETCH_ELEVATOR,
          payload: FinalArray,
        });
      } else {
        dispatch({
          type: propertyTypes.FETCH_ELEVATOR,
          payload: null,
        });
      }
    } else {
      const error = 'Something Went Wrong !!';
      dispatch({
        type: propertyTypes.SET_ERRORS,
        payload: error,
      });
    }
  } catch (err) {
    console.log('');
    console.log(err);
  }
};
export const saveElevator = (photo, title, phone) => async dispatch => {
  let createdAt = new Date();
  let updatedAt = new Date();
  let deletedAt = null;
  let done = false;
  const myOb = {
    photo,
    title,
    phone,
    done,
    createdAt,
    updatedAt,
    deletedAt,
  };
  console.log('myOb >>>>>>>>>>>>>>>>> ', myOb);
  try {
    console.log('From saveElevator Action');
    const {IDFound, currentID} = await isPropertyIdFound();
    console.log('HERE FROM isPropertyIdFound()........................');
    console.log({IDFound, currentID});
    try {
      const url_uuid = uuid.v4();
      const reference = storage().ref(
        `/${currentID}/elevators/elevators_${url_uuid}.png`,
      );
      await reference.putFile(photo);
      var url = await storage()
        .ref(`/${currentID}/elevators/elevators_${url_uuid}.png`)
        .getDownloadURL();
    } catch (err) {
      console.log('first try catch savePhoto =>');
      console.log(err);
    }
    if (IDFound) {
      const userRef = firestore().doc(`elevators/${currentID}`);
      const snapshot = await userRef.get();
      let contacts_array = snapshot.data();
      if (contacts_array) {
        let elevators = contacts_array.elevators;
        let nb = elevators.length;
        let photo = url;
        elevators.push({
          nb,
          photo,
          title,
          phone,
          done,
          createdAt,
          updatedAt,
          deletedAt,
        });
        try {
          await userRef.set({elevators});
          dispatch({
            type: propertyTypes.ADD_ELEVATOR_SUCCESS,
            payload: true,
          });
        } catch (err) {
          console.log('error in Line 1192');
          console.log(err);
        }
      } else {
        try {
          let photo = url;
          await userRef.set({
            elevators: [
              {
                nb: 0,
                photo: photo,
                title: title,
                phone: phone,
                done: done,
                createdAt: createdAt,
                updatedAt: updatedAt,
                deletedAt: deletedAt,
              },
            ],
          });
          dispatch({
            type: propertyTypes.ADD_ELEVATOR_SUCCESS,
            payload: true,
          });
        } catch (err) {
          console.log('error in Line 1216');
          console.log(err);
        }
      }
    }
  } catch (err) {
    console.log('catch from saveElevator !!');
    console.log(err);
  }
};
export const deleteElevator = nb => async dispatch => {
  console.log('nb from delete Elevator =>', nb);
  try {
    console.log('INsode Try catch deleteElevator');
    const {IDFound, currentID} = await isPropertyIdFound();
    console.log('HERE FROM isPropertyIdFound()........................');
    console.log({IDFound, currentID});
    if (IDFound) {
      const userRef = firestore().doc(`elevators/${currentID}`);
      const snapshot = await userRef.get();
      let contacts_array = snapshot.data();
      let elevators = contacts_array.elevators;
      console.log(elevators);
      elevators[nb].deletedAt = new Date();
      console.log(elevators);
      try {
        await userRef.set({elevators});
        dispatch({
          type: propertyTypes.DELETE_ELEVATOR_SUCCESS,
          payload: true,
        });
      } catch (err) {
        console.log('error in Line 1261');
        console.log(err);
      }
    }
  } catch (err) {
    console.log('err delete Elevator');
    console.log(err);
  }
};
export const doneElevator = nb => async dispatch => {
  console.log('nb from Done Elevator =>', nb);
  try {
    console.log('inside try catch DoneElevator');
    const {IDFound, currentID} = await isPropertyIdFound();
    console.log('HERE FROM isPropertyIdFound()........................');
    console.log({IDFound, currentID});
    if (IDFound) {
      const userRef = firestore().doc(`elevators/${currentID}`);
      const snapshot = await userRef.get();
      let contacts_array = snapshot.data();
      let elevators = contacts_array.elevators;
      console.log(elevators);
      elevators[nb].done = true;
      console.log(elevators);
      try {
        await userRef.set({elevators});
        dispatch({
          type: propertyTypes.DONE_ELEVATOR_SUCCESS,
          payload: true,
        });
      } catch (err) {
        console.log('error in Line 1305');
        console.log(err);
      }
    }
  } catch (err) {
    console.log('err Done Elevator');
    cnonsole.log(err);
  }
};
export const resetFetchElevator = () => ({
  type: propertyTypes.RESET_FETCH_ELEVATOR,
});
export const ResetAddElevatorForm = () => ({
  type: propertyTypes.RESET_ADDELEVATOR_FORMS,
});
export const ResetDeleteElevatorForm = () => ({
  type: propertyTypes.RESET_DELETEELEVATOR_FORMS,
});
export const ResetDoneElevatorForm = () => ({
  type: propertyTypes.RESET_DONE_ELEVATOR_SUCCESS,
});

// GENERATOR
export const fetchGenerator = props => async dispatch => {
  console.log('props from fetchGenerator Actions', props);
  try {
    console.log('From fetchGenerator Action');
    const {IDFound, currentID} = await isPropertyIdFound();
    console.log('HERE FROM isPropertyIdFound()........................');
    console.log({IDFound, currentID});
    if (IDFound) {
      const contactsListRef = firestore().doc(`generators/${currentID}`);
      const contactsList = await contactsListRef.get();
      console.log(' generatorsList =====  ', contactsList);
      if (contactsList.exists) {
        let contactsArray = contactsList.data().generators;
        let FinalArray = [];
        for (let i = 0; i < contactsArray.length; i++) {
          if (!contactsArray[i].deletedAt) {
            FinalArray.push(contactsArray[i]);
          }
        }
        dispatch({
          type: propertyTypes.FETCH_GENERATOR,
          payload: FinalArray,
        });
      } else {
        dispatch({
          type: propertyTypes.FETCH_GENERATOR,
          payload: null,
        });
      }
    } else {
      const error = 'Something Went Wrong !!';
      dispatch({
        type: propertyTypes.SET_ERRORS,
        payload: error,
      });
    }
  } catch (err) {
    console.log('catch fetchGenerator');
    console.log(err);
  }
};
export const saveGenerator = (emergency, title, phone) => async dispatch => {
  let createdAt = new Date();
  let updatedAt = new Date();
  let deletedAt = null;
  let done = false;
  const myOb = {
    emergency,
    title,
    phone,
    done,
    createdAt,
    updatedAt,
    deletedAt,
  };
  console.log('myOb >>>>>>>>>>>>>>>>> ', myOb);
  try {
    console.log('From saveGenerator Action');
    const {IDFound, currentID} = await isPropertyIdFound();
    console.log('HERE FROM isPropertyIdFound()........................');
    console.log({IDFound, currentID});
    if (IDFound) {
      const userRef = firestore().doc(`generators/${currentID}`);
      const snapshot = await userRef.get();
      let contacts_array = snapshot.data();
      if (contacts_array) {
        let generators = contacts_array.generators;
        let nb = generators.length;
        generators.push({
          nb,
          emergency,
          title,
          phone,
          done,
          createdAt,
          updatedAt,
          deletedAt,
        });
        try {
          await userRef.set({generators});
          dispatch({
            type: propertyTypes.ADD_GENERATOR_SUCCESS,
            payload: true,
          });
        } catch (err) {
          console.log('error in Line 1187');
          console.log(err);
        }
      } else {
        try {
          await userRef.set({
            generators: [
              {
                nb: 0,
                emergency: emergency,
                title: title,
                phone: phone,
                done: done,
                createdAt: createdAt,
                updatedAt: updatedAt,
                deletedAt: deletedAt,
              },
            ],
          });
          dispatch({
            type: propertyTypes.ADD_GENERATOR_SUCCESS,
            payload: true,
          });
        } catch (err) {
          console.log('error in Line 1208');
          console.log(err);
        }
      }
    }
  } catch (err) {
    console.log('catch from saveGenerator !!');
    console.log(err);
  }
};
export const deleteGenerator = nb => async dispatch => {
  console.log('nb from delete Generator =>', nb);
  try {
    console.log('INsode Try catch deleteGenerator');
    const {IDFound, currentID} = await isPropertyIdFound();
    console.log('HERE FROM isPropertyIdFound()........................');
    console.log({IDFound, currentID});
    if (IDFound) {
      const userRef = firestore().doc(`generators/${currentID}`);
      const snapshot = await userRef.get();
      let contacts_array = snapshot.data();
      let generators = contacts_array.generators;
      console.log(generators);
      generators[nb].deletedAt = new Date();
      console.log(generators);
      try {
        await userRef.set({generators});
        dispatch({
          type: propertyTypes.DELETE_GENERATOR_SUCCESS,
          payload: true,
        });
      } catch (err) {
        console.log('error in Line 1508');
        console.log(err);
      }
    }
  } catch (err) {
    console.log('err delete Generator');
    console.log(err);
  }
};
export const doneGenerator = nb => async dispatch => {
  console.log('nb from Done Generator =>', nb);
  try {
    console.log('inside try catch DoneGenerator');
    const {IDFound, currentID} = await isPropertyIdFound();
    console.log('HERE FROM isPropertyIdFound()........................');
    console.log({IDFound, currentID});
    if (IDFound) {
      const userRef = firestore().doc(`generators/${currentID}`);
      const snapshot = await userRef.get();
      let contacts_array = snapshot.data();
      let generators = contacts_array.generators;
      console.log(generators);
      generators[nb].done = true;
      console.log(generators);
      try {
        await userRef.set({generators});
        dispatch({
          type: propertyTypes.DONE_GENERATOR_SUCCESS,
          payload: true,
        });
      } catch (err) {
        console.log('error in Line 1552');
        console.log(err);
      }
    }
  } catch (err) {
    console.log('err Done Generator');
    cnonsole.log(err);
  }
};
export const resetFetchGenerator = () => ({
  type: propertyTypes.RESET_FETCH_GENERATOR,
});
export const ResetAddGeneratorForm = () => ({
  type: propertyTypes.RESET_ADDGENERATOR_FORMS,
});
export const ResetDeleteGeneratorForm = () => ({
  type: propertyTypes.RESET_DELETEGENERATOR_FORMS,
});
export const ResetDoneGeneratorForm = () => ({
  type: propertyTypes.RESET_DONE_GENERATOR_SUCCESS,
});

// LOCKBOX
export const fetchLockbox = props => async dispatch => {
  console.log('props from fetchLockBox Actions', props);
  try {
    console.log('From fetchLockBox Action');
    const {IDFound, currentID} = await isPropertyIdFound();
    console.log('HERE FROM isPropertyIdFound()........................');
    console.log({IDFound, currentID});
    if (IDFound) {
      const contactsListRef = firestore().doc(`lockboxes/${currentID}`);
      const contactsList = await contactsListRef.get();
      console.log(' accessList =====  ', contactsList);
      if (contactsList.exists) {
        let contactsArray = contactsList.data().lockboxes;
        let FinalArray = [];
        for (let i = 0; i < contactsArray.length; i++) {
          if (!contactsArray[i].deletedAt) {
            FinalArray.push(contactsArray[i]);
          }
        }
        dispatch({
          type: propertyTypes.FETCH_LOCKBOX,
          payload: FinalArray,
        });
      } else {
        dispatch({
          type: propertyTypes.FETCH_LOCKBOX,
          payload: null,
        });
      }
    } else {
      const error = 'Something Went Wrong !!';
      dispatch({
        type: propertyTypes.SET_ERRORS,
        payload: error,
      });
    }
  } catch (err) {
    console.log('catch fetchLockbox');
    console.log(err);
  }
};
export const saveLockbox = (ownerName, ownerContactNumber, tenantName, tenantContactNumber, lockboxCode, pets, masterKeyCode) => async dispatch => {
  let createdAt = new Date();
  let updatedAt = new Date();
  let deletedAt = null;
  let done = false;
  const myOb = {
    ownerName,
    ownerContactNumber,
    tenantName,
    tenantContactNumber,
    lockboxCode,
    pets,
    masterKeyCode,
    done,
    createdAt,
    updatedAt,
    deletedAt,
  };
  console.log('myOb >>>>>>>>>>>>>>>>> ', myOb);
  try {
    console.log('From saveLockBoxes Action');
    const {IDFound, currentID} = await isPropertyIdFound();
    console.log('HERE FROM isPropertyIdFound()........................');
    console.log({IDFound, currentID});
    if (IDFound) {
      const userRef = firestore().doc(`lockboxes/${currentID}`);
      const snapshot = await userRef.get();
      let contacts_array = snapshot.data();
      if (contacts_array) {
        let lockboxes = contacts_array.lockboxes;
        let nb = lockboxes.length;
        lockboxes.push({
          nb,
          ownerName,
          ownerContactNumber,
          tenantName,
          tenantContactNumber,
          lockboxCode,
          pets,
          masterKeyCode,
          done,
          createdAt,
          updatedAt,
          deletedAt,
        });
        try {
          await userRef.set({lockboxes});
          dispatch({
            type: propertyTypes.ADD_LOCKBOX_SUCCESS,
            payload: true,
          });
        } catch (err) {
          console.log('error in Line 1686');
          console.log(err);
        }
      } else {
        try {
          await userRef.set({
            lockboxes: [
              {
                nb: 0,
                ownerName: ownerName, 
                ownerContactNumber: ownerContactNumber,
                tenantName: tenantName,
                tenantContactNumber: tenantContactNumber,
                lockboxCode: lockboxCode,
                pets: pets,
                masterKeyCode: masterKeyCode,
                done: done,
                createdAt: createdAt,
                updatedAt: updatedAt,
                deletedAt: deletedAt,
              },
            ],
          });
          dispatch({
            type: propertyTypes.ADD_LOCKBOX_SUCCESS,
            payload: true,
          });
        } catch (err) {
          console.log('error in Line 1339');
          console.log(err);
        }
      }
    }
  } catch (err) {
    console.log('catch from savelockBoxes !!');
    console.log(err);
  }
};
export const deleteLockbox = nb => async dispatch => {
  console.log('nb from delete LockBox =>', nb);
  try {
    console.log('INsode Try catch deleteLockBox');
    const {IDFound, currentID} = await isPropertyIdFound();
    console.log('HERE FROM isPropertyIdFound()........................');
    console.log({IDFound, currentID});
    if (IDFound) {
      const userRef = firestore().doc(`lockboxes/${currentID}`);
      const snapshot = await userRef.get();
      let contacts_array = snapshot.data();
      let lockboxes = contacts_array.lockboxes;
      console.log(lockboxes);
      lockboxes[nb].deletedAt = new Date();
      console.log(lockboxes);
      try {
        await userRef.set({lockboxes});
        dispatch({
          type: propertyTypes.DELETE_LOCKBOX_SUCCESS,
          payload: true,
        });
      } catch (err) {
        console.log('error in Line 1755');
        console.log(err);
      }
    }
  } catch (err) {
    console.log('err delete LockBox');
    console.log(err);
  }
};
export const doneLockbox = nb => async dispatch => {
  console.log('nb from Done LockBox =>', nb);
  try {
    console.log('inside try catch DoneMatterport');
    const {IDFound, currentID} = await isPropertyIdFound();
    console.log('HERE FROM isPropertyIdFound()........................');
    console.log({IDFound, currentID});
    if (IDFound) {
      const userRef = firestore().doc(`lockboxes/${currentID}`);
      const snapshot = await userRef.get();
      let contacts_array = snapshot.data();
      let lockboxes = contacts_array.lockboxes;
      console.log(lockboxes);
      lockboxes[nb].done = true;
      console.log(lockboxes);
      try {
        await userRef.set({lockboxes});
        dispatch({
          type: propertyTypes.DONE_LOCKBOX_SUCCESS,
          payload: true,
        });
      } catch (err) {
        console.log('error in Line 1584');
        console.log(err);
      }
    }
  } catch (err) {
    console.log('err Done LockBox');
    console.log(err);
  }
};
export const resetFetchLockbox = () => ({
  type: propertyTypes.RESET_FETCH_LOCKBOX,
});
export const ResetAddLockboxForm = () => ({
  type: propertyTypes.RESET_ADDLOCKBOX_FORMS,
});
export const ResetDeleteLockboxForm = () => ({
  type: propertyTypes.RESET_DELETELOCKBOX_FORMS,
});
export const ResetDoneLockboxForm = () => ({
  type: propertyTypes.RESET_DONE_LOCKBOX_SUCCESS,
});
// MATTERPORT
export const fetchMatterport = props => async dispatch => {
  console.log('props from fetchMatterport Actions', props);
  try {
    console.log('From fetchMatterport Action');
    const {IDFound, currentID} = await isPropertyIdFound();
    console.log('HERE FROM isPropertyIdFound()........................');
    console.log({IDFound, currentID});
    if (IDFound) {
      const contactsListRef = firestore().doc(`matterports/${currentID}`);
      const contactsList = await contactsListRef.get();
      console.log(' matterportsList =====  ', contactsList);
      if (contactsList.exists) {
        let contactsArray = contactsList.data().matterports;
        let FinalArray = [];
        for (let i = 0; i < contactsArray.length; i++) {
          if (!contactsArray[i].deletedAt) {
            FinalArray.push(contactsArray[i]);
          }
        }
        dispatch({
          type: propertyTypes.FETCH_MATTERPORT,
          payload: FinalArray,
        });
      } else {
        dispatch({
          type: propertyTypes.FETCH_MATTERPORT,
          payload: null,
        });
      }
    } else {
      const error = 'Something Went Wrong !!';
      dispatch({
        type: propertyTypes.SET_ERRORS,
        payload: error,
      });
    }
  } catch (err) {
    console.log('catch fetchMatterport');
    console.log(err);
  }
};
export const saveMatterport = (emergency, title, phone) => async dispatch => {
  let createdAt = new Date();
  let updatedAt = new Date();
  let deletedAt = null;
  let done = false;
  const myOb = {
    emergency,
    title,
    phone,
    done,
    createdAt,
    updatedAt,
    deletedAt,
  };
  console.log('myOb >>>>>>>>>>>>>>>>> ', myOb);
  try {
    console.log('From saveMatterport Action');
    const {IDFound, currentID} = await isPropertyIdFound();
    console.log('HERE FROM isPropertyIdFound()........................');
    console.log({IDFound, currentID});
    if (IDFound) {
      const userRef = firestore().doc(`matterports/${currentID}`);
      const snapshot = await userRef.get();
      let contacts_array = snapshot.data();
      if (contacts_array) {
        let matterports = contacts_array.matterports;
        let nb = matterports.length;
        matterports.push({
          nb,
          emergency,
          title,
          phone,
          done,
          createdAt,
          updatedAt,
          deletedAt,
        });
        try {
          await userRef.set({matterports});
          dispatch({
            type: propertyTypes.ADD_MATTERPORT_SUCCESS,
            payload: true,
          });
        } catch (err) {
          console.log('error in Line 1449');
          console.log(err);
        }
      } else {
        try {
          await userRef.set({
            matterports: [
              {
                nb: 0,
                emergency: emergency,
                title: title,
                phone: phone,
                done: done,
                createdAt: createdAt,
                updatedAt: updatedAt,
                deletedAt: deletedAt,
              },
            ],
          });
          dispatch({
            type: propertyTypes.ADD_MATTERPORT_SUCCESS,
            payload: true,
          });
        } catch (err) {
          console.log('error in Line 1470');
          console.log(err);
        }
      }
    }
  } catch (err) {
    console.log('catch from saveMatterport !!');
    console.log(err);
  }
};
export const deleteMatterport = nb => async dispatch => {
  console.log('nb from delete Matterport =>', nb);
  try {
    console.log('INsode Try catch deleteMatterport');
    const {IDFound, currentID} = await isPropertyIdFound();
    console.log('HERE FROM isPropertyIdFound()........................');
    console.log({IDFound, currentID});
    if (IDFound) {
      const userRef = firestore().doc(`matterports/${currentID}`);
      const snapshot = await userRef.get();
      let contacts_array = snapshot.data();
      let matterports = contacts_array.matterports;
      console.log(matterports);
      matterports[nb].deletedAt = new Date();
      console.log(matterports);
      try {
        await userRef.set({matterports});
        dispatch({
          type: propertyTypes.DELETE_MATTERPORT_SUCCESS,
          payload: true,
        });
      } catch (err) {
        console.log('error in Line 1538');
        console.log(err);
      }
    }
  } catch (err) {
    console.log('err delete Matterport');
    console.log(err);
  }
};
export const doneMatterport = nb => async dispatch => {
  console.log('nb from Done Matterport =>', nb);
  try {
    console.log('inside try catch DoneMatterport');
    const {IDFound, currentID} = await isPropertyIdFound();
    console.log('HERE FROM isPropertyIdFound()........................');
    console.log({IDFound, currentID});
    if (IDFound) {
      const userRef = firestore().doc(`matterports/${currentID}`);
      const snapshot = await userRef.get();
      let contacts_array = snapshot.data();
      let matterports = contacts_array.matterports;
      console.log(matterports);
      matterports[nb].done = true;
      console.log(matterports);
      try {
        await userRef.set({matterports});
        dispatch({
          type: propertyTypes.DONE_MATTERPORT_SUCCESS,
          payload: true,
        });
      } catch (err) {
        console.log('error in Line 1584');
        console.log(err);
      }
    }
  } catch (err) {
    console.log('err Done Matterport');
    console.log(err);
  }
};
export const resetFetchMatterport = () => ({
  type: propertyTypes.RESET_FETCH_MATTERPORT,
});
export const ResetAddMatterportForm = () => ({
  type: propertyTypes.RESET_ADDMATTERPORT_FORMS,
});
export const ResetDeleteMatterportForm = () => ({
  type: propertyTypes.RESET_DELETEMATTERPORT_FORMS,
});
export const ResetDoneMatterportForm = () => ({
  type: propertyTypes.RESET_DONE_MATTERPORT_SUCCESS,
});

// GALLERY
export const fetchPhoto = () => async dispatch => {
  try {
    console.log('From fetchGallery Action');
    const {IDFound, currentID} = await isPropertyIdFound();
    console.log('HERE FROM isPropertyIdFound()........................');
    console.log({IDFound, currentID});
    if (IDFound) {
      const documentsListRef = firestore().doc(`photos/${currentID}`);
      const documentsList = await documentsListRef.get();
      if (documentsList.exists) {
        let documentsArray = documentsList.data().photos;
        let FinalArray = [];
        for (let i = 0; i < documentsArray.length; i++) {
          if (!documentsArray[i].deletedAt) {
            FinalArray.push(documentsArray[i]);
          }
        }
        dispatch({
          type: propertyTypes.FETCH_PHOTO,
          payload: FinalArray,
        });
      } else {
        dispatch({
          type: propertyTypes.FETCH_PHOTO,
          payload: null,
        });
      }
    } else {
      const error = 'Something Went Wrong !!';
      dispatch({
        type: propertyTypes.SET_ERRORS,
        payload: error,
      });
    }
    //  Get Associate ID
  } catch (err) {
    console.log('error from fetchPhoto catch !!');
    console.log(err);
  }
};
export const savePhoto = (photo, name) => async dispatch => {
  let createdAt = new Date();
  let updatedAt = new Date();
  let deletedAt = null;
  const myOb = {
    photo,
    name,
    createdAt,
    updatedAt,
    createdAt,
    updatedAt,
    deletedAt,
  };
  console.log('myOb >>>>>>>>>>>>>>>>> ', myOb);
  try {
    console.log('From savePhoto Action');
    const {IDFound, currentID} = await isPropertyIdFound();
    console.log('HERE FROM isPropertyIdFound()........................');
    console.log({IDFound, currentID});
    try {
      const url_uuid = uuid.v4();
      const reference = storage().ref(
        `/${currentID}/photos/photos_${url_uuid}.png`,
      );
      await reference.putFile(photo);
      var url = await storage()
        .ref(`/${currentID}/photos/photos_${url_uuid}.png`)
        .getDownloadURL();
    } catch (err) {
      console.log('first try catch savePhoto =>');
      console.log(err);
    }
    if (IDFound) {
      const userRef = firestore().doc(`photos/${currentID}`);
      const snapshot = await userRef.get();
      let contacts_array = snapshot.data();
      if (contacts_array) {
        let photos = contacts_array.photos;
        let nb = photos.length;
        let photo = url;
        photos.push({nb, name, photo, createdAt, updatedAt, deletedAt});
        try {
          console.log('inside try Line 369');
          await userRef.set({photos});
          dispatch({
            type: propertyTypes.ADD_PHOTO_SUCCESS,
            payload: true,
          });
          console.log('Line 374');
        } catch (err) {
          console.log('error in 376');
          console.log(err);
        }
      } else {
        try {
          let photo = url;
          await userRef.set({
            photos: [
              {
                nb: 0,
                name: name,
                photo: photo,
                createdAt: createdAt,
                updatedAt: updatedAt,
                deletedAt: deletedAt,
              },
            ],
          });
          dispatch({
            type: propertyTypes.ADD_PHOTO_SUCCESS,
            payload: true,
          });
        } catch (err) {
          console.log('error in 398');
          console.log(err);
        }
      }
    }
  } catch (err) {
    console.log('error TRY_CATCH savePhoto');
    console.log(err);
  }
};
export const deletePhoto = nb => async dispatch => {
  console.log('nb from delete Gallery =>', nb);
  try {
    console.log('INsode Try catch deleteMatterport');
    const {IDFound, currentID} = await isPropertyIdFound();
    console.log('HERE FROM isPropertyIdFound()........................');
    console.log({IDFound, currentID});
    if (IDFound) {
      const userRef = firestore().doc(`photos/${currentID}`);
      const snapshot = await userRef.get();
      let contacts_array = snapshot.data();
      let photos = contacts_array.photos;
      console.log(photos);
      photos[nb].deletedAt = new Date();
      console.log(photos);
      try {
        await userRef.set({photos});
        dispatch({
          type: propertyTypes.DELETE_PHOTO_SUCCESS,
          payload: true,
        });
      } catch (err) {
        console.log('error in Line 1538');
        console.log(err);
      }
    }
  } catch (err) {
    console.log('err delete Gallery');
    console.log(err);
  }
};
export const resetFetchPhoto = () => ({
  type: propertyTypes.RESET_FETCH_PHOTO,
});
export const ResetAddPhotoForm = () => ({
  type: propertyTypes.RESET_ADDPHOTO_FORMS,
});
export const ResetDeletePhotoForm = () => ({
  type: propertyTypes.RESET_DELETEPHOTO_FORMS,
});

// PRECAUTION
export const fetchPrecaution = props => async dispatch => {
  console.log('props from fetchPrecaution Actions', props);
  try {
    console.log('From fetchPrecaution Action');
    const {IDFound, currentID} = await isPropertyIdFound();
    console.log('HERE FROM isPropertyIdFound()........................');
    console.log({IDFound, currentID});
    if (IDFound) {
      const contactsListRef = firestore().doc(`precautions/${currentID}`);
      const contactsList = await contactsListRef.get();
      console.log(' precautionsList =====  ', contactsList);
      if (contactsList.exists) {
        let contactsArray = contactsList.data().precautions;
        let FinalArray = [];
        for (let i = 0; i < contactsArray.length; i++) {
          if (!contactsArray[i].deletedAt) {
            FinalArray.push(contactsArray[i]);
          }
        }
        dispatch({
          type: propertyTypes.FETCH_PRECAUTION,
          payload: FinalArray,
        });
      } else {
        dispatch({
          type: propertyTypes.FETCH_PRECAUTION,
          payload: null,
        });
      }
    } else {
      const error = 'Something Went Wrong !!';
      dispatch({
        type: propertyTypes.SET_ERRORS,
        payload: error,
      });
    }
  } catch (err) {
    console.log('catch fetchPrecaution');
    console.log(err);
  }
};
export const savePrecaution = (emergency, title, phone) => async dispatch => {
  let createdAt = new Date();
  let updatedAt = new Date();
  let deletedAt = null;
  let done = false;
  const myOb = {
    emergency,
    title,
    phone,
    done,
    createdAt,
    updatedAt,
    deletedAt,
  };
  console.log('myOb >>>>>>>>>>>>>>>>> ', myOb);
  try {
    console.log('From savePrecaution Action');
    const {IDFound, currentID} = await isPropertyIdFound();
    console.log('HERE FROM isPropertyIdFound()........................');
    console.log({IDFound, currentID});
    if (IDFound) {
      const userRef = firestore().doc(`precautions/${currentID}`);
      const snapshot = await userRef.get();
      let contacts_array = snapshot.data();
      if (contacts_array) {
        let precautions = contacts_array.precautions;
        let nb = precautions.length;
        precautions.push({
          nb,
          emergency,
          title,
          phone,
          done,
          createdAt,
          updatedAt,
          deletedAt,
        });
        try {
          await userRef.set({precautions});
          dispatch({
            type: propertyTypes.ADD_PRECAUTION_SUCCESS,
            payload: true,
          });
        } catch (err) {
          console.log('error in Line 2302');
          console.log(err);
        }
      } else {
        try {
          await userRef.set({
            precautions: [
              {
                nb: 0,
                emergency: emergency,
                title: title,
                phone: phone,
                done: done,
                createdAt: createdAt,
                updatedAt: updatedAt,
                deletedAt: deletedAt,
              },
            ],
          });
          dispatch({
            type: propertyTypes.ADD_PRECAUTION_SUCCESS,
            payload: true,
          });
        } catch (err) {
          console.log('error in Line 2326');
          console.log(err);
        }
      }
    }
  } catch (err) {
    console.log('catch from savePrecaution !!');
    console.log(err);
  }
};
export const deletePrecaution = nb => async dispatch => {
  console.log('nb from delete Precaution =>', nb);
  try {
    console.log('INsode Try catch deletePrecaution');
    const {IDFound, currentID} = await isPropertyIdFound();
    console.log('HERE FROM isPropertyIdFound()........................');
    console.log({IDFound, currentID});
    if (IDFound) {
      const userRef = firestore().doc(`precautions/${currentID}`);
      const snapshot = await userRef.get();
      let contacts_array = snapshot.data();
      let precautions = contacts_array.precautions;
      console.log(precautions);
      precautions[nb].deletedAt = new Date();
      console.log(precautions);
      try {
        await userRef.set({precautions});
        dispatch({
          type: propertyTypes.DELETE_PRECAUTION_SUCCESS,
          payload: true,
        });
      } catch (err) {
        console.log('error in Line 2371');
        console.log(err);
      }
    }
  } catch (err) {
    console.log('err delete Precaution');
    console.log(err);
  }
};
export const donePrecaution = nb => async dispatch => {
  console.log('nb from Done Precaution =>', nb);
  try {
    console.log('inside try catch DonePrecaution');
    const {IDFound, currentID} = await isPropertyIdFound();
    console.log('HERE FROM isPropertyIdFound()........................');
    console.log({IDFound, currentID});
    if (IDFound) {
      const userRef = firestore().doc(`precautions/${currentID}`);
      const snapshot = await userRef.get();
      let contacts_array = snapshot.data();
      let precautions = contacts_array.precautions;
      console.log(precautions);
      precautions[nb].done = true;
      console.log(precautions);
      try {
        await userRef.set({precautions});
        dispatch({
          type: propertyTypes.DONE_PRECAUTION_SUCCESS,
          payload: true,
        });
      } catch (err) {
        console.log('error in Line 2415');
        console.log(err);
      }
    }
  } catch (err) {
    console.log('err Done Precaution');
    cnonsole.log(err);
  }
};
export const resetFetchPrecaution = () => ({
  type: propertyTypes.RESET_FETCH_PRECAUTION,
});
export const ResetAddPrecautionForm = () => ({
  type: propertyTypes.RESET_ADDPRECAUTION_FORMS,
});
export const ResetDeletePrecautionForm = () => ({
  type: propertyTypes.RESET_DELETEPRECAUTION_FORMS,
});
export const ResetDonePrecautionForm = () => ({
  type: propertyTypes.RESET_DONE_PRECAUTION_SUCCESS,
});

// PREEXISTINGDAMAGE
export const fetchPreExistingDamage = props => async dispatch => {
  console.log('props from fetchPreExistingDamage Actions', props);
  try {
    console.log('From fetchPreExistingDamage Action');
    const {IDFound, currentID} = await isPropertyIdFound();
    console.log('HERE FROM isPropertyIdFound()........................');
    console.log({IDFound, currentID});
    if (IDFound) {
      const contactsListRef = firestore().doc(
        `preexistingdamages/${currentID}`,
      );
      const contactsList = await contactsListRef.get();
      console.log(' preexistingdamagesList =====  ', contactsList);
      if (contactsList.exists) {
        let contactsArray = contactsList.data().preexistingdamages;
        let FinalArray = [];
        for (let i = 0; i < contactsArray.length; i++) {
          if (!contactsArray[i].deletedAt) {
            FinalArray.push(contactsArray[i]);
          }
        }
        dispatch({
          type: propertyTypes.FETCH_PREEXISTINGDAMAGE,
          payload: FinalArray,
        });
      } else {
        dispatch({
          type: propertyTypes.FETCH_PREEXISTINGDAMAGE,
          payload: null,
        });
      }
    } else {
      const error = 'Something Went Wrong !!';
      dispatch({
        type: propertyTypes.SET_ERRORS,
        payload: error,
      });
    }
  } catch (err) {
    console.log('catch fetchPreExistingDamage');
    console.log(err);
  }
};
export const savePreExistingDamage =
  (emergency, title, phone) => async dispatch => {
    let createdAt = new Date();
    let updatedAt = new Date();
    let deletedAt = null;
    let done = false;
    const myOb = {
      emergency,
      title,
      phone,
      done,
      createdAt,
      updatedAt,
      deletedAt,
    };
    console.log('myOb >>>>>>>>>>>>>>>>> ', myOb);
    try {
      console.log('From savePreExistingDamage Action');
      const {IDFound, currentID} = await isPropertyIdFound();
      console.log('HERE FROM isPropertyIdFound()........................');
      console.log({IDFound, currentID});
      if (IDFound) {
        const userRef = firestore().doc(`preexistingdamages/${currentID}`);
        const snapshot = await userRef.get();
        let contacts_array = snapshot.data();
        if (contacts_array) {
          let preexistingdamages = contacts_array.preexistingdamages;
          let nb = preexistingdamages.length;
          preexistingdamages.push({
            nb,
            emergency,
            title,
            phone,
            done,
            createdAt,
            updatedAt,
            deletedAt,
          });
          try {
            await userRef.set({preexistingdamages});
            dispatch({
              type: propertyTypes.ADD_PREEXISTINGDAMAGE_SUCCESS,
              payload: true,
            });
          } catch (err) {
            console.log('error in Line 2549');
            console.log(err);
          }
        } else {
          try {
            await userRef.set({
              preexistingdamages: [
                {
                  nb: 0,
                  emergency: emergency,
                  title: title,
                  phone: phone,
                  done: done,
                  createdAt: createdAt,
                  updatedAt: updatedAt,
                  deletedAt: deletedAt,
                },
              ],
            });
            dispatch({
              type: propertyTypes.ADD_PREEXISTINGDAMAGE_SUCCESS,
              payload: true,
            });
          } catch (err) {
            console.log('error in Line 2573');
            console.log(err);
          }
        }
      }
    } catch (err) {
      console.log('catch from savePreExistingDamage !!');
      console.log(err);
    }
  };
export const deletePreExistingDamage = nb => async dispatch => {
  console.log('nb from delete PreExistingDamage =>', nb);
  try {
    console.log('INsode Try catch deletePreExistingDamage');
    const {IDFound, currentID} = await isPropertyIdFound();
    console.log('HERE FROM isPropertyIdFound()........................');
    console.log({IDFound, currentID});
    if (IDFound) {
      const userRef = firestore().doc(`preexistingdamages/${currentID}`);
      const snapshot = await userRef.get();
      let contacts_array = snapshot.data();
      let preexistingdamages = contacts_array.preexistingdamages;
      console.log(preexistingdamages);
      preexistingdamages[nb].deletedAt = new Date();
      console.log(preexistingdamages);
      try {
        await userRef.set({preexistingdamages});
        dispatch({
          type: propertyTypes.DELETE_PREEXISTINGDAMAGE_SUCCESS,
          payload: true,
        });
      } catch (err) {
        console.log('error in Line 2618');
        console.log(err);
      }
    }
  } catch (err) {
    console.log('err delete PreExistingDamage');
    console.log(err);
  }
};
export const donePreExistingDamage = nb => async dispatch => {
  console.log('nb from Done PreExistingDamage =>', nb);
  try {
    console.log('inside try catch DonePreExistingDamage');
    const {IDFound, currentID} = await isPropertyIdFound();
    console.log('HERE FROM isPropertyIdFound()........................');
    console.log({IDFound, currentID});
    if (IDFound) {
      const userRef = firestore().doc(`preexistingdamages/${currentID}`);
      const snapshot = await userRef.get();
      let contacts_array = snapshot.data();
      let preexistingdamages = contacts_array.preexistingdamages;
      console.log(preexistingdamages);
      preexistingdamages[nb].done = true;
      console.log(preexistingdamages);
      try {
        await userRef.set({preexistingdamages});
        dispatch({
          type: propertyTypes.DONE_PREEXISTINGDAMAGE_SUCCESS,
          payload: true,
        });
      } catch (err) {
        console.log('error in Line 2662');
        console.log(err);
      }
    }
  } catch (err) {
    console.log('err Done PreExistingDamage');
    cnonsole.log(err);
  }
};
export const resetFetchPreExistingDamage = () => ({
  type: propertyTypes.RESET_FETCH_PREEXISTINGDAMAGE,
});
export const ResetAddPreExistingDamageForm = () => ({
  type: propertyTypes.RESET_ADDPREEXISTINGDAMAGE_FORMS,
});
export const ResetDeletePreExistingDamageForm = () => ({
  type: propertyTypes.RESET_DELETEPREEXISTINGDAMAGE_FORMS,
});
export const ResetDonePreExistingDamageForm = () => ({
  type: propertyTypes.RESET_DONE_PREEXISTINGDAMAGE_SUCCESS,
});

// UTILITY
export const fetchUtility = props => async dispatch => {
  console.log('props from fetchUtility Actions', props);
  try {
    console.log('From fetchUtility Action');
    const {IDFound, currentID} = await isPropertyIdFound();
    console.log('HERE FROM isPropertyIdFound()........................');
    console.log({IDFound, currentID});
    if (IDFound) {
      const contactsListRef = firestore().doc(`utilities/${currentID}`);
      const contactsList = await contactsListRef.get();
      console.log(' utilitiesList =====  ', contactsList);
      if (contactsList.exists) {
        let contactsArray = contactsList.data().utilities;
        let FinalArray = [];
        for (let i = 0; i < contactsArray.length; i++) {
          if (!contactsArray[i].deletedAt) {
            FinalArray.push(contactsArray[i]);
          }
        }
        dispatch({
          type: propertyTypes.FETCH_UTILITY,
          payload: FinalArray,
        });
      } else {
        dispatch({
          type: propertyTypes.FETCH_UTILITY,
          payload: null,
        });
      }
    } else {
      const error = 'Something Went Wrong !!';
      dispatch({
        type: propertyTypes.SET_ERRORS,
        payload: error,
      });
    }
  } catch (err) {
    console.log('catch fetchUtility');
    console.log(err);
  }
};
export const saveUtility = (emergency, title, phone) => async dispatch => {
  let createdAt = new Date();
  let updatedAt = new Date();
  let deletedAt = null;
  let done = false;
  const myOb = {
    emergency,
    title,
    phone,
    done,
    createdAt,
    updatedAt,
    deletedAt,
  };
  console.log('myOb >>>>>>>>>>>>>>>>> ', myOb);
  try {
    console.log('From saveUtility Action');
    const {IDFound, currentID} = await isPropertyIdFound();
    console.log('HERE FROM isPropertyIdFound()........................');
    console.log({IDFound, currentID});
    if (IDFound) {
      const userRef = firestore().doc(`utilities/${currentID}`);
      const snapshot = await userRef.get();
      let contacts_array = snapshot.data();
      if (contacts_array) {
        let utilities = contacts_array.utilities;
        let nb = utilities.length;
        utilities.push({
          nb,
          emergency,
          title,
          phone,
          done,
          createdAt,
          updatedAt,
          deletedAt,
        });
        try {
          await userRef.set({utilities});
          dispatch({
            type: propertyTypes.ADD_UTILITY_SUCCESS,
            payload: true,
          });
        } catch (err) {
          console.log('error in Line 2796');
          console.log(err);
        }
      } else {
        try {
          await userRef.set({
            utilities: [
              {
                nb: 0,
                emergency: emergency,
                title: title,
                phone: phone,
                done: done,
                createdAt: createdAt,
                updatedAt: updatedAt,
                deletedAt: deletedAt,
              },
            ],
          });
          dispatch({
            type: propertyTypes.ADD_UTILITY_SUCCESS,
            payload: true,
          });
        } catch (err) {
          console.log('error in Line 2820');
          console.log(err);
        }
      }
    }
  } catch (err) {
    console.log('catch from saveUtility !!');
    console.log(err);
  }
};
export const deleteUtility = nb => async dispatch => {
  console.log('nb from delete Utility =>', nb);
  try {
    console.log('INsode Try catch deleteUtility');
    const {IDFound, currentID} = await isPropertyIdFound();
    console.log('HERE FROM isPropertyIdFound()........................');
    console.log({IDFound, currentID});
    if (IDFound) {
      const userRef = firestore().doc(`utilities/${currentID}`);
      const snapshot = await userRef.get();
      let contacts_array = snapshot.data();
      let utilities = contacts_array.utilities;
      console.log(utilities);
      utilities[nb].deletedAt = new Date();
      console.log(utilities);
      try {
        await userRef.set({utilities});
        dispatch({
          type: propertyTypes.DELETE_UTILITY_SUCCESS,
          payload: true,
        });
      } catch (err) {
        console.log('error in Line 2865');
        console.log(err);
      }
    }
  } catch (err) {
    console.log('err delete Utility');
    console.log(err);
  }
};
export const doneUtility = nb => async dispatch => {
  console.log('nb from Done Utility =>', nb);
  try {
    console.log('inside try catch DoneUtility');
    const {IDFound, currentID} = await isPropertyIdFound();
    console.log('HERE FROM isPropertyIdFound()........................');
    console.log({IDFound, currentID});
    if (IDFound) {
      const userRef = firestore().doc(`utilities/${currentID}`);
      const snapshot = await userRef.get();
      let contacts_array = snapshot.data();
      let utilities = contacts_array.utilities;
      console.log(utilities);
      utilities[nb].done = true;
      console.log(utilities);
      try {
        await userRef.set({utilities});
        dispatch({
          type: propertyTypes.DONE_UTILITY_SUCCESS,
          payload: true,
        });
      } catch (err) {
        console.log('error in Line 2909');
        console.log(err);
      }
    }
  } catch (err) {
    console.log('err Done Utility');
    cnonsole.log(err);
  }
};
export const resetFetchUtility = () => ({
  type: propertyTypes.RESET_FETCH_UTILITY,
});
export const ResetAddUtilityForm = () => ({
  type: propertyTypes.RESET_ADDUTILITY_FORMS,
});
export const ResetDeleteUtilityForm = () => ({
  type: propertyTypes.RESET_DELETEUTILITY_FORMS,
});
export const ResetDoneUtilityForm = () => ({
  type: propertyTypes.RESET_DONE_UTILITY_SUCCESS,
});
// HELP
// Q&A
export const fetchQuestions = props => async dispatch => {
  console.log('props from fetchQuestions Actions', props);
  try {
    console.log('From fetchQuestions Action');
    const {IDFound, currentID} = await isPropertyIdFound();
    console.log('HERE FROM isPropertyIdFound()........................');
    console.log({IDFound, currentID});
    if (IDFound) {
      const contactsListRef = firestore().doc(`questions/${currentID}`);
      const contactsList = await contactsListRef.get();
      console.log(' questionsList =====  ', contactsList);
      if (contactsList.exists) {
        let contactsArray = contactsList.data().questions;
        let FinalArray = [];
        for (let i = 0; i < contactsArray.length; i++) {
          if (!contactsArray[i].deletedAt) {
            FinalArray.push(contactsArray[i]);
          }
        }
        dispatch({
          type: propertyTypes.FETCH_QUESTIONS,
          payload: FinalArray,
        });
      } else {
        dispatch({
          type: propertyTypes.FETCH_QUESTIONS,
          payload: null,
        });
      }
    } else {
      const error = 'Something Went Wrong !!';
      dispatch({
        type: propertyTypes.SET_ERRORS,
        payload: error,
      });
    }
  } catch (err) {
    console.log('catch fetchQuestions');
    console.log(err);
  }
};
export const saveQuestion = question => async dispatch => {
  let createdAt = new Date();
  let updatedAt = new Date();
  let deletedAt = null;
  let answers = [];
  const myOb = {
    question,
    answers,
    createdAt,
    updatedAt,
    deletedAt,
  };
  console.log('myOb >>>>>>>>>>>>>>>>> ', myOb);
  try {
    console.log('From saveQuestion Action');
    const {IDFound, currentID} = await isPropertyIdFound();
    console.log('HERE FROM isPropertyIdFound()........................');
    console.log({IDFound, currentID});
    if (IDFound) {
      const userRef = firestore().doc(`questions/${currentID}`);
      const snapshot = await userRef.get();
      let contacts_array = snapshot.data();
      if (contacts_array) {
        let questions = contacts_array.questions;
        let nb = questions.length;
        questions.push({
          nb,
          question,
          answers,
          createdAt,
          updatedAt,
          deletedAt,
        });
        try {
          await userRef.set({questions});
          dispatch({
            type: propertyTypes.ADD_QUESTION_SUCCESS,
            payload: true,
          });
        } catch (err) {
          console.log('error in Line 2796');
          console.log(err);
        }
      } else {
        try {
          await userRef.set({
            questions: [
              {
                nb: 0,
                question: question,
                answers: answers,
                createdAt: createdAt,
                updatedAt: updatedAt,
                deletedAt: deletedAt,
              },
            ],
          });
          dispatch({
            type: propertyTypes.ADD_QUESTION_SUCCESS,
            payload: true,
          });
        } catch (err) {
          console.log('error in Line 2820');
          console.log(err);
        }
      }
    }
  } catch (err) {
    console.log('catch from saveQuestion !!');
    console.log(err);
  }
};
export const resetFetchQuestion = () => ({
  type: propertyTypes.RESET_FETCH_QUESTION,
});
export const ResetAddQuestionForm = () => ({
  type: propertyTypes.RESET_ADDQUESTION_FORMS,
});
export const saveAnswer = (answer, nb, propertyId) => async dispatch => {
  let createdAt = new Date();
  let updatedAt = new Date();
  let deletedAt = null;
  let answers = [];
  const myOb = {
    answer,
    createdAt,
    updatedAt,
    deletedAt,
  };
  console.log('myOb >>>>>>>>>>>>>>>>> ', myOb);
  try {
    console.log('From saveAnswer Action');
    const {IDFound, currentID} = await isPropertyIdFoundAnswer(propertyId);
    console.log('HERE FROM isPropertyIdFound()........................');
    console.log({IDFound, currentID});
    if (IDFound) {
      const userRef = firestore().doc(`questions/${currentID}`);
      const snapshot = await userRef.get();
      let contacts_array = snapshot.data();
      if (contacts_array) {
        let questions = contacts_array.questions;
        let FinalAnswers = [];
        for (let i = 0; i < questions.length; i++) {
          if (i === nb) {
            let q = questions[i];
            q.answers.push({
              answer,
              createdAt,
              updatedAt,
              deletedAt,
            });
            FinalAnswers.push(q);
          } else {
            FinalAnswers.push(questions[i]);
          }
        }
        try {
          let questions = FinalAnswers;
          await userRef.set({questions});
          dispatch({
            type: propertyTypes.ADD_ANSWER_SUCCESS,
            payload: true,
          });
        } catch (err) {
          console.log('error in Line 2796');
          console.log(err);
        }
      } else {
        try {
          await userRef.set({
            utilities: [
              {
                nb: 0,
                question: question,
                answers: answers,
                createdAt: createdAt,
                updatedAt: updatedAt,
                deletedAt: deletedAt,
              },
            ],
          });
          dispatch({
            type: propertyTypes.ADD_ANSWER_SUCCESS,
            payload: true,
          });
        } catch (err) {
          console.log('error in Line 2820');
          console.log(err);
        }
      }
    }
  } catch (err) {
    console.log('catch from saveAnswer !!');
    console.log(err);
  }
};
export const ResetAddAnswerForm = () => ({
  type: propertyTypes.RESET_ADDANSWER_FORMS,
});
// Support
export const fetchSupport = props => async dispatch => {
  console.log('props from fetchSupports Actions', props);
  try {
    console.log('From fetchSupports Action');
    const {IDFound, currentID} = await isPropertyIdFound();
    console.log('HERE FROM isPropertyIdFound()........................');
    console.log({IDFound, currentID});
    if (IDFound) {
      const contactsListRef = firestore().doc(`supports/${currentID}`);
      const contactsList = await contactsListRef.get();
      console.log(' supportsList =====  ', contactsList);
      if (contactsList.exists) {
        let contactsArray = contactsList.data().supports;
        let FinalArray = [];
        for (let i = 0; i < contactsArray.length; i++) {
          if (!contactsArray[i].deletedAt) {
            FinalArray.push(contactsArray[i]);
          }
        }
        dispatch({
          type: propertyTypes.FETCH_SUPPORTS,
          payload: FinalArray,
        });
      } else {
        dispatch({
          type: propertyTypes.FETCH_SUPPORTS,
          payload: null,
        });
      }
    } else {
      const error = 'Something Went Wrong !!';
      dispatch({
        type: propertyTypes.SET_ERRORS,
        payload: error,
      });
    }
  } catch (err) {
    console.log('catch fetchSupports');
    console.log(err);
  }
};
export const saveSupport = (title, description) => async dispatch => {
  let createdAt = new Date();
  let updatedAt = new Date();
  let deletedAt = null;
  const myOb = {
    title,
    description,
    createdAt,
    updatedAt,
    deletedAt,
  };
  console.log('myOb >>>>>>>>>>>>>>>>> ', myOb);
  try {
    console.log('From saveSupport Action');
    const {IDFound, currentID} = await isPropertyIdFound();
    console.log('HERE FROM isPropertyIdFound()........................');
    console.log({IDFound, currentID});
    if (IDFound) {
      const userRef = firestore().doc(`supports/${currentID}`);
      const snapshot = await userRef.get();
      let contacts_array = snapshot.data();
      if (contacts_array) {
        let supports = contacts_array.supports;
        let nb = supports.length;
        supports.push({
          nb,
          title,
          description,
          createdAt,
          updatedAt,
          deletedAt,
        });
        try {
          await userRef.set({supports});
          dispatch({
            type: propertyTypes.ADD_SUPPORT_SUCCESS,
            payload: true,
          });
        } catch (err) {
          console.log('error in Line 2796');
          console.log(err);
        }
      } else {
        try {
          await userRef.set({
            supports: [
              {
                nb: 0,
                title: title,
                description: description,
                createdAt: createdAt,
                updatedAt: updatedAt,
                deletedAt: deletedAt,
              },
            ],
          });
          dispatch({
            type: propertyTypes.ADD_SUPPORT_SUCCESS,
            payload: true,
          });
        } catch (err) {
          console.log('error in Line 2820');
          console.log(err);
        }
      }
    }
  } catch (err) {
    console.log('catch from saveSupport !!');
    console.log(err);
  }
};
export const resetFetchSupport = () => ({
  type: propertyTypes.RESET_FETCH_SUPPORT,
});
export const ResetAddSupportForm = () => ({
  type: propertyTypes.RESET_ADDSUPPORT_FORMS,
});
export const deleteSupport = nb => async dispatch => {
  console.log('nb from delete Support =>', nb);
  try {
    console.log('INsode Try catch deleteSupport');
    const {IDFound, currentID} = await isPropertyIdFound();
    console.log('HERE FROM isPropertyIdFound()........................');
    console.log({IDFound, currentID});
    if (IDFound) {
      const userRef = firestore().doc(`supports/${currentID}`);
      const snapshot = await userRef.get();
      let contacts_array = snapshot.data();
      let supports = contacts_array.supports;
      console.log(supports);
      supports[nb].deletedAt = new Date();
      console.log(supports);
      try {
        await userRef.set({supports});
        dispatch({
          type: propertyTypes.DELETE_SUPPORT_SUCCESS,
          payload: true,
        });
      } catch (err) {
        console.log('error in Line 2865');
        console.log(err);
      }
    }
  } catch (err) {
    console.log('err delete Support');
    console.log(err);
  }
};
export const ResetDeleteSupportForm = () => ({
  type: propertyTypes.RESET_DELETESUPPORT_FORMS,
});
// OTHERS
export const resetAllAuthForms = () => ({
  type: propertyTypes.RESET_AUTH_FORMS,
});
export const ResetErrorsState = () => ({
  type: propertyTypes.RESET_ERRORSSTATE_FORMS,
});
export const ResetStates = () => ({
  type: propertyTypes.RESET_STATES,
});
