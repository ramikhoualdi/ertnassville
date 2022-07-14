import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Youtube from 'react-native-youtube'

const YoutubePreview = ({navigation}) => {
  return (
    <View>
      <Text>Youtube</Text>
      <Youtube
        videoId="UwsrzCVZAb8"

      />
    </View>
  )
}

export default YoutubePreview

const styles = StyleSheet.create({})