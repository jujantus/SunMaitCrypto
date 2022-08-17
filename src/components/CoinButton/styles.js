import {StyleSheet} from 'react-native';
import {getScaledRoundedValue} from '../../common/metrics';

export const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: getScaledRoundedValue(70),
    width: getScaledRoundedValue(70),
    marginHorizontal: getScaledRoundedValue(8),
    paddingVertical: getScaledRoundedValue(10),
    borderRadius: getScaledRoundedValue(5),
    borderWidth: getScaledRoundedValue(2),
    borderColor: '#BF6900',
    backgroundColor: '#F4F3EE',
  },
  disabledBackground: {
    backgroundColor: '#BCB8B1',
  },
  coinSymbol: {
    fontWeight: 'bold',
    fontSize: getScaledRoundedValue(12),
  },
  coinName: {
    fontSize: getScaledRoundedValue(8),
  },
  percentChange: {
    fontSize: getScaledRoundedValue(10),
  },
});
