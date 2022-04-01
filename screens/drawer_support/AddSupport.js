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
  saveSupport,
  ResetAddSupportForm,
  resetFetchSupport,
  ResetDeleteSupportForm,
} from '../../redux/Property/property.actions';

const mapState = ({property}) => ({
  addSupportSuccess: property.addSupportSuccess,
  errors: property.errors,
});

const AddSupport = ({navigation}) => {
  console.log('AddSupport screen !');
  const dispatch = useDispatch();
  const {addSupportSuccess, errors} = useSelector(mapState);
  console.log(
    'addSupportSuccess =>    ',
    addSupportSuccess,
    'errors  =>  ',
    errors,
  );

  // Storing data
  const [title, onChangeTitle] = useState('');
  const [description, onChangeDescription] = useState('');
  const [titleErrors, onChangeTitleError] = useState('');
  const [descriptionErrors, onChangeDescriptionError] = useState('');

  useEffect(() => {
    console.log('UseEffect');
    if (addSupportSuccess) {
      console.log('Inside Line 52');
      dispatch(ResetDeleteSupportForm());
      dispatch(ResetAddSupportForm());
      dispatch(resetFetchSupport());
      navigation.navigate('PropertyHome');
    }
  }, [addSupportSuccess]);

  const handleRegister = () => {
    console.log('handleRegister Clicked !!');
    let checked = 'true';
    if (title.length == 0) {
      checked = 'false';
      onChangeTitleError('* Title Required!');
    }
    if (description.length == 0) {
      checked = 'false';
      onChangeDescriptionError('* Description Required!');
    }
    if (checked == 'true') {
      console.log('Inputs Valid !!!!');
      console.log({title, description});
      dispatch(saveSupport(title, description));
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
          <Text style={styles.headerText1}>Add Support</Text>
        </View>
        <View style={styles.content}>
          {/* Name */}
          <View style={styles.inputField}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeTitle}
              value={title}
              placeholder="Name"
              maxLength={50}
              placeholderTextColor={'grey'}
            />
            <Text style={styles.fieldErrors}>{titleErrors}</Text>
          </View>
          {/* Description */}
          <View style={styles.inputField}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeDescription}
              value={description}
              placeholder="Description"
              maxLength={50}
              placeholderTextColor={'grey'}
            />
            <Text style={styles.fieldErrors}>{descriptionErrors}</Text>
          </View>

          <TouchableOpacity style={styles.button1} onPress={handleRegister}>
            <Text style={styles.signup}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddSupport;

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
  fieldErrors: {
    marginVertical: 3,
    color: COLORS.redColor,
    fontSize: 12,
  },
  button1: {
    marginBottom: 20,
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
});
