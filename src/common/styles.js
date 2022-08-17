import {StyleSheet} from 'react-native';
import {getScaledRoundedValue} from './metrics';

const PAGE_PADDING = getScaledRoundedValue(20);

export const globalStyles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    width: '100%',
    paddingHorizontal: PAGE_PADDING,
  },
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
