import {StyleSheet} from 'react-native';
import {getScaledRoundedValue} from '../../common/metrics';

export const styles = StyleSheet.create({
  mainText: {
    fontSize: getScaledRoundedValue(30),
    marginBottom: getScaledRoundedValue(30),
    paddingHorizontal: getScaledRoundedValue(20),
    textAlign: 'center',
  },
});
