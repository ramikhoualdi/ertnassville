import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../constants';
import {FloatingAction} from 'react-native-floating-action';
import {useSelector, useDispatch} from 'react-redux';
import {
  fetchQuestions,
  fetchProperty,
  ResetAddAnswerForm,
} from '../../redux/Property/property.actions';
import Question from './Question';

const actions = [
  {
    text: 'Home',
    icon: <AntDesign name="home" size={20} color="white" />,
    name: 'PropertyHome',
    position: 1,
    textBackground: 'transparent',
    textElevation: 0,
    textColor: 'white',
    buttonSize: 40,
    margin: 8,
    textStyle: {
      fontSize: 16,
    },
    color: COLORS.blueBtn,
  },
  {
    text: 'Add Question',
    icon: <AntDesign name="plus" size={20} color="white" />,
    name: 'AddQuestion',
    position: 2,
    textBackground: 'transparent',
    textElevation: 0,
    textColor: 'white',
    buttonSize: 40,
    margin: 8,
    textStyle: {
      fontSize: 16,
    },
    color: COLORS.blueBtn,
  },
];

const mapState = ({property}) => ({
  fetchQuestionD: property.fetchQuestionD,
  fetchPropertyD: property.fetchPropertyD,
  addAnswerSuccess: property.addAnswerSuccess,
  errors: property.errors,
});

const Help = ({navigation}) => {
  console.log('Q&A Screen');  
  const {fetchPropertyD, fetchQuestionD, addAnswerSuccess} =
    useSelector(mapState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (addAnswerSuccess) {
      dispatch(ResetAddAnswerForm());
      navigation.navigate('PropertyHome');
    }
  }, [addAnswerSuccess]);

  useEffect(() => {
    dispatch(fetchProperty());
    dispatch(fetchQuestions());
  }, []);

  console.log('here ..................', fetchPropertyD);
  console.log('here ..................', fetchQuestionD);
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        {/* Blue Header */}
        <View style={styles.header}>
          <View style={styles.headerSub}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <IconFeather
                name="arrow-left"
                size={20}
                color="white"
                style={styles.icon_style}
              />
            </TouchableOpacity>
            {fetchPropertyD.RandomPropertyID1 ? (
              <Text style={styles.headerID}>
                ID: {fetchPropertyD.RandomPropertyID1}
              </Text>
            ) : (
              <Text style={styles.headerID}>Loading ...</Text>
            )}
          </View>
        </View>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.headerTitle}>Q&A</Text>
          {(fetchQuestionD && fetchPropertyD.RandomPropertyID1) ? (
            fetchQuestionD.map((m, index) => (
              <Question
                key={index}
                nb={m.nb}
                question={m.question}
                answers={m.answers}
                propertyId={fetchPropertyD.RandomPropertyID1}
                createdAt={m.createdAt}
                updatedAt={m.updatedAt}
                deletedAt={m.deletedAt}
              />
            ))
          ) : !fetchQuestionD ? (
            <Text style={styles.loading}>Q&A Not Availble Yet.</Text>
          ) : (
            <Text style={styles.loading}>loading ...</Text>
          )}
        </ScrollView>
      </View>
      <FloatingAction
        actions={actions}
        color={COLORS.blueBtn}
        onPressItem={name => {
          console.log(`selected button: ${name}`);
          navigation.navigate(`${name}`);
        }}
      />
    </View>
  );
};

export default Help;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  subContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  scrollView: {
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLORS.blueBtn,
    height: 60,
    paddingHorizontal: 20,
  },
  headerSub: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon_style: {
    marginRight: 10,
    marginRight: 100,
  },
  headerTitle: {
    paddingTop: 20,
    paddingVertical: 5,
    fontSize: 24,
    fontWeight: '700',
    color: 'black',
    backgroundColor: 'white',
    paddingLeft: 30,
  },
  headerID: {
    color: 'white',
    fontSize: 16,
  },
  loading: {
    textAlign: 'center',
    fontSize: 14,
    color: 'black',
  },
});
