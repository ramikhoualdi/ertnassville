import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {
  // Starter
  BeforeSplash,
  Splash,
  // Auth User
  UserLogin,
  // User Screens
  UserHome,
  // Auth Property
  PropertyRegister,
  PropertyLogin,
  PropertyResetPassword,
  // Property Screens
  PropertyHome,
  // Sidebar
  AddAccess,
  Access,
  AddContact,
  Contacts,
  AddDocument,
  Documents,
  AddDescription,
  Descriptions,
  AddElevator,
  Elevators,
  AddGenerator,
  Generators,
  AddLockBox,
  LockBoxes,
  AddMatterport,
  Matterports,
  AddPhoto,
  Photos,
  AddPrecaution,
  Precautions,
  AddPreExistingDamage,
  PreExistingDamages,
  AddUtility,
  Utilities,
  YoutubePreview,
  // Sidebar Chat
  GeneralChat,
  Urgent,
  // Sidebar Support
  Help,
  AddQuestion,
  Support,
  AddSupport,
  // UserServices
  AccessUser,
  ContactsUser,
  DescriptionsUser,
  DocumentsUser,
  ElevatorsUser,
  GeneratorsUser,
  LockBoxesUser,
  MatterportsUser,
  PhotosUser,
  PrecautionsUser,
  PreExistingDamagesUser,
  QuestionUser,
  SupportUser,
  UtilitiesUser,
} from './screens';

// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';



const Stack = createStackNavigator();

const mapState = ({property}) => ({
  currentProperty: property.currentProperty,
});

const App = () => {
  const {currentProperty} = useSelector(mapState);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialeRouteName="BeforeSplash"
        screenOptions={{
          headerShown: false,
        }}>
        {!currentProperty && (
          <>
            {/* done */}
            <Stack.Screen name="BeforeSplash" component={BeforeSplash} />
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen
              name="PropertyRegister"
              component={PropertyRegister}
            />
            <Stack.Screen name="PropertyLogin" component={PropertyLogin} />
            <Stack.Screen
              name="PropertyResetPassword"
              component={PropertyResetPassword}
            />
            <Stack.Screen name="UserLogin" component={UserLogin} />
            <Stack.Screen name="UserHome" component={UserHome} />
            {/* Services For User */}
            <Stack.Screen name="_Access" component={AccessUser} />
            <Stack.Screen name="_Contacts" component={ContactsUser} />
            <Stack.Screen name="_Description" component={DescriptionsUser} />
            <Stack.Screen name="_Documents" component={DocumentsUser} />
            <Stack.Screen name="_Elevators" component={ElevatorsUser} />
            <Stack.Screen name="_Generators" component={GeneratorsUser} />
            <Stack.Screen name="_LockBoxes" component={LockBoxesUser} />
            <Stack.Screen name="_Matterports" component={MatterportsUser} />
            <Stack.Screen name="_Photos" component={PhotosUser} />
            <Stack.Screen name="_Precautions" component={PrecautionsUser} />
            <Stack.Screen
              name="_PreExistingDamages"
              component={PreExistingDamagesUser}
            />
            <Stack.Screen name="_Utilities" component={UtilitiesUser} />
            {/* Services For User */}
            {/* Chat For User */}
            <Stack.Screen name="_generalChat" component={GeneralChat} />
            <Stack.Screen name="_urgent" component={Urgent} />
            {/* Chat For User */}
            {/* Support For User */}
            <Stack.Screen name="_supports" component={SupportUser} />
            <Stack.Screen name="_helps" component={QuestionUser} />
            <Stack.Screen name="AddQuestion" component={AddQuestion} />
            {/* Support For User */}
          </>
        )}
        {currentProperty && (
          <>
            <Stack.Screen name="PropertyHome" component={PropertyHome} />
            {/* Services */}
            {/* Access */}
            <Stack.Screen name="_Access" component={Access} />
            <Stack.Screen name="AddAccess" component={AddAccess} />
            {/* Contact */}
            <Stack.Screen name="_Contacts" component={Contacts} />
            <Stack.Screen name="AddContact" component={AddContact} />
            {/* Description */}
            <Stack.Screen name="_Description" component={Descriptions} />
            <Stack.Screen name="AddDescription" component={AddDescription} />
            {/* Photo */}
            <Stack.Screen name="_Photos" component={Photos} />
            <Stack.Screen name="AddPhoto" component={AddPhoto} />
            {/* Document ================== Not Working */}
            <Stack.Screen name="_Documents" component={Documents} />
            <Stack.Screen name="AddDocument" component={AddDocument} />
            {/* Elevators */}
            <Stack.Screen name="_Elevators" component={Elevators} />
            <Stack.Screen name="AddElevator" component={AddElevator} />
            {/* Generators */}
            <Stack.Screen name="_Generators" component={Generators} />
            <Stack.Screen name="AddGenerator" component={AddGenerator} />
            {/* LockBoxes */}
            <Stack.Screen name="_LockBoxes" component={LockBoxes} />
            <Stack.Screen name="AddLockBox" component={AddLockBox} />
            {/* Matterports */}
            <Stack.Screen name="_Matterports" component={Matterports} />
            <Stack.Screen name="AddMatterport" component={AddMatterport} />
            {/* Precautions */}
            <Stack.Screen name="_Precautions" component={Precautions} />
            <Stack.Screen name="AddPrecaution" component={AddPrecaution} />
            {/* PreExistingDamage */}
            <Stack.Screen
              name="_PreExistingDamages"
              component={PreExistingDamages}
            />
            <Stack.Screen
              name="AddPreExistingDamage"
              component={AddPreExistingDamage}
            />
            {/* Utilities */}
            <Stack.Screen name="_Utilities" component={Utilities} />
            <Stack.Screen name="AddUtility" component={AddUtility} />
            <Stack.Screen name="_Youtube" component={YoutubePreview} />
            {/* Chat */}
            {/* GeneralChat */}
            <Stack.Screen name="_generalChat" component={GeneralChat} />
            {/* Urgent */}
            <Stack.Screen name="_urgent" component={Urgent} />
            {/* Support For User */}
            <Stack.Screen name="_support" component={Support} />
            <Stack.Screen name="_help" component={Help} />
            <Stack.Screen name="AddQuestion" component={AddQuestion} />
            <Stack.Screen name="AddSupport" component={AddSupport} />
            {/* Support For User */}
          </>
        )}
      </Stack.Navigator>
      
    </NavigationContainer>
  );
};

export default App;

