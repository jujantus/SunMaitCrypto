import {StyleSheet} from 'react-native';
import {getScaledRoundedValue} from '../../common/metrics';

export const styles = StyleSheet.create({
  topContainer: {
    paddingTop: getScaledRoundedValue(75),
    paddingBottom: getScaledRoundedValue(10),
    borderBottomColor: '#BCB8B1',
    borderBottomWidth: getScaledRoundedValue(2),
  },
  bottomContainer: {
    backgroundColor: '#F4F3EE',
    height: getScaledRoundedValue(150),
    borderTopColor: '#BCB8B1',
    borderTopWidth: getScaledRoundedValue(2),
    justifyContent: 'space-around',
    marginBottom: getScaledRoundedValue(20),
  },
  flatlistContainer: {
    paddingTop: getScaledRoundedValue(20),
    paddingBottom: getScaledRoundedValue(100),
    alignItems: 'center',
  },
  itemSeparator: {
    margin: getScaledRoundedValue(10),
  },
  filterInput: {
    width: getScaledRoundedValue(80),
    height: getScaledRoundedValue(40),
    padding: getScaledRoundedValue(10),
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: getScaledRoundedValue(5),
  },
  loaderContainer: {
    height: '100%',
    justifyContent: 'center',
  },
});
