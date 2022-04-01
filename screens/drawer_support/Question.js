import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import IconFeather from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import {saveAnswer} from '../../redux/Property/property.actions';
import Answer from './Answer';

const Question = props => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [more, setMore] = useState(false);
  const [answerT, setAnswerT] = useState('');

  const dispatch = useDispatch();
  const {nb, question, answers, propertyId, createdAt, updatedAt, deletedAt} = props;
  console.log('props');
  console.log(props);
  console.log('From Question Components =>');
  console.log({nb, question, answers, propertyId, createdAt, updatedAt, deletedAt});

  const time = () => {
    let ch = createdAt;
    if (ch) {
      const dateFinal = ch.toDate().toString().substr(4, 11);
      return `Added on ${dateFinal.substr(0, 3)} ${dateFinal.substr(
        4,
        2,
      )}, ${dateFinal.substr(7, 4)}`;
    } else {
      return '';
    }
  };
  const handleAddAnswer = () => {
    if (answerT.length > 0) {
      dispatch(saveAnswer(answerT, nb, propertyId));
    }
  };
  const renderModel = () => (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.model}>
          <View style={styles.modelMid}>
            <View style={styles.modelMidText}>
              <View style={styles.titleTime}>
                <Text style={styles.modelName}>{question}</Text>
              </View>
              <View style={styles.lastLine}>
                <View>
                  <Text style={styles.modelTime}>{time()}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.modelMore}>
            <IconFeather
              name="plus"
              color="grey"
              size={25}
              style={styles.icon_style}
            />
          </View>
        </View>
      </TouchableOpacity>
      <Modal
        isVisible={isModalVisible}
        backdropOpacity={0.5}
        onBackdropPress={() => setModalVisible(false)}
        // swipeDirection={['up']}
        // scrollOffsetMax={400 - 300} // content height - ScrollView height
        propagateSwipe={true}
        style={styles.modal}>
        <View style={styles.modelStyle}>
          <ScrollView>
            <View style={styles.answers}>
              <Text style={styles.modelTitle}>Answers</Text>
              {answers ? (
                <View style={styles.currentAnswer}>
                  {answers &&
                    answers.map((m, index) => (
                      <Answer
                        key={index}
                        answer={m.answer}
                        createdAt={m.createdAt}
                        updatedAt={m.updatedAt}
                        deletedAt={m.deletedAt}
                      />
                    ))}
                </View>
              ) : (
                <View>
                  <Text style={styles.noAnswer}>No Answers yet.</Text>
                </View>
              )}
            </View>
          </ScrollView>
          <View style={styles.inputContainer}>
            <View style={styles.inputContainerBorder}>
              <TextInput
                style={styles.answersT}
                multiline={true}
                value={answerT}
                placeholder="answer"
                onChangeText={setAnswerT}
                maxLength={200}
                placeholderTextColor={'grey'}
              />
              <TouchableOpacity onPress={handleAddAnswer}>
                <IconFeather
                  name="plus"
                  color="grey"
                  size={25}
                  style={styles.plusIcon_style}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
  return <View>{renderModel()}</View>;
};

export default Question;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    marginBottom: 1,
  },
  model: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  modelImage: {
    marginHorizontal: 20,
    width: 60,
    height: 60,
  },
  modelMid: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  modelMidText: {
    flex: 1,
    paddingVertical: 5,
  },
  modelName: {
    fontSize: 18,
    marginBottom: 5,
    color: 'black',
    fontWeight: '700',
  },
  modelNumber: {
    color: 'black',
    fontSize: 12,
  },
  modelMore: {
    opacity: 0.9,
  },
  modelTime: {
    color: 'grey',
    fontSize: 10,
  },
  titleTime: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accessEmergency1: {
    color: '#238823',
    fontSize: 12,
  },
  accessEmergency2: {
    color: '#FFBF00',
    fontSize: 12,
  },
  accessEmergency3: {
    color: '#D2222D',
    fontSize: 12,
  },
  lastLine: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  doneCheck: {
    width: 35,
  },
  answers: {
    // flex: 1,
    margin: 10,
    backgroundColor: 'white',
    height: '100%',
  },
  inputContainer: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 0,
    backgroundColor: 'white',
    margin: 10,
    marginBottom: 5,
    marginHorizontal: 10,
  },
  inputContainerBorder: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 8,
  },
  answersT: {
    flex: 1,
    marginLeft: 10,
  },
  //   Model
  modelStyle: {
    flex: 0.6,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 10,
    paddingTop: 20,
    overflow: 'scroll',
    position: 'relative',
  },
  modal: {
    // height: 200,
    justifyContent: 'flex-end',
    margin: 0,
    overflow: 'scroll',
  },
  modelTitle: {
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
    marginBottom: 10,
  },
  noAnswer: {
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
  },
  plusIcon_style: {
    marginRight: 10,
  },
  currentAnswer: {
    marginBottom: 50,
  },
});
