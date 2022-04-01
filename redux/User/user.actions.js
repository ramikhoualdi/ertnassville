import userTypes from './user.types';
import {firestore} from '../../firebase/utils';

// PreFix Function
const isPropertyIdFound = async id => {
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

// PROPERTY
export const fetchProperty = props => async dispatch => {
  try {
    console.log('From fetchContact Action');
    console.log('HERE FROM isPropertyIdFound()........................', props);
    const {IDFound, currentID} = await isPropertyIdFound(props);
    console.log({IDFound, currentID});
    if (IDFound) {
      const contactsListRef = firestore().doc(`property/${currentID}`);
      const contactsList = await contactsListRef.get();
      const contactsArray = contactsList.data();
      dispatch({
        type: userTypes.FETCH_PROPERTY,
        payload: contactsArray,
      });
    } else {
      const error = 'Something Went Wrong !!';
      dispatch({
        type: userTypes.SET_ERRORS,
        payload: error,
      });
    }
  } catch (err) {
    console.log('error from fetchProperty catch !!');
    console.log(err);
  }
};
// ACCESS
export const fetchAccess = props => async dispatch => {
  console.log('props from fetchAccess Actions', props);
  try {
    console.log('From fetchAccess Action');
    const {IDFound, currentID} = await isPropertyIdFound(props);
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
          type: userTypes.FETCH_ACCESS,
          payload: FinalArray,
        });
      } else {
        dispatch({
          type: userTypes.FETCH_ACCESS,
          payload: null,
        });
      }
    } else {
      const error = 'Something Went Wrong !!';
      dispatch({
        type: userTypes.SET_ERRORS,
        payload: error,
      });
    }
  } catch (err) {
    console.log('catch fetchAccess');
    console.log(err);
  }
};
// CONTACT
export const fetchContact = props => async dispatch => {
  try {
    console.log('From fetchContact Action');
    const {IDFound, currentID} = await isPropertyIdFound(props);
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
          type: userTypes.FETCH_CONTACT,
          payload: FinalArray,
        });
      } else {
        dispatch({
          type: userTypes.FETCH_CONTACT,
          payload: null,
        });
      }
    } else {
      const error = 'Something Went Wrong !!';
      dispatch({
        type: userTypes.SET_ERRORS,
        payload: error,
      });
    }
    //  Get Associate ID
  } catch (err) {
    console.log('error from fetchContact catch !!');
    console.log(err);
  }
};
// DESCRIPTION
export const fetchDescription = props => async dispatch => {
  try {
    console.log('From fetchDescription Action');
    const {IDFound, currentID} = await isPropertyIdFound(props);
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
          type: userTypes.FETCH_DESCRIPTION,
          payload: FinalArray,
        });
      } else {
        dispatch({
          type: userTypes.FETCH_DESCRIPTION,
          payload: null,
        });
      }
    } else {
      const error = 'Something Went Wrong !!';
      dispatch({
        type: userTypes.SET_ERRORS,
        payload: error,
      });
    }
    //  Get Associate ID
  } catch (err) {
    console.log('catch first try catch fetchDescription');
    console.log(err);
  }
};
// DOCUMENT
export const fetchDocument = props => async dispatch => {
  try {
    console.log('From fetchDocument Action');
    const {IDFound, currentID} = await isPropertyIdFound(props);
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
          type: userTypes.FETCH_DOCUMENT,
          payload: FinalArray,
        });
      } else {
        dispatch({
          type: userTypes.FETCH_DOCUMENT,
          payload: null,
        });
      }
    } else {
      const error = 'Something Went Wrong !!';
      dispatch({
        type: userTypes.SET_ERRORS,
        payload: error,
      });
    }
    //  Get Associate ID
  } catch (err) {
    console.log('error from fetchDocument catch !!');
    console.log(err);
  }
};
// ELEVATOR
export const fetchElevator = props => async dispatch => {
  console.log('props from fetchElevators Actions', props);
  try {
    console.log('From fetchElevator Action');
    const {IDFound, currentID} = await isPropertyIdFound(props);
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
          type: userTypes.FETCH_ELEVATOR,
          payload: FinalArray,
        });
      } else {
        dispatch({
          type: userTypes.FETCH_ELEVATOR,
          payload: null,
        });
      }
    } else {
      const error = 'Something Went Wrong !!';
      dispatch({
        type: userTypes.SET_ERRORS,
        payload: error,
      });
    }
  } catch (err) {
    console.log('');
    console.log(err);
  }
};
// GENERATOR
export const fetchGenerator = props => async dispatch => {
  console.log('props from fetchGenerator Actions', props);
  try {
    console.log('From fetchGenerator Action');
    const {IDFound, currentID} = await isPropertyIdFound(props);
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
          type: userTypes.FETCH_GENERATOR,
          payload: FinalArray,
        });
      } else {
        dispatch({
          type: userTypes.FETCH_GENERATOR,
          payload: null,
        });
      }
    } else {
      const error = 'Something Went Wrong !!';
      dispatch({
        type: userTypes.SET_ERRORS,
        payload: error,
      });
    }
  } catch (err) {
    console.log('catch fetchGenerator');
    console.log(err);
  }
};
// LOCKBOX
export const fetchLockbox = props => async dispatch => {
  console.log('props from fetchLockBox Actions', props);
  try {
    console.log('From fetchLockBox Action');
    const {IDFound, currentID} = await isPropertyIdFound(props);
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
          type: userTypes.FETCH_LOCKBOX,
          payload: FinalArray,
        });
      } else {
        dispatch({
          type: userTypes.FETCH_LOCKBOX,
          payload: null,
        });
      }
    } else {
      const error = 'Something Went Wrong !!';
      dispatch({
        type: userTypes.SET_ERRORS,
        payload: error,
      });
    }
  } catch (err) {
    console.log('catch fetchLockbox');
    console.log(err);
  }
};
// MATTERPORT
export const fetchMatterport = props => async dispatch => {
  console.log('props from fetchMatterport Actions', props);
  try {
    console.log('From fetchMatterport Action');
    const {IDFound, currentID} = await isPropertyIdFound(props);
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
          type: userTypes.FETCH_MATTERPORT,
          payload: FinalArray,
        });
      } else {
        dispatch({
          type: userTypes.FETCH_MATTERPORT,
          payload: null,
        });
      }
    } else {
      const error = 'Something Went Wrong !!';
      dispatch({
        type: userTypes.SET_ERRORS,
        payload: error,
      });
    }
  } catch (err) {
    console.log('catch fetchMatterport');
    console.log(err);
  }
};
// GALLERY
export const fetchPhoto = props => async dispatch => {
  try {
    console.log('From fetchGallery Action');
    const {IDFound, currentID} = await isPropertyIdFound(props);
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
          type: userTypes.FETCH_PHOTO,
          payload: FinalArray,
        });
      } else {
        dispatch({
          type: userTypes.FETCH_PHOTO,
          payload: null,
        });
      }
    } else {
      const error = 'Something Went Wrong !!';
      dispatch({
        type: userTypes.SET_ERRORS,
        payload: error,
      });
    }
    //  Get Associate ID
  } catch (err) {
    console.log('error from fetchPhoto catch !!');
    console.log(err);
  }
};
// PRECAUTION
export const fetchPrecaution = props => async dispatch => {
  console.log('props from fetchPrecaution Actions', props);
  try {
    console.log('From fetchPrecaution Action');
    const {IDFound, currentID} = await isPropertyIdFound(props);
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
          type: userTypes.FETCH_PRECAUTION,
          payload: FinalArray,
        });
      } else {
        dispatch({
          type: userTypes.FETCH_PRECAUTION,
          payload: null,
        });
      }
    } else {
      const error = 'Something Went Wrong !!';
      dispatch({
        type: userTypes.SET_ERRORS,
        payload: error,
      });
    }
  } catch (err) {
    console.log('catch fetchPrecaution');
    console.log(err);
  }
};
// PREEXISTINGDAMAGE
export const fetchPreExistingDamage = props => async dispatch => {
  console.log('props from fetchPreExistingDamage Actions', props);
  try {
    console.log('From fetchPreExistingDamage Action');
    const {IDFound, currentID} = await isPropertyIdFound(props);
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
          type: userTypes.FETCH_PREEXISTINGDAMAGE,
          payload: FinalArray,
        });
      } else {
        dispatch({
          type: userTypes.FETCH_PREEXISTINGDAMAGE,
          payload: null,
        });
      }
    } else {
      const error = 'Something Went Wrong !!';
      dispatch({
        type: userTypes.SET_ERRORS,
        payload: error,
      });
    }
  } catch (err) {
    console.log('catch fetchPreExistingDamage');
    console.log(err);
  }
};
// UTILITY
export const fetchUtility = props => async dispatch => {
  console.log('props from fetchUtility Actions', props);
  try {
    console.log('From fetchUtility Action');
    const {IDFound, currentID} = await isPropertyIdFound(props);
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
          type: userTypes.FETCH_UTILITY,
          payload: FinalArray,
        });
      } else {
        dispatch({
          type: userTypes.FETCH_UTILITY,
          payload: null,
        });
      }
    } else {
      const error = 'Something Went Wrong !!';
      dispatch({
        type: userTypes.SET_ERRORS,
        payload: error,
      });
    }
  } catch (err) {
    console.log('catch fetchUtility');
    console.log(err);
  }
};
export const fetchQuestion = props => async dispatch => {
  console.log('props from fetchQuestions Actions', props);
  try {
    console.log('From fetchQuestions Action');
    const {IDFound, currentID} = await isPropertyIdFound(props);
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
          type: userTypes.FETCH_QUESTION,
          payload: FinalArray,
        });
      } else {
        dispatch({
          type: userTypes.FETCH_QUESTION,
          payload: null,
        });
      }
    } else {
      const error = 'Something Went Wrong !!';
      dispatch({
        type: userTypes.SET_ERRORS,
        payload: error,
      });
    }
  } catch (err) {
    console.log('catch fetchQuestions');
    console.log(err);
  }
};
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
    const {IDFound, currentID} = await isPropertyIdFound(propertyId);
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
            type: userTypes.ADD_ANSWER_SUCCESS,
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
            type: userTypes.ADD_ANSWER_SUCCESS,
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
  type: userTypes.RESET_ADDANSWER_FORMS,
});
export const fetchSupport = props => async dispatch => {
  console.log('props from fetchSupports Actions', props);
  try {
    console.log('From fetchSupports Action');
    const {IDFound, currentID} = await isPropertyIdFound(props);
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
          type: userTypes.FETCH_SUPPORT,
          payload: FinalArray,
        });
      } else {
        dispatch({
          type: userTypes.FETCH_SUPPORT,
          payload: null,
        });
      }
    } else {
      const error = 'Something Went Wrong !!';
      dispatch({
        type: userTypes.SET_ERRORS,
        payload: error,
      });
    }
  } catch (err) {
    console.log('catch fetchSupports');
    console.log(err);
  }
};
export const resetFetchAll = () => ({
  type: userTypes.RESET_FETCH_ALL,
});
