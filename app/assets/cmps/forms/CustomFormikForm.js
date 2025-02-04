import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { Formik } from 'formik'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import CustomButton from '../CustomButton'
import CustomText from '../CustomText'
import CustomTextInput from './CustomTextInput'

import defaultStyles from '../../config/styles'
import CustomPicker from '../CustomPicker'
import CustomImagePicker from '../CustomImagePicker'
import CustomCheckInput from '../CustomCheckInput'

export default function CustomFormikForm({
  inputs,
  button,
  validationSchema,
  onSubmit,
  values = {},
}) {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      extraScrollHeight={80} // Adds extra scroll room when keyboard appears
      keyboardShouldPersistTaps='handled'
      enableOnAndroid
      scrollEnabled
    >
      <Formik
        initialValues={values}
        onSubmit={(valuesToSet) => {
          onSubmit(valuesToSet)
        }}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleSubmit,
          handleBlur,
          setValues,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <>
            {inputs.map((input) => {
              switch (input.type) {
                case 'picker':
                  input.options.map((option) => {
                    const originalFunction = option.onPress
                    delete option.onPress

                    option.onPress = () => {
                      originalFunction()
                      setFieldValue(input.name, option.label)
                    }
                  })

                  break
                case 'imagePicker':
                  input.onSetImage = (res) => {
                    console.log(res)
                    setFieldValue(input.name, res)
                  }

                  break
                case 'check':
                  input.options.map((option) => {
                    option.onPress = () => {
                      if (values[input.name].includes(option.label)) {
                        const idx = values[input.name].findIndex(
                          (value) => value === option.label
                        )
                        values[input.name].splice(idx, 1)
                        setFieldValue(input.name, [...values[input.name]])
                        return
                      }
                      if (values[input.name].length > 1) {
                        values[input.name].splice(0, 1, option.label)
                      } else {
                        values[input.name].push(option.label)
                      }
                      setFieldValue(input.name, [...values[input.name]])
                    }
                  })

                  break

                default:
                  break
              }

              return (
                <View key={input.name} style={styles.inputContainer}>
                  {(input.type === 'text' && (
                    <CustomTextInput
                      icon={input.icon}
                      keyboardType={input.keyboardType}
                      isPassword={input.isPassword}
                      autoCapitalize={input.autoCapitalize}
                      onChangeText={handleChange(input.name)}
                      name={input.name}
                      value={values[input.name]}
                      onBlur={handleBlur(input.name)}
                      placeholder={input.placeholder}
                    >
                      {input.placeholder}
                    </CustomTextInput>
                  )) ||
                    (input.type === 'picker' && (
                      <CustomPicker
                        style={input.style}
                        items={input.options}
                        setValues={setValues}
                        value={values[input.name]}
                        placeholder={input.placeholder}
                      />
                    )) ||
                    (input.type === 'imagePicker' && (
                      <CustomImagePicker input={input} />
                    )) ||
                    (input.type === 'check' && (
                      <CustomCheckInput
                        items={input.options}
                        values={values[input.name]}
                      />
                    ))}

                  {touched[input.name] && errors[input.name] && (
                    <CustomText style={defaultStyles.error}>
                      {errors[input.name]}
                    </CustomText>
                  )}
                </View>
              )
            })}
            <View style={styles.buttonContainer}>
              <CustomButton style={styles.button} handlePress={handleSubmit}>
                {button}
              </CustomButton>
            </View>
          </>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Ensure content fills the scrollview
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  buttonContainer: {
    width: 180,
    alignSelf: 'center',
    marginVertical: 10,
  },
  button: {
    textAlign: 'center',
  },
})
