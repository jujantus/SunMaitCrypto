import React from 'react';
import {Text, View} from 'react-native';
import {globalStyles} from '../../common/styles';
import {PillButton} from '../../components/PillButton/PillButton';
import {styles} from './style';

export const LostConnectionModal = ({navigation}) => {
  return (
    <View style={globalStyles.mainView}>
      <Text style={styles.mainText}>
        Whoops! Seems like you lost your connection
      </Text>
      <PillButton onPress={() => navigation.goBack()} text="Dismiss" />
    </View>
  );
};
