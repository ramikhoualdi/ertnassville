import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather';
import {COLORS} from '../../constants';
import {useSelector, useDispatch} from 'react-redux';
import {fetchQuestion, fetchProperty} from '../../redux/User/user.actions';
import QuestionUModel from '../drawer_support/QuestionUModel';

const mapState = ({user}) => ({
  fetchQuestionD: user.fetchQuestionD,
  fetchPropertyD: user.fetchPropertyD,
});

const QuestionUser = ({route, navigation}) => {
  console.log('Questions Screen !!');
  const propertyId = route.params.propertyId;
  const {fetchPropertyD, fetchQuestionD} = useSelector(mapState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProperty(propertyId));
    dispatch(fetchQuestion(propertyId));
  }, []);

  console.log('here ..................', fetchQuestionD);
  console.log('here ..................', fetchPropertyD);
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        {/* Blue Header */}
        <View style={styles.header}>
          <View style={styles.headerSub}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <IconFeather
                name="arrow-left"
                size={25}
                color={COLORS.greyColor}
                style={styles.icon_style}
              />
            </TouchableOpacity>
            <Text style={styles.headerID}>{propertyId}</Text>
          </View>
        </View>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.headerTitle}>Q&A</Text>
          {fetchQuestionD && fetchQuestionD ? (
            fetchQuestionD.map((m, index) => (
              <QuestionUModel
                key={index}
                nb={m.nb}
                question={m.question}
                answers={m.answers}
                propertyId={propertyId}
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
    </View>
  );
};

export default QuestionUser;

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
    backgroundColor: 'white',
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
    fontSize: 26,
    fontWeight: '700',
    color: 'black',
    backgroundColor: 'white',
    paddingLeft: 20,
  },
  headerID: {
    color: 'black',
    fontSize: 18,
    fontWeight: '800',
  },
  loading: {
    textAlign: 'center',
    fontSize: 14,
    color: 'black',
  },
});
