import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import {
  View,
  SafeAreaView,
  Button,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  FlatList,
  TouchableHighlight,
} from 'react-native'

import { LinearGradient } from 'react-native-svg'
import Entypo from '@expo/vector-icons/Entypo'

import { useHeaderHeight } from '@react-navigation/elements'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import SearchInput from '../cmps/SearchInput'
import ItemContainer from '../cmps/ItemContainer'
import ItemPreview from '../cmps/ItemPreview'
import CustomButton from '../cmps/CustomButton'
import ListItemSeparator from '../cmps/ListItemSeparator'
import ListItemSwipeAction from '../cmps/ListItemSwipeAction'
import ItemList from '../cmps/ItemList'
import CustomPicker from '../cmps/CustomPicker'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import { capitalizeFirstLetter, makeId } from '../services/utils'
import { itemService } from '../api/item'
import {
  addItem,
  getPageItems,
  loadItem,
  loadItems,
  removeItem,
} from '../store/actions/item.actions'
import colors from '../config/color'
import paths from '../navigation/routes'
import CustomText from '../cmps/CustomText'
import CustomLottieAnimation from '../cmps/CustomLottieAnimation'
import Screen from './Screen'

import defaultStyles from '../config/styles'

import loader from '../animation/loader/loader.json'
import { capitalizeWords } from '../services/util.service'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

function ExploreScreen({ navigation }) {
  const headerHeight = useHeaderHeight()

  const items = useSelector((stateSelector) => stateSelector.itemModule.items)

  const [error, setError] = useState(false)

  const [filter, setFilter] = useState(itemService.getDefaultFilter())
  const [maxPage, setMaxPage] = useState()

  const [isRefreshing, setIsRefreshing] = useState(false)

  const swipeableRef = useRef(null)

  const [isLoading, setIsLoading] = useState(false)

  const navigateToAdd = () => navigation.navigate(paths.ADD)

  const swipeable = {
    backgroundColor: colors.addGreen,
    icon: <Entypo name='add-to-list' size={24} color={colors.strongWhite} />,
  }

  const categories = [
    {
      label: 'electronics',
      value: 1,
      icon: (
        <MaterialCommunityIcons
          name='phone'
          size={50}
          color={defaultStyles.colors.strongWhite}
        />
      ),
      color: colors.darkBlue, // Navy blue
      onPress: (category) => handleCategoryChange(category),
    },
    {
      label: 'furniture',
      value: 2,
      icon: (
        <MaterialCommunityIcons
          name='sofa'
          size={50}
          color={defaultStyles.colors.strongWhite}
        />
      ),
      color: colors.darkOliveGreen, // Dark olive green
      onPress: (category) => handleCategoryChange(category),
    },
    {
      label: 'clothing',
      value: 3,
      icon: (
        <MaterialCommunityIcons
          name='tshirt-crew'
          size={50}
          color={defaultStyles.colors.strongWhite}
        />
      ),
      color: colors.darkPurple, // Dark purple
      onPress: (category) => handleCategoryChange(category),
    },
    {
      label: 'toys & games',
      value: 4,
      icon: (
        <MaterialCommunityIcons
          name='gamepad'
          size={50}
          color={defaultStyles.colors.strongWhite}
        />
      ),
      color: colors.deepOrange, // Dark orange
      onPress: (category) => handleCategoryChange(category),
    },
    {
      label: 'books',
      value: 5,
      icon: (
        <MaterialCommunityIcons
          name='book'
          size={50}
          color={defaultStyles.colors.strongWhite}
        />
      ),
      color: colors.darkRed, // Dark red
      onPress: (category) => handleCategoryChange(category),
    },
    {
      label: 'sports equipment',
      value: 6,
      icon: (
        <MaterialCommunityIcons
          name='dumbbell'
          size={50}
          color={defaultStyles.colors.strongWhite}
        />
      ),
      color: colors.darkGreen, // Dark green
      onPress: (category) => handleCategoryChange(category),
    },
    {
      label: 'home appliances',
      value: 7,
      icon: (
        <MaterialCommunityIcons
          name='fridge'
          size={50}
          color={defaultStyles.colors.strongWhite}
        />
      ),
      color: colors.darkSkyBlue, // Dark sky blue
      onPress: (category) => handleCategoryChange(category),
    },
    {
      label: 'kitchenware',
      value: 8,
      icon: (
        <MaterialCommunityIcons
          name='silverware-fork-knife'
          size={50}
          color={defaultStyles.colors.strongWhite}
        />
      ),
      color: colors.darkLavender, // Dark lavender
      onPress: (category) => handleCategoryChange(category),
    },
    {
      label: 'beauty & personal care',
      value: 9,
      icon: (
        <MaterialCommunityIcons
          name='lipstick'
          size={50}
          color={defaultStyles.colors.strongWhite}
        />
      ),
      color: colors.darkPeach, // Dark peach
      onPress: (category) => handleCategoryChange(category),
    },
    {
      label: 'jewelry & watches',
      value: 10,
      icon: (
        <MaterialCommunityIcons
          name='watch'
          size={50}
          color={defaultStyles.colors.strongWhite}
        />
      ),
      color: colors.darkPink, // Dark pink
      onPress: (category) => handleCategoryChange(category),
    },
    {
      label: 'health & wellness',
      value: 11,
      icon: (
        <MaterialCommunityIcons
          name='heart'
          size={50}
          color={defaultStyles.colors.strongWhite}
        />
      ),
      color: colors.darkMintGreen, // Dark mint green
      onPress: (category) => handleCategoryChange(category),
    },
    {
      label: 'baby & kids',
      value: 12,
      icon: (
        <MaterialCommunityIcons
          name='baby-carriage'
          size={50}
          color={defaultStyles.colors.strongWhite}
        />
      ),
      color: colors.darkRosePink, // Dark rose pink
      onPress: (category) => handleCategoryChange(category),
    },
    {
      label: 'tools & hardware',
      value: 13,
      icon: (
        <MaterialCommunityIcons
          name='wrench'
          size={50}
          color={defaultStyles.colors.strongWhite}
        />
      ),
      color: colors.darkChocolateBrown, // Dark chocolate brown
      onPress: (category) => handleCategoryChange(category),
    },
    {
      label: 'cars & vehicles',
      value: 14,
      icon: (
        <MaterialCommunityIcons
          name='car'
          size={50}
          color={defaultStyles.colors.strongWhite}
        />
      ),
      color: colors.darkSlateGray, // Dark slate gray
      onPress: (category) => handleCategoryChange(category),
    },
    {
      label: 'bikes & scooters',
      value: 15,
      icon: (
        <MaterialCommunityIcons
          name='bike'
          size={50}
          color={defaultStyles.colors.strongWhite}
        />
      ),
      color: colors.darkTurquoise, // Dark turquoise
      onPress: (category) => handleCategoryChange(category),
    },
    {
      label: 'musical instruments',
      value: 16,
      icon: (
        <MaterialIcons
          name='queue-music'
          size={50}
          color={defaultStyles.colors.strongWhite}
        />
      ),
      color: colors.darkSkyBlue, // Dark sky blue
      onPress: (category) => handleCategoryChange(category),
    },
    {
      label: 'collectibles',
      value: 17,
      icon: (
        <MaterialIcons
          name='collections'
          size={50}
          color={defaultStyles.colors.strongWhite}
        />
      ),
      color: colors.darkOliveGreen, // Dark olive green
      onPress: (category) => handleCategoryChange(category),
    },
    {
      label: 'garden & outdoor',
      value: 18,
      icon: (
        <MaterialCommunityIcons
          name='flower'
          size={50}
          color={defaultStyles.colors.strongWhite}
        />
      ),
      color: colors.darkGreen, // Dark green
      onPress: (category) => handleCategoryChange(category),
    },
    {
      label: 'art & crafts',
      value: 19,
      icon: (
        <MaterialCommunityIcons
          name='palette'
          size={50}
          color={defaultStyles.colors.strongWhite}
        />
      ),
      color: colors.darkPurple, // Dark purple
      onPress: (category) => handleCategoryChange(category),
    },
    {
      label: 'pets & pet supplies',
      value: 20,
      icon: (
        <MaterialCommunityIcons
          name='dog'
          size={50}
          color={defaultStyles.colors.strongWhite}
        />
      ),
      color: colors.darkRosePink, // Dark rose pink
      onPress: (category) => handleCategoryChange(category),
    },
  ]

  const setItems = async (filter) => {
    try {
      setIsLoading(true)
      console.log(filter)
      const res = await loadItems(filter)
      console.log(res)
      const maxPageRes = await itemService.getMaxPage(filter)
      setMaxPage(maxPageRes.data)
      setIsLoading(false)
      console.log(res.data)
      if (res.problem) {
        setError(true)
        return
      }
    } catch (err) {
      console.log(err)
    }
  }

  function handleCategoryChange(category) {
    setFilter({ ...filter, category })
  }

  function onItemPickerPress(item) {
    item.onPress(item.label.toLowerCase())
    setIsModal(false)
  }

  useEffect(() => {
    setItems(filter)
  }, [filter])

  const handleSearchSubmit = (query) => {
    const filterBy = { ...filter, txt: query }
    setFilter(filterBy)
  }

  const getPageIdxItems = async (pageToSet) => {
    const filterBy = { ...filter, pageIdx: pageToSet }
    return await getPageItems(filterBy)
  }

  const [keyboardOffset, setKeyboardOffset] = useState(0)

  const setItem = async (itemId) => {
    await loadItem(itemId)
    navigation.navigate(paths.DETAILS)
  }

  const handleAdd = async (item, swipeableRef) => {
    swipeableRef?.current.close()
    swipeableRef.current = null
    const itemId = item._id

    await addItem(itemId)
  }

  return (
    <Screen>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? headerHeight : 0}
      >
        {error && (
          <>
            <CustomText>Couldn't load Items</CustomText>
            <CustomButton onPress={() => setItems(filter)}>Retry</CustomButton>
          </>
        )}
        <CustomPicker
          placeholder={'Category'}
          value={
            filter.categories.length > 0
              ? capitalizeWords(filter.category)
              : 'Category'
          }
          icon={'apps'}
          items={categories}
          onPress={onItemPickerPress}
        />
        <SearchInput onSubmit={handleSearchSubmit} />
        {/* <View style={styles.buttonContainer}>
          <CustomButton style={styles.addButton} handlePress={navigateToAdd}>
            Add
          </CustomButton>
        </View> */}
        {(isLoading && (
          <CustomLottieAnimation animation={loader} visible={isLoading} />
        )) || (
          <ItemList
            items={items}
            setItem={setItem}
            isRefreshing={isRefreshing}
            onSwipePress={handleAdd}
            swipeable={swipeable}
            getPageIdxItems={getPageIdxItems}
            maxPage={maxPage}
          />
        )}
      </KeyboardAvoidingView>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // padding: 5,
  },

  buttonContainer: {
    alignSelf: 'flex-end',
    marginBottom: 10,
    marginRight: 10,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
  },

  addButton: {
    textAlign: 'center',
  },
  prevNextButtons: {
    padding: 5,
    flexDirection: 'row',
    // paddingTop: 10,
    justifyContent: 'space-around',
    width: screenWidth,
  },
  scrollView: {
    // width: screenWidth,
    width: '100%',

    flex: 1,
    // paddingBottom: 20,
  },

  preview: {
    // borderBottomWidth: 0.3,
    // borderColor: 'dodgerblue',
  },
})

// const dismissKeyboard = () => {
//   Keyboard.dismiss()
// }

// const DismissKeyboardView = ({ children }) => (
//   <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
//     {children}
//   </TouchableWithoutFeedback>
// )

export default ExploreScreen
