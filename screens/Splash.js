import React, { useEffect } from 'react'
import { 
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image, 
} from 'react-native'
import { images, COLORS } from '../constants'
import { useDispatch } from 'react-redux'
import { ResetErrorsState } from '../redux/Property/property.actions'


var count = 0

const Splash = ({navigation}) => {
    console.log('Splash Screen')
    console.log('count =>',count)
    const dispatch = useDispatch()

    useEffect(() => {
      if(count == 0){
        dispatch(ResetErrorsState)
        count++
      }
    },[count])
    
    const RedirectRegister = () => {
      console.log('RedirectRegister Clicked !!')
      navigation.navigate('PropertyRegister')
    }

    const RedirectLogin = () => {
      console.log('RedirectLogin Clicked !!')
      navigation.navigate('PropertyLogin')
    }

    const RedirectUserLogin = () => {
      console.log('RedirectUserLogin Clicked !!')
      navigation.navigate('UserLogin')
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.flexContainer} >
                <Image
                    style={styles.logo}
                    source={images.logo}
                    resizeMode="contain"
                />
                <View>
                    <TouchableOpacity
                        onPress={RedirectRegister}
                        >
                        <Text style={styles.p_btn}>Sign Up as Property</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={RedirectLogin}
                        >
                        <Text style={styles.p_btn}>Sign In as Property</Text>
                    </TouchableOpacity>
                    <View 
                      style={styles.betweenLogin}
                    >
                        <View style={styles.hline} ></View>
                        <View>
                            <Text style={{color: 'black'}} >Or</Text>
                        </View>
                        <View style={styles.hline} ></View>
                    </View>
                    <TouchableOpacity
                        onPress={RedirectUserLogin}
                        >
                        <Text style={styles.u_btn}>Sign In as User</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Splash

const styles = StyleSheet.create({
    container: {
      position: 'relative',
      flex: 1,
      color: COLORS.primary,
      backgroundColor: '#fff',
    },
    flexContainer: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    logo: {
      width: 150,
      height: 150,
    },
    betweenLogin: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginVertical: 10,
    },
    hline: {
      borderBottomWidth: 0.5,
      borderBottomColor: 'black',
      width: 100,
    },
    p_btn: {
      backgroundColor: COLORS.redColor,
      color: 'white' ,
      fontSize: 15,
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      paddingVertical: 12,
      paddingHorizontal: 35,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: 'transparent',
      marginVertical: 10,
      fontWeight: '600',
      width:  300,
    },
    u_btn: {
      backgroundColor: COLORS.blueColor,
      color: 'white' ,
      fontSize: 15,
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      paddingVertical: 12,
      paddingHorizontal: 35,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: 'transparent',
      marginVertical: 10,
      fontWeight: '600',
      width:  300,
    },
  });