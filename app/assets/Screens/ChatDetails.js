import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function ChatDetails() {
  const currChat = useSelector(
    (StateSelector) => StateSelector.chatModule.currChat
  )
  return (
    <View>
      <Text>ChatDetails</Text>
    </View>
  )
}

const styles = StyleSheet.create({})
