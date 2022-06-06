import {StyleSheet} from 'react-native';

const ItemStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 3,
    margin: 9,
  },
  headerItem: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHeader: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bodyItem: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerItem: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ItemStyle;
