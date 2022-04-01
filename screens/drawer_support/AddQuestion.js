import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather';
import {COLORS} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {
  saveQuestion,
  ResetAddQuestionForm,
  resetFetchQuestion,
} from '../../redux/Property/property.actions';

const mapState = ({property}) => ({
  addQuestionSuccess: property.addQuestionSuccess,
  errors: property.errors,
});

const AddQuestion = ({navigation}) => {
  console.log('AddQuestion screen !');
  const dispatch = useDispatch();
  const {addQuestionSuccess, errors} = useSelector(mapState);
  console.log(
    'addQuestionSuccess =>    ',
    addQuestionSuccess,
    'errors  =>  ',
    errors,
  );
  const [question, onChangeQuestion] = useState('');
  const [questionErrors, onChangeQuestionError] = useState('');

  useEffect(() => {
    console.log('UseEffect');
    if (addQuestionSuccess) {
      console.log('Inside Line 52');
      dispatch(ResetAddQuestionForm());
      dispatch(resetFetchQuestion());
      navigation.navigate('PropertyHome');
    }
  }, [addQuestionSuccess]);

  const handleRegister = () => {
    console.log('handleRegister Clicked !!');
    let checked = 'true';
    if (question.length == 0) {
      checked = 'false';
      onChangeQuestionError('* Title Required!');
    }
    if (checked == 'true') {
      console.log('Inputs Valid !!!!');
      console.log({question});
      dispatch(saveQuestion(question));
      console.log('data send to users actions Success !!');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <IconFeather
            name="arrow-left"
            size={25}
            color={COLORS.greyColor}
            style={styles.icon_style}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={styles.headerTitle}>
          <Text style={styles.headerText1}>Add Question</Text>
        </View>
        <View style={styles.content}>
          {/* Question */}
          <View style={styles.inputField}>
            <Text style={styles.label}>Question</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeQuestion}
              value={question}
              placeholder="Question"
              maxLength={50}
              placeholderTextColor={'grey'}
            />
            <Text style={styles.fieldErrors}>{questionErrors}</Text>
          </View>
          <TouchableOpacity style={styles.button1} onPress={handleRegister}>
            <Text style={styles.signup}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddQuestion;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    color: COLORS.main,
    backgroundColor: COLORS.whiteColor,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  icon_style: {
    flex: 0.45,
    padding: 20,
    marginTop: 30,
  },
  headerTitle: {
    paddingVertical: 10,
  },
  textType2: {
    color: 'black',
    fontSize: 14,
    marginVertical: 5,
  },
  headerText: {
    color: COLORS.greyColor,
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 0,
    lineHeight: 20,
  },
  headerText1: {
    color: 'black',
    textAlign: 'center',
    fontSize: 28,
    textTransform: 'uppercase',
    marginBottom: 25,
  },
  content: {
    paddingHorizontal: 40,
    marginTop: 0,
  },
  emptyPhoto: {
    width: 300,
    height: 150,
    borderRadius: 25,
    zIndex: 100,
    transform: [{scale: 1.1}],
    marginBottom: 15,
    overflow: 'hidden',
  },
  circle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circlePhoto: {
    borderRadius: 25,
    width: 300,
    height: 150,
    // backgroundColor: COLORS.blue2Color,
    backgroundColor: 'transparent',
    borderColor: COLORS.darkgray,
    borderWidth: 0,
    overflow: 'hidden',
  },
  inputField: {
    paddingTop: 0,
    padding: 5,
    width: '100%',
  },
  label: {
    textAlign: 'left',
    fontSize: 16,
    color: COLORS.greyColor,
    marginBottom: 10,
  },
  privacy: {
    textAlign: 'left',
    fontSize: 12,
    color: 'white',
    // marginBottom: 10,
  },
  label1: {
    textAlign: 'left',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.3,
    color: COLORS.greyColor,
    marginBottom: 10,
  },
  label2: {
    textAlign: 'left',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.3,
    color: COLORS.blueColor,
    textDecorationStyle: 'solid',
    textDecorationColor: COLORS.greyColor,
    marginBottom: 10,
  },
  fieldErrors: {
    marginVertical: 3,
    color: COLORS.redColor,
    fontSize: 12,
  },
  input: {
    borderRadius: 10,
    fontSize: 14,
    color: COLORS.darkgray,
    borderWidth: 1,
    borderColor: COLORS.greyColor,
    backgroundColor: COLORS.whiteColor,
    paddingVertical: 10,
    paddingLeft: 20,
    width: '100%',
  },
  descriptionStyle: {
    paddingRight: 20,
  },
  passwordField: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  eyeIcon: {
    position: 'absolute',
    right: 20,
    fontSize: 25,
  },
  terms: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 10,
  },
  signup: {
    backgroundColor: COLORS.blue2Color,
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
    paddingVertical: 15,
    borderRadius: 10,
    // marginVertical: 20,
  },
  button1: {
    marginBottom: 20,
  },
  errors: {
    paddingVertical: 10,
  },
  error: {
    color: 'red',
    fontSize: 18,
    fontWeight: '600',
  },
  already: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
});
