import {StyleSheet} from 'react-native';
import {getScaledRoundedValue} from '../../common/metrics';

export const styles = StyleSheet.create({
  headerText: {
    marginVertical: getScaledRoundedValue(20),
    textAlign: 'center',
  },
  timerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    marginBottom: getScaledRoundedValue(30),
    textAlign: 'center',
  },
});
