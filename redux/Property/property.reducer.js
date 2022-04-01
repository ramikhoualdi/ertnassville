import propertyTypes from './property.types';

const INITIAL_STATE = {
  currentProperty: null,
  propertySignInSuccess: false,
  propertySignUpSuccess: false,
  propertyRecoverySuccess: false,
  // Fetch Property
  fetchPropertyD: null,
  // Access
  fetchAccessD: null,
  addAccessSuccess: false,
  deleteAccessSuccess: false,
  doneAccessSuccess: false,
  // Contact
  fetchContactD: null,
  addContactSuccess: false,
  deleteContactSuccess: false,
  // Description
  fetchDescriptionD: null,
  addDescriptionSuccess: false,
  deleteDescriptionSuccess: false,
  // Document
  fetchDocumentD: null,
  addDocumentSuccess: false,
  deleteDocumentSuccess: false,
  // Elevator
  fetchElevatorD: null,
  addElevatorSuccess: false,
  deleteElevatorSuccess: false,
  doneElevatorSuccess: false,
  // Generator
  fetchGeneratorD: null,
  addGeneratorSuccess: false,
  deleteGeneratorSuccess: false,
  doneGeneratorSuccess: false,
  // LockBox
  fetchLockboxD: null,
  addLockboxSuccess: false,
  deleteLockBoxSuccess: false,
  doneLockBoxSuccess: false,
  // Matterport
  fetchMatterportD: null,
  addMatterportSuccess: false,
  deleteMatterportSuccess: false,
  doneMatterportSuccess: false,
  // Gallery
  fetchPhotoD: null,
  addPhotoSuccess: false,
  deletePhotoSuccess: false,
  // Precaution
  fetchPrecautionD: null,
  addPrecautionSuccess: false,
  deletePrecautionSuccess: false,
  donePrecautionSuccess: false,
  // PreExistingdamage
  fetchPreExistingDamageD: null,
  addPreExistingDamageSuccess: false,
  deletePreExistingDamageSuccess: false,
  donePreExistingDamageSuccess: false,
  // Utility
  fetchUtilityD: null,
  addUtilitySuccess: false,
  deleteUtilitySuccess: false,
  doneUtilitySuccess: false,
  // Question
  fetchQuestionD: null,
  addQuestionSuccess: false,
  addAnswerSuccess: false,
  // Support
  fetchSupportD: null,
  addSupportSuccess: false,
  deleteSupportSuccess: false,
  // Errors
  errors: [],
};

const propertyReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // AUTH
    case propertyTypes.PROPERTY_SIGN_IN_SUCCESS:
      return {
        ...state,
        propertySignInSuccess: action.payload,
      };
    case propertyTypes.PROPERTY_SIGN_UP_SUCCESS:
      return {
        ...state,
        propertySignUpSuccess: action.payload,
      };
    case propertyTypes.PROPERTY_RECOVERY_SUCCESS:
      return {
        ...state,
        propertyRecoverySuccess: action.payload,
      };

    // PROPERTY
    case propertyTypes.SET_CURRENT_PROPERTY:
      return {
        ...state,
        currentProperty: action.payload,
      };
    case propertyTypes.OUT_CURRENT_PROPERTY:
      return {
        ...INITIAL_STATE,
      };
    case propertyTypes.FETCH_PROPERTY:
      return {
        ...state,
        fetchPropertyD: action.payload,
      };

    // ACCESS
    case propertyTypes.FETCH_ACCESS:
      return {
        ...state,
        fetchAccessD: action.payload,
      };
    case propertyTypes.ADD_ACCESS_SUCCESS:
      return {
        ...state,
        addAccessSuccess: action.payload,
      };
    case propertyTypes.DELETE_ACCESS_SUCCESS:
      return {
        ...state,
        deleteAccessSuccess: action.payload,
      };
    case propertyTypes.RESET_ADDACCESS_FORMS:
      return {
        ...state,
        addAccessSuccess: false,
      };
    case propertyTypes.RESET_DELETEACCESS_FORMS:
      return {
        ...state,
        deleteAccessSuccess: false,
      };
    case propertyTypes.DONE_ACCESS_SUCCESS:
      return {
        ...state,
        doneAccessSuccess: action.payload,
      };
    case propertyTypes.RESET_DONE_ACCESS_SUCCESS:
      return {
        ...state,
        doneAccessSuccess: false,
      };
    case propertyTypes.RESET_FETCH_ACCESS:
      return {
        ...state,
        fetchAccessD: null,
      };
    // CONTACT
    case propertyTypes.FETCH_CONTACT:
      return {
        ...state,
        fetchContactD: action.payload,
      };
    case propertyTypes.ADD_CONTACT_SUCCESS:
      return {
        ...state,
        addContactSuccess: action.payload,
      };
    case propertyTypes.DELETE_CONTACT_SUCCESS:
      return {
        ...state,
        deleteContactSuccess: action.payload,
      };
    case propertyTypes.RESET_DELETECONTACT_FORMS:
      return {
        ...state,
        deleteContactSuccess: false,
      };
    case propertyTypes.RESET_ADDCONTACT_FORMS:
      return {
        ...state,
        addContactSuccess: false,
      };
    case propertyTypes.RESET_FETCH_CONTACT:
      return {
        ...state,
        fetchContactD: null,
      };
    // DESCRIPTION
    case propertyTypes.FETCH_DESCRIPTION:
      return {
        ...state,
        fetchDescriptionD: action.payload,
      };
    case propertyTypes.ADD_DESCRIPTION_SUCCESS:
      return {
        ...state,
        addDescriptionSuccess: action.payload,
      };
    case propertyTypes.DELETE_DESCRIPTION_SUCCESS:
      return {
        ...state,
        deleteDescriptionSuccess: action.payload,
      };
    case propertyTypes.RESET_DELETEDESCRIPTION_FORMS:
      return {
        ...state,
        deleteDescriptionSuccess: false,
      };
    case propertyTypes.RESET_ADDDESCRIPTION_FORMS:
      return {
        ...state,
        addDescriptionSuccess: false,
      };
    case propertyTypes.RESET_FETCH_DESCRIPTION:
      return {
        ...state,
        fetchDescriptionD: null,
      };
    // DOCUMENT
    case propertyTypes.FETCH_DOCUMENT:
      return {
        ...state,
        fetchDocumentD: action.payload,
      };
    case propertyTypes.ADD_DOCUMENT_SUCCESS:
      return {
        ...state,
        addDocumentSuccess: action.payload,
      };
    case propertyTypes.DELETE_DOCUMENT_SUCCESS:
      return {
        ...state,
        deleteDocumentSuccess: action.payload,
      };
    case propertyTypes.RESET_ADDDOCUMENT_FORMS:
      return {
        ...state,
        addDocumentSuccess: false,
      };
    case propertyTypes.RESET_DELETEDOCUMENT_FORMS:
      return {
        ...state,
        deleteDocumentSuccess: false,
      };
    case propertyTypes.RESET_FETCH_DOCUMENT:
      return {
        ...state,
        fetchDocumentD: null,
      };
    // ELEVATOR
    case propertyTypes.FETCH_ELEVATOR:
      return {
        ...state,
        fetchElevatorD: action.payload,
      };
    case propertyTypes.ADD_ELEVATOR_SUCCESS:
      return {
        ...state,
        addElevatorSuccess: action.payload,
      };
    case propertyTypes.DELETE_ELEVATOR_SUCCESS:
      return {
        ...state,
        deleteElevatorSuccess: action.payload,
      };
    case propertyTypes.RESET_ADDELEVATOR_FORMS:
      return {
        ...state,
        addElevatorSuccess: false,
      };
    case propertyTypes.RESET_DELETEELEVATOR_FORMS:
      return {
        ...state,
        deleteElevatorSuccess: false,
      };
    case propertyTypes.DONE_ELEVATOR_SUCCESS:
      return {
        ...state,
        doneElevatorSuccess: action.payload,
      };
    case propertyTypes.RESET_DONE_ELEVATOR_SUCCESS:
      return {
        ...state,
        doneElevatorSuccess: false,
      };
    case propertyTypes.RESET_FETCH_ELEVATOR:
      return {
        ...state,
        fetchElevatorD: null,
      };
    // GENERATOR
    case propertyTypes.FETCH_GENERATOR:
      return {
        ...state,
        fetchGeneratorD: action.payload,
      };
    case propertyTypes.ADD_GENERATOR_SUCCESS:
      return {
        ...state,
        addGeneratorSuccess: action.payload,
      };
    case propertyTypes.DELETE_GENERATOR_SUCCESS:
      return {
        ...state,
        deleteGeneratorSuccess: action.payload,
      };
    case propertyTypes.RESET_ADDGENERATOR_FORMS:
      return {
        ...state,
        addGeneratorSuccess: false,
      };
    case propertyTypes.RESET_DELETEGENERATOR_FORMS:
      return {
        ...state,
        deleteGeneratorSuccess: false,
      };
    case propertyTypes.DONE_GENERATOR_SUCCESS:
      return {
        ...state,
        doneGeneratorSuccess: action.payload,
      };
    case propertyTypes.RESET_DONE_GENERATOR_SUCCESS:
      return {
        ...state,
        doneGeneratorSuccess: false,
      };
    case propertyTypes.RESET_FETCH_GENERATOR:
      return {
        ...state,
        fetchGeneratorD: null,
      };
    // LOCKBOX
    case propertyTypes.FETCH_LOCKBOX:
      return {
        ...state,
        fetchLockboxD: action.payload,
      };
    case propertyTypes.ADD_LOCKBOX_SUCCESS:
      return {
        ...state,
        addLockboxSuccess: action.payload,
      };
    case propertyTypes.DELETE_LOCKBOX_SUCCESS:
      return {
        ...state,
        deleteLockBoxSuccess: action.payload,
      };
    case propertyTypes.RESET_ADDLOCKBOX_FORMS:
      return {
        ...state,
        addLockboxSuccess: false,
      };
    case propertyTypes.RESET_DELETELOCKBOX_FORMS:
      return {
        ...state,
        deleteLockBoxSuccess: false,
      };
    case propertyTypes.DONE_LOCKBOX_SUCCESS:
      return {
        ...state,
        doneLockBoxSuccess: action.payload,
      };
    case propertyTypes.RESET_DONE_LOCKBOX_SUCCESS:
      return {
        ...state,
        doneLockBoxSuccess: false,
      };
    case propertyTypes.RESET_FETCH_LOCKBOX:
      return {
        ...state,
        fetchLockboxD: null,
      };
    // MATTERPORT
    case propertyTypes.FETCH_MATTERPORT:
      return {
        ...state,
        fetchMatterportD: action.payload,
      };
    case propertyTypes.ADD_MATTERPORT_SUCCESS:
      return {
        ...state,
        addMatterportSuccess: action.payload,
      };
    case propertyTypes.DELETE_MATTERPORT_SUCCESS:
      return {
        ...state,
        deleteMatterportSuccess: action.payload,
      };
    case propertyTypes.RESET_DELETEMATTERPORT_FORMS:
      return {
        ...state,
        deleteMatterportSuccess: false,
      };
    case propertyTypes.DONE_MATTERPORT_SUCCESS:
      return {
        ...state,
        doneMatterportSuccess: action.payload,
      };
    case propertyTypes.RESET_DONE_MATTERPORT_SUCCESS:
      return {
        ...state,
        doneMatterportSuccess: false,
      };
    case propertyTypes.RESET_ADDMATTERPORT_FORMS:
      return {
        ...state,
        addMatterportSuccess: false,
      };
    case propertyTypes.RESET_FETCH_MATTERPORT:
      return {
        ...state,
        fetchMatterportD: null,
      };
    // PHOTO
    case propertyTypes.FETCH_PHOTO:
      return {
        ...state,
        fetchPhotoD: action.payload,
      };
    case propertyTypes.ADD_PHOTO_SUCCESS:
      return {
        ...state,
        addPhotoSuccess: action.payload,
      };
    case propertyTypes.DELETE_PHOTO_SUCCESS:
      return {
        ...state,
        deletePhotoSuccess: action.payload,
      };
    case propertyTypes.RESET_DELETEPHOTO_FORMS:
      return {
        ...state,
        deletePhotoSuccess: false,
      };
    case propertyTypes.RESET_ADDPHOTO_FORMS:
      return {
        ...state,
        addPhotoSuccess: false,
      };
    case propertyTypes.RESET_FETCH_PHOTO:
      return {
        ...state,
        fetchPhotoD: null,
      };
    // PRECAUTION
    case propertyTypes.FETCH_PRECAUTION:
      return {
        ...state,
        fetchPrecautionD: action.payload,
      };
    case propertyTypes.ADD_PRECAUTION_SUCCESS:
      return {
        ...state,
        addPrecautionSuccess: action.payload,
      };
    case propertyTypes.DELETE_PRECAUTION_SUCCESS:
      return {
        ...state,
        deletePrecautionSuccess: action.payload,
      };
    case propertyTypes.RESET_ADDPRECAUTION_FORMS:
      return {
        ...state,
        addPrecautionSuccess: false,
      };
    case propertyTypes.RESET_DELETEPRECAUTION_FORMS:
      return {
        ...state,
        deletePrecautionSuccess: false,
      };
    case propertyTypes.DONE_PRECAUTION_SUCCESS:
      return {
        ...state,
        donePrecautionSuccess: action.payload,
      };
    case propertyTypes.RESET_DONE_PRECAUTION_SUCCESS:
      return {
        ...state,
        donePrecautionSuccess: false,
      };
    case propertyTypes.RESET_FETCH_PRECAUTION:
      return {
        ...state,
        fetchPrecautionD: null,
      };
    // PREEXISTINGDAMAGE
    case propertyTypes.FETCH_PREEXISTINGDAMAGE:
      return {
        ...state,
        fetchPreExistingDamageD: action.payload,
      };
    case propertyTypes.ADD_PREEXISTINGDAMAGE_SUCCESS:
      return {
        ...state,
        addPreExistingDamageSuccess: action.payload,
      };
    case propertyTypes.DELETE_PREEXISTINGDAMAGE_SUCCESS:
      return {
        ...state,
        deletePreExistingDamageSuccess: action.payload,
      };
    case propertyTypes.RESET_ADDPREEXISTINGDAMAGE_FORMS:
      return {
        ...state,
        addPreExistingDamageSuccess: false,
      };
    case propertyTypes.RESET_DELETEPREEXISTINGDAMAGE_FORMS:
      return {
        ...state,
        deletePreExistingDamageSuccess: false,
      };
    case propertyTypes.DONE_PREEXISTINGDAMAGE_SUCCESS:
      return {
        ...state,
        donePreExistingDamageSuccess: action.payload,
      };
    case propertyTypes.RESET_DONE_PREEXISTINGDAMAGE_SUCCESS:
      return {
        ...state,
        donePreExistingDamageSuccess: false,
      };
    case propertyTypes.RESET_FETCH_PREEXISTINGDAMAGE:
      return {
        ...state,
        fetchPreExistingDamageD: null,
      };
    // UTILITY
    case propertyTypes.FETCH_UTILITY:
      return {
        ...state,
        fetchUtilityD: action.payload,
      };
    case propertyTypes.ADD_UTILITY_SUCCESS:
      return {
        ...state,
        addUtilitySuccess: action.payload,
      };
    case propertyTypes.DELETE_UTILITY_SUCCESS:
      return {
        ...state,
        deleteUtilitySuccess: action.payload,
      };
    case propertyTypes.RESET_ADDUTILITY_FORMS:
      return {
        ...state,
        addUtilitySuccess: false,
      };
    case propertyTypes.RESET_DELETEUTILITY_FORMS:
      return {
        ...state,
        deleteUtilitySuccess: false,
      };
    case propertyTypes.DONE_UTILITY_SUCCESS:
      return {
        ...state,
        doneUtilitySuccess: action.payload,
      };
    case propertyTypes.RESET_DONE_UTILITY_SUCCESS:
      return {
        ...state,
        doneUtilitySuccess: false,
      };
    case propertyTypes.RESET_FETCH_UTILITY:
      return {
        ...state,
        fetchUtilityD: null,
      };
    // Question
    case propertyTypes.FETCH_QUESTIONS:
      return {
        ...state,
        fetchQuestionD: action.payload,
      };
    case propertyTypes.ADD_QUESTION_SUCCESS:
      return {
        ...state,
        addQuestionSuccess: action.payload,
      };
    case propertyTypes.RESET_FETCH_QUESTION:
      return {
        ...state,
        fetchQuestionD: null,
      };
    case propertyTypes.RESET_ADDQUESTION_FORMS:
      return {
        ...state,
        addQuestionSuccess: false,
      };
    case propertyTypes.ADD_ANSWER_SUCCESS:
      return {
        ...state,
        addAnswerSuccess: action.payload,
      };
    case propertyTypes.RESET_ADDANSWER_FORMS:
      return {
        ...state,
        addAnswerSuccess: false,
      };
    // Support
    case propertyTypes.FETCH_SUPPORTS:
      return {
        ...state,
        fetchSupportD: action.payload,
      };
    case propertyTypes.ADD_SUPPORT_SUCCESS:
      return {
        ...state,
        addSupportSuccess: action.payload,
      };
    case propertyTypes.RESET_FETCH_SUPPORT:
      return {
        ...state,
        fetchSupportD: null,
      };
    case propertyTypes.RESET_ADDSUPPORT_FORMS:
      return {
        ...state,
        addSupportSuccess: false,
      };
    case propertyTypes.DELETE_SUPPORT_SUCCESS:
      return {
        ...state,
        deleteSupportSuccess: true,
      };
    case propertyTypes.RESET_DELETESUPPORT_FORMS:
      return {
        ...state,
        deleteSupportSuccess: false,
      };
    // ERRORS
    case propertyTypes.RESET_ERRORSSTATE_FORMS:
      return {
        ...state,
        errors: [],
      };
    case propertyTypes.SET_ERRORS:
      return {
        ...state,
        errors: action.payload,
      };
    case propertyTypes.RESET_STATES:
      return {
        propertySignInSuccess: false,
        propertySignUpSuccess: false,
        propertyRecoverySuccess: false,
        // Access
        fetchAccessD: null,
        addAccessSuccess: false,
        deleteAccessSuccess: false,
        doneAccessSuccess: false,
        // Contact
        fetchContactD: null,
        addContactSuccess: false,
        deleteContactSuccess: false,
        // Description
        fetchDescriptionD: null,
        addDescriptionSuccess: false,
        deleteDescriptionSuccess: false,
        // Document
        fetchDocumentD: null,
        addDocumentSuccess: false,
        deleteDocumentSuccess: false,
        // Elevator
        fetchElevatorD: null,
        addElevatorSuccess: false,
        deleteElevatorSuccess: false,
        doneElevatorSuccess: false,
        // Generator
        fetchGeneratorD: null,
        addGeneratorSuccess: false,
        deleteGeneratorSuccess: false,
        doneGeneratorSuccess: false,
        // LockBox
        fetchLockboxD: null,
        addLockboxSuccess: false,
        deleteLockBoxSuccess: false,
        doneLockBoxSuccess: false,
        // Matterport
        fetchMatterportD: null,
        addMatterportSuccess: false,
        deleteMatterportSuccess: false,
        doneMatterportSuccess: false,
        // Gallery
        fetchPhotoD: null,
        addPhotoSuccess: false,
        deletePhotoSuccess: false,
        // Precaution
        fetchPrecautionD: null,
        addPrecautionSuccess: false,
        deletePrecautionSuccess: false,
        donePrecautionSuccess: false,
        // PreExistingdamage
        fetchPreExistingDamageD: null,
        addPreExistingDamageSuccess: false,
        deletePreExistingDamageSuccess: false,
        donePreExistingDamageSuccess: false,
        // Utility
        fetchUtilityD: null,
        addUtilitySuccess: false,
        deleteUtilitySuccess: false,
        doneUtilitySuccess: false,
        // Errors
        errors: [],
      };
    // DEFAULT
    default:
      return state;
  }
};
export default propertyReducer;
