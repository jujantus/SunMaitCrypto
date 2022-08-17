import {StyleSheet} from 'react-native';
import {getScaledRoundedValue} from '../../common/metrics';

export const styles = StyleSheet.create({
  userNameInput: {
    marginTop: getScaledRoundedValue(10),
    marginBottom: getScaledRoundedValue(30),
    height: getScaledRoundedValue(40),
    padding: getScaledRoundedValue(10),
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: getScaledRoundedValue(5),
  },
});
