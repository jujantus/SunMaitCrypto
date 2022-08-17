import React, {useState} from 'react';
import {ScrollView, View, Text, TextInput} from 'react-native';

import {PillButton} from '../../components/PillButton/PillButton';
import {globalStyles} from '../../common/styles';
import {styles} from './style';
import {useDispatch} from 'react-redux';
import {logIn} from '../../state/auth';

export const LoginScreen = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  return (
    <ScrollView contentContainerStyle={globalStyles.mainView}>
      <View style={globalStyles.mainContainer}>
        <Text>Enter your user name</Text>
        <TextInput
          style={styles.userNameInput}
          onChangeText={setText}
          value={text}
        />
        <PillButton
          text={'Log In'}
          disabled={!text}
          onPress={() => dispatch(logIn(text))}
        />
      </View>
    </ScrollView>
  );
};
