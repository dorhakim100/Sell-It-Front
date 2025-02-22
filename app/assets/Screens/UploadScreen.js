import { Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomLottieAnimation from '../cmps/CustomLottieAnimation'
import CustomText from '../cmps/CustomText'

import * as Progress from 'react-native-progress'

import defaultStyles from '../config/styles'

import added from '../animation/added/added.json'
import CustomButton from '../cmps/CustomButton'

export default function UploadScreen({
  progress = 0,
  visible = false,
  navigate,
}) {
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        {(progress < 100 && (
          <Progress.Bar
            progress={progress}
            color={defaultStyles.colors.primary}
          />
        )) || (
          <>
            <CustomLottieAnimation
              animation={added}
              visible={true}
              loop={false}
            />
            <View style={styles.buttonContainer}>
              <CustomButton onPress={navigate}>Back</CustomButton>
            </View>
          </>
        )}
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',

    justifyContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 200,
  },
})
