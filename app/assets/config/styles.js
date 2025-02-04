import { Platform } from 'react-native'

import colors from './color'

export default {
  colors, // for accessing everything from one object
  text: {
    color: colors.darkGray,
    fontSize: 18,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
  },
  error: {
    color: colors.error,
    fontWeight: 800,
    width: 'fit-content',
    marginHorizontal: 10,
  },
  input: {
    flexDirection: 'row',
    padding: 10,

    gap: 5,
    backgroundColor: colors.lightGray,
    borderRadius: 50,
    width: '100%',
    padding: 15,
    marginVertical: 10,
  },
}
