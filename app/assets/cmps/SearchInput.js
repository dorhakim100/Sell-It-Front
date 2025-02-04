import React, { useEffect, useState } from 'react'
import {
  View,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import CustomButton from './CustomButton'
import AntDesign from '@expo/vector-icons/AntDesign'

import colors from '../config/color'
import defaultStyles from '../config/styles'

const SearchInput = ({ icon, onSubmit, ...otherProps }) => {
  const [query, setQuery] = useState('')

  const handleSearch = () => {
    // Call the passed onSubmit function with the current query
    onSubmit(query)
  }

  const handleChange = (value) => {
    setQuery(value)

    // if (value.length === 0) onSubmit(value)
    onSubmit(value)
  }

  return (
    <View style={styles.container}>
      {(icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={defaultStyles.colors.darkGray}
          style={styles.icon}
        />
      )) || <AntDesign name='search1' size={30} color={colors.primary} />}

      <TextInput
        // keyboardType='numeric' // for number keypad
        clearButtonMode='always' // only for ios
        // secureTextEntry={true} or just secureTextEntry // passwords input
        style={{ ...defaultStyles.text, flex: 1 }}
        value={query}
        onChangeText={handleChange}
        placeholder={`Search here...`}
        returnKeyType='search'
        onSubmitEditing={handleSearch}
        {...otherProps} // passing props all props from parent at once
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    gap: 5,
    marginTop: 10,
    marginBottom: 10,
    borderColor: 'transparent',
    backgroundColor: colors.secondLight,
    backgroundColor: colors.strongWhite,
    borderWidth: 1,
    marginHorizontal: 10,

    paddingHorizontal: 10,
    // height: 50,
    borderRadius: 50,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
})

export default SearchInput
