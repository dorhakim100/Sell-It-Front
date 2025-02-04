import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, Button, Dimensions } from 'react-native'
import { capitalizeFirstLetter } from '../services/utils'

const screenWidth = Dimensions.get('window').width

function Types({ types, isSprite }) {
  const [pngTypes, setPngTypes] = useState([])

  useEffect(() => {
    setTypes(types)
  }, [types])

  // Import all images statically

  function setTypes(types) {
    const typeIcons = {
      grass: require('../imgs/types/png/Pokemon_Type_Icon_Grass.png'),
      fire: require('../imgs/types/png/Pokemon_Type_Icon_Fire.png'),
      water: require('../imgs/types/png/Pokemon_Type_Icon_Water.png'),
      electric: require('../imgs/types/png/Pokemon_Type_Icon_Electric.png'),
      psychic: require('../imgs/types/png/Pokemon_Type_Icon_Psychic.png'),
      ice: require('../imgs/types/png/Pokemon_Type_Icon_Ice.png'),
      dragon: require('../imgs/types/png/Pokemon_Type_Icon_Dragon.png'),
      dark: require('../imgs/types/png/Pokemon_Type_Icon_Dark.png'),
      fairy: require('../imgs/types/png/Pokemon_Type_Icon_Fairy.png'),
      fighting: require('../imgs/types/png/Pokemon_Type_Icon_Fighting.png'),
      flying: require('../imgs/types/png/Pokemon_Type_Icon_Flying.png'),
      ghost: require('../imgs/types/png/Pokemon_Type_Icon_Ghost.png'),
      ground: require('../imgs/types/png/Pokemon_Type_Icon_Ground.png'),
      normal: require('../imgs/types/png/Pokemon_Type_Icon_Normal.png'),
      poison: require('../imgs/types/png/Pokemon_Type_Icon_Poison.png'),
      rock: require('../imgs/types/png/Pokemon_Type_Icon_Rock.png'),
      steel: require('../imgs/types/png/Pokemon_Type_Icon_Steel.png'),
      bug: require('../imgs/types/png/Pokemon_Type_Icon_Bug.png'),
    }

    const spriteIcons = {
      grass: require('../imgs/types/sprite/grass.png'),
      fire: require('../imgs/types/sprite/fire.png'),
      water: require('../imgs/types/sprite/water.png'),
      electric: require('../imgs/types/sprite/electric.png'),
      psychic: require('../imgs/types/sprite/psychic.png'),
      ice: require('../imgs/types/sprite/ice.png'),
      dragon: require('../imgs/types/sprite/dragon.png'),
      dark: require('../imgs/types/sprite/dark.png'),
      fairy: require('../imgs/types/sprite/fairy.png'),
      fighting: require('../imgs/types/sprite/fighting.png'),
      flying: require('../imgs/types/sprite/flying.png'),
      ghost: require('../imgs/types/sprite/ghost.png'),
      ground: require('../imgs/types/sprite/ground.png'),
      normal: require('../imgs/types/sprite/normal.png'),
      poison: require('../imgs/types/sprite/poison.png'),
      rock: require('../imgs/types/sprite/rock.png'),
      steel: require('../imgs/types/sprite/steel.png'),
      bug: require('../imgs/types/sprite/bug.png'),
    }
    const pngs = types.map((type) => {
      if (isSprite) return spriteIcons[type]
      return typeIcons[type]
    })
    setPngTypes(pngs)
  }

  return (
    <View style={{ ...styles.container, gap: isSprite ? 5 : 15 }}>
      {pngTypes.map((type, index) => {
        return (
          <Image
            key={index}
            source={type}
            style={isSprite ? styles.sprite : styles.picture}
          ></Image>
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

export default Types
