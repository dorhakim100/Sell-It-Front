import { View, StyleSheet } from 'react-native'

function ListItemSeparator({ color }) {
  return <View style={{ ...styles.separator, backgroundColor: color }} />
}

const styles = StyleSheet.create({
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: 'black',
  },
})

export default ListItemSeparator
