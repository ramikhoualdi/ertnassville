import userTypes from './user.types';

const INITIAL_STATE = {
  fetchPropertyD: null,
  fetchAccessD: null,
  fetchContactD: null,
  fetchDescriptionD: null,
  fetchDocumentD: null,
  fetchElevatorD: null,
  fetchGeneratorD: null,
  fetchLockboxD: null,
  fetchMatterportD: null,
  fetchPhotoD: null,
  fetchPrecautionD: null,
  fetchPreExistingDamageD: null,
  fetchUtilityD: null,
  fetchQuestionD: null,
  addAnswerSuccess: false,
  fetchSupportD: null,
  errors: [],
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //   Property
    case userTypes.FETCH_PROPERTY:
      return {
        ...state,
        fetchPropertyD: action.payload,
      };
    //   Access
    case userTypes.FETCH_ACCESS:
      return {
        ...state,
        fetchAccessD: action.payload,
      };
    case userTypes.RESET_FETCH_ACCESS:
      return {
        ...state,
        fetchAccessD: null,
      };
    //   Contact
    case userTypes.FETCH_CONTACT:
      return {
        ...state,
        fetchContactD: action.payload,
      };
    case userTypes.RESET_FETCH_CONTACT:
      return {
        ...state,
        fetchContactD: null,
      };
    //   Description
    case userTypes.FETCH_DESCRIPTION:
      return {
        ...state,
        fetchDescriptionD: action.payload,
      };
    case userTypes.RESET_FETCH_DESCRIPTION:
      return {
        ...state,
        fetchDescriptionD: null,
      };
    //   Document
    case userTypes.FETCH_DOCUMENT:
      return {
        ...state,
        fetchDocumentD: action.payload,
      };
    case userTypes.RESET_FETCH_DOCUMENT:
      return {
        ...state,
        fetchDocumentD: null,
      };
    //   Elevator
    case userTypes.FETCH_ELEVATOR:
      return {
        ...state,
        fetchElevatorD: action.payload,
      };
    case userTypes.RESET_FETCH_ELEVATOR:
      return {
        ...state,
        fetchElevatorD: null,
      };
    //   Generator
    case userTypes.FETCH_GENERATOR:
      return {
        ...state,
        fetchGeneratorD: action.payload,
      };
    case userTypes.RESET_FETCH_GENERATOR:
      return {
        ...state,
        fetchGeneratorD: null,
      };
    //   Lockbox
    case userTypes.FETCH_LOCKBOX:
      return {
        ...state,
        fetchLockboxD: action.payload,
      };
    case userTypes.RESET_FETCH_LOCKBOX:
      return {
        ...state,
        fetchLockboxD: null,
      };
    //   Matterport
    case userTypes.FETCH_MATTERPORT:
      return {
        ...state,
        fetchMatterportD: action.payload,
      };
    case userTypes.RESET_FETCH_MATTERPORT:
      return {
        ...state,
        fetchMatterportD: null,
      };
    //   Photo
    case userTypes.FETCH_PHOTO:
      return {
        ...state,
        fetchPhotoD: action.payload,
      };
    case userTypes.RESET_FETCH_PHOTO:
      return {
        ...state,
        fetchPhotoD: null,
      };
    //   Precaution
    case userTypes.FETCH_PRECAUTION:
      return {
        ...state,
        fetchPrecautionD: action.payload,
      };
    case userTypes.RESET_FETCH_PRECAUTION:
      return {
        ...state,
        fetchPrecautionD: null,
      };
    //   PreExistingDamage
    case userTypes.FETCH_PREEXISTINGDAMAGE:
      return {
        ...state,
        fetchPreExistingDamageD: action.payload,
      };
    case userTypes.RESET_FETCH_PREEXISTINGDAMAGE:
      return {
        ...state,
        fetchPreExistingDamageD: null,
      };
    //   Utility
    case userTypes.FETCH_UTILITY:
      return {
        ...state,
        fetchUtilityD: action.payload,
      };
    case userTypes.RESET_FETCH_UTILITY:
      return {
        ...state,
        fetchUtilityD: null,
      };
    // Question
    case userTypes.FETCH_QUESTION:
      return {
        ...state,
        fetchQuestionD: action.payload,
      };
    case userTypes.ADD_ANSWER_SUCCESS:
      return {
        ...state,
        addAnswerSuccess: action.payload,
      };
    case userTypes.RESET_ADDANSWER_FORMS:
      return {
        ...state,
        addAnswerSuccess: false,
      };
    case userTypes.RESET_FETCH_QUESTION:
      return {
        ...state,
        fetchQuestionD: null,
      };
    // Support
    case userTypes.FETCH_SUPPORT:
      return {
        ...state,
        fetchSupportD: action.payload,
      };
    case userTypes.RESET_FETCH_SUPPORT:
      return {
        ...state,
        fetchSupportD: null,
      };
    //   Reset Fetch
    case userTypes.RESET_FETCH_ALL:
      return {
        ...state,
        fetchPropertyD: null,
        fetchAccessD: null,
        fetchContactD: null,
        fetchDescriptionD: null,
        fetchDocumentD: null,
        fetchElevatorD: null,
        fetchGeneratorD: null,
        fetchLockboxD: null,
        fetchMatterportD: null,
        fetchPhotoD: null,
        fetchPrecautionD: null,
        fetchPreExistingDamageD: null,
        fetchUtilityD: null,
        fetchQuestionD: null,
        addAnswerSuccess: false,
        fetchSupportD: null,
        errors: [],
      };
    // Errors
    case userTypes.SET_ERRORS:
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
};
export default userReducer;
