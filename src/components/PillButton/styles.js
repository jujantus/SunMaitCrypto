import {StyleSheet} from 'react-native';
import {getScaledRoundedValue} from '../../common/metrics';

export const styles = StyleSheet.create({
  buttonContainer: {
    padding: getScaledRoundedValue(10),
    borderRadius: getScaledRoundedValue(15),
    alignItems: 'center',
    backgroundColor: '#BF6900',
  },
  disabledButtonContainer: {
    padding: getScaledRoundedValue(10),
    borderRadius: getScaledRoundedValue(15),
    alignItems: 'center',
    backgroundColor: '#BCB8B1',
  },
  buttonText: {
    fontWeight: 'bold',
  },
  disabledButtonText: {
    fontWeight: 'bold',
    color: 'white',
  },
});
