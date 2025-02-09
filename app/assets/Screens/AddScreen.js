import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import useLocation from '../services/customHooks/useLocation'

import * as Yup from 'yup'

import Screen from './Screen'
import CustomFormikForm from '../cmps/forms/CustomFormikForm'
import CustomImagePicker from '../cmps/CustomImagePicker.js'
import UploadScreen from './UploadScreen'

import AntDesign from '@expo/vector-icons/AntDesign'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Foundation from '@expo/vector-icons/Foundation'

import defaultStyles from '../config/styles'
import { addNewItem, addItem } from '../store/actions/item.actions'
import { itemService } from '../api/item'
import Categories from '../cmps/Categories'

import paths from '../navigation/routes'

const validationSchema = Yup.object().shape({
  label: Yup.string().required().min(2).label('Label'),
  price: Yup.number().required().min(1).label('Price'),
  description: Yup.string().required().min(2).label('Description'),
  images: Yup.array().required().min(3).label('Images'),
  categories: Yup.array().required().min(1).label('Categories'),
})

export default function AddScreen({ navigation }) {
  const user = useSelector((stateSelector) => stateSelector.userModule.currUser)
  const location = useLocation()

  const inputs = [
    {
      placeholder: 'Label',
      icon: (
        <AntDesign
          name='profile'
          size={24}
          color={defaultStyles.colors.subText}
        />
      ),

      name: 'label',
      type: 'text',
    },
    {
      placeholder: 'Price',
      icon: (
        <Foundation
          name='list-number'
          size={24}
          color={defaultStyles.colors.subText}
        />
      ),

      name: 'price',
      type: 'text',
      keyboardType: 'numeric',
    },
    {
      icon: (
        <MaterialCommunityIcons
          name='face-man-profile'
          size={24}
          color={defaultStyles.colors.subText}
        />
      ),

      name: 'images',
      type: 'imagePicker',
    },
    {
      placeholder: 'Description',
      multiline: true,
      icon: (
        <Foundation
          name='list-number'
          size={24}
          color={defaultStyles.colors.subText}
        />
      ),

      name: 'description',
      type: 'text',
    },
    {
      name: 'categories',
      type: 'check',

      options: [
        {
          label: 'electronics',
          value: 1,
          icon: <Categories categories={['electronics']} />,
        },
        {
          label: 'furniture',
          value: 2,
          icon: <Categories categories={['furniture']} />,
        },
        {
          label: 'clothing',
          value: 3,
          icon: <Categories categories={['clothing']} />,
        },
        {
          label: 'toys & games',
          value: 4,
          icon: <Categories categories={['toys & games']} />,
        },
        {
          label: 'books',
          value: 5,
          icon: <Categories categories={['books']} />,
        },
        {
          label: 'sports equipment',
          value: 6,
          icon: <Categories categories={['sports equipment']} />,
        },
        {
          label: 'home appliances',
          value: 7,
          icon: <Categories categories={['home appliances']} />,
        },
        {
          label: 'kitchenware',
          value: 8,
          icon: <Categories categories={['kitchenware']} />,
        },
        {
          label: 'beauty & personal care',
          value: 9,
          icon: <Categories categories={['beauty & personal care']} />,
        },
        {
          label: 'jewelry & watches',
          value: 10,
          icon: <Categories categories={['jewelry & watches']} />,
        },
        {
          label: 'health & wellness',
          value: 11,
          icon: <Categories categories={['health & wellness']} />,
        },
        {
          label: 'baby & kids',
          value: 12,
          icon: <Categories categories={['baby & kids']} />,
        },
        {
          label: 'tools & hardware',
          value: 13,
          icon: <Categories categories={['tools & hardware']} />,
        },
        {
          label: 'cars & vehicles',
          value: 14,
          icon: <Categories categories={['cars & vehicles']} />,
        },
        {
          label: 'bikes & scooters',
          value: 15,
          icon: <Categories categories={['bikes & scooters']} />,
        },
        {
          label: 'musical instruments',
          value: 16,
          icon: <Categories categories={['musical instruments']} />,
        },
        {
          label: 'collectibles',
          value: 17,
          icon: <Categories categories={['collectibles']} />,
        },
        {
          label: 'garden & outdoor',
          value: 18,
          icon: <Categories categories={['garden & outdoor']} />,
        },
        {
          label: 'art & crafts',
          value: 19,
          icon: <Categories categories={['art & crafts']} />,
        },
        {
          label: 'pets & pet supplies',
          value: 20,
          icon: <Categories categories={['pets & pet supplies']} />,
        },
      ],
    },
  ]

  const [values, setValues] = useState({
    num: '',
    label: '',
    category: '',
    images: [],
    categories: [],
  })

  const [uploadVisible, setUploadVisible] = useState(false)
  const [percentage, setPercentage] = useState(0)

  const handleRegionChange = (category) => {
    setValues({ ...values, category })
  }

  async function onSubmit(values) {
    if (!location) return alert('Enable location first')

    if (!user) return
    try {
      setUploadVisible(true)

      const { price, label, description, images, categories } = values
      // if (images.length < 3) {
      //   for (let i = 0; i < 3; i++) {
      //     if (!images[i]) {
      //       images[i] = images[0]
      //     }
      //   }
      // }

      // const newSprites = {
      //   artwork: images[0].uri,
      //   home: images[1].uri,

      //   pixel: images[2].uri,
      // }
      const item = itemService.getEmptyItem()

      const uris = images.map((image) => image.uri)

      // return
      await addNewItem(
        {
          ...item,
          price: +price,
          label,
          description,
          sellingUser: { id: user._id, fullname: user.fullname },
          images: uris,
          categories,
          location,
        },
        onProgress
      )
      mimicProgress()
      // navigateToMain()
    } catch (err) {
      console.log(err)
    }
  }

  const navigateToMain = () => {
    setUploadVisible(false)

    navigation.replace(paths.MAIN)
  }

  function mimicProgress() {
    for (let i = 0; i <= 100; i++) {
      setTimeout(() => {
        setPercentage(i)
      }, 25 * i)
    }
  }

  useEffect(() => {
    console.log(percentage)
  }, [percentage])

  function onProgress(per) {
    setPercentage(per)
  }

  return (
    <Screen hasNavigationBar={true}>
      <UploadScreen
        progress={percentage}
        visible={uploadVisible}
        navigate={navigateToMain}
      />
      <CustomFormikForm
        inputs={inputs}
        button={'Add'}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        values={values}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({})
