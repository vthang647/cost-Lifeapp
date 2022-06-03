import {StyleSheet} from 'react-native';

const ItemStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
