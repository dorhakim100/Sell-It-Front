import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

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
import { itemService } from '../services/item/item.service'
import Types from '../cmps/Types'

import paths from '../navigation/routes'

const validationSchema = Yup.object().shape({
  num: Yup.number().required().min(1).label('Number'),
  name: Yup.string().required().min(2).label('Name'),
  category: Yup.string().required().label('Region'),
  images: Yup.array().required().min(3).label('Images'),
  types: Yup.array().required().min(1).label('Types'),
})

export default function AddScreen({ navigation }) {
  const [category, setRegion] = useState('')

  const inputs = [
    {
      placeholder: 'Item number',
      icon: (
        <Foundation
          name='list-number'
          size={24}
          color={defaultStyles.colors.subText}
        />
      ),

      name: 'num',
      type: 'text',
      keyboardType: 'numeric',
    },
    {
      placeholder: 'Item name',
      icon: (
        <AntDesign
          name='profile'
          size={24}
          color={defaultStyles.colors.subText}
        />
      ),

      name: 'name',
      type: 'text',
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
      name: 'types',
      type: 'check',

      options: [
        {
          label: 'bug',
          value: 1,
          icon: <Types types={['bug']} />,
        },
        {
          label: 'dark',
          value: 2,
          icon: <Types types={['dark']} />,
        },
        {
          label: 'dragon',
          value: 3,
          icon: <Types types={['dragon']} />,
        },
        {
          label: 'electric',
          value: 4,
          icon: <Types types={['electric']} />,
        },
        {
          label: 'fairy',
          value: 5,
          icon: <Types types={['fairy']} />,
        },
        {
          label: 'fighting',
          value: 6,
          icon: <Types types={['fighting']} />,
        },
        {
          label: 'fire',
          value: 7,
          icon: <Types types={['fire']} />,
        },
        {
          label: 'flying',
          value: 8,
          icon: <Types types={['flying']} />,
        },
        {
          label: 'ghost',
          value: 9,
          icon: <Types types={['ghost']} />,
        },
        {
          label: 'grass',
          value: 10,
          icon: <Types types={['grass']} />,
        },
        {
          label: 'ground',
          value: 11,
          icon: <Types types={['ground']} />,
        },
        {
          label: 'ice',
          value: 12,
          icon: <Types types={['ice']} />,
        },
        {
          label: 'normal',
          value: 13,
          icon: <Types types={['normal']} />,
        },
        {
          label: 'poison',
          value: 14,
          icon: <Types types={['poison']} />,
        },
        {
          label: 'psychic',
          value: 15,
          icon: <Types types={['psychic']} />,
        },
        {
          label: 'rock',
          value: 16,
          icon: <Types types={['rock']} />,
        },
        {
          label: 'steel',
          value: 17,
          icon: <Types types={['steel']} />,
        },
        {
          label: 'water',
          value: 18,
          icon: <Types types={['water']} />,
        },
      ],
    },
    {
      placeholder: 'Region',
      icon: (
        <FontAwesome6
          name='earth-africa'
          size={24}
          color={defaultStyles.colors.subText}
        />
      ),

      name: 'category',
      type: 'picker',
      placeholder: 'Region',
      style: {
        backgroundColor: defaultStyles.colors.lightGray,
      },
      options: [
        {
          label: 'Kanto',
          value: 2,
          onPress: (category) => handleRegionChange(category),
        },
        {
          label: 'Johto',
          value: 3,
          onPress: (category) => handleRegionChange(category),
        },
        {
          label: 'Hoenn',
          value: 4,
          onPress: (category) => handleRegionChange(category),
        },
        {
          label: 'Sinnoh',
          value: 5,
          onPress: (category) => handleRegionChange(category),
        },
        {
          label: 'Unova',
          value: 6,
          onPress: (category) => handleRegionChange(category),
        },
        {
          label: 'Kalos',
          value: 7,
          onPress: (category) => handleRegionChange(category),
        },
        {
          label: 'Alola',
          value: 8,
          onPress: (category) => handleRegionChange(category),
        },
        {
          label: 'Galar',
          value: 9,
          onPress: (category) => handleRegionChange(category),
        },
        {
          label: 'Paldea',
          value: 10,
          onPress: (category) => handleRegionChange(category),
        },
      ],
    },
  ]

  const [values, setValues] = useState({
    num: '',
    name: '',
    category: '',
    images: [],
    types: [],
  })

  const [uploadVisible, setUploadVisible] = useState(false)
  const [percentage, setPercentage] = useState(0)

  const handleRegionChange = (category) => {
    setValues({ ...values, category })
  }

  async function onSubmit(values) {
    try {
      setUploadVisible(true)

      const { num, name, category, images, types } = values
      if (images.length < 3) {
        for (let i = 0; i < 3; i++) {
          if (!images[i]) {
            images[i] = images[0]
          }
        }
      }

      const newSprites = {
        artwork: images[0].uri,
        home: images[1].uri,

        pixel: images[2].uri,
      }
      const item = itemService.getEmptyItem()

      await addNewItem(
        {
          ...item,
          num: +num,
          name,
          category,
          sprites: newSprites,
          types,
        },
        onProgress
      )
      mimicProgress()

      // navigateToMain()
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    console.log(percentage)
  }, [percentage])

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
