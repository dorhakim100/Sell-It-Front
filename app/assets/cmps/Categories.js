import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, Button, Dimensions } from 'react-native'
import { capitalizeFirstLetter } from '../services/utils'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import defaultStyles from '../config/styles'
import colors from '../config/color'
import { TouchableOpacity } from 'react-native'

const screenWidth = Dimensions.get('window').width

export default function Categories({ labels, onPress }) {
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
      // onPress: (category) => onPress(category),
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
      // onPress: (category) => onPress(category),
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
      // onPress: (category) => onPress(category),
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
      // onPress: (category) => onPress(category),
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
      // onPress: (category) => onPress(category),
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
      // onPress: (category) => onPress(category),
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
      // onPress: (category) => onPress(category),
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
      // onPress: (category) => onPress(category),
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
      // onPress: (category) => onPress(category),
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
      // onPress: (category) => onPress(category),
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
      // onPress: (category) => onPress(category),
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
      // onPress: (category) => onPress(category),
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
      // onPress: (category) => onPress(category),
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
      // onPress: (category) => onPress(category),
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
      // onPress: (category) => onPress(category),
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
      // onPress: (category) => onPress(category),
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
      // onPress: (category) => onPress(category),
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
      // onPress: (category) => onPress(category),
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
      // onPress: (category) => onPress(category),
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
      // onPress: (category) => onPress(category),
    },
  ]

  return (
    <View style={{ ...styles.container }}>
      {categories.map((category, index) => {
        return (
          labels.includes(category.label) && (
            <TouchableOpacity
              style={{
                backgroundColor: category.color,
                borderRadius: 50,
                padding: 10,
              }}
              onPress={onPress}
              key={`${category.label}Categories`}
            >
              {category.icon}
            </TouchableOpacity>
          )
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // paddingTop: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',

    flexDirection: 'row',
  },
  picture: {
    height: 80,
    width: 80,
  },
  sprite: {
    height: 16,
    width: 50,
  },
})
