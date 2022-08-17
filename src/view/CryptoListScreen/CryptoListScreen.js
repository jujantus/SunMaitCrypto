import React, {useEffect, useState} from 'react';

import {View, Text, ActivityIndicator, FlatList, TextInput} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {globalStyles} from '../../common/styles';
import {CoinButton} from '../../components/CoinButton/CoinButton';
import {PillButton} from '../../components/PillButton/PillButton';
import {ROUTES} from '../../navigation/routes';
import {logOut} from '../../state/auth';
import {styles} from './style';

export const CryptoListScreen = ({navigation}) => {
  const userName = useSelector(state => state.auth?.userName);
  const coinsList = useSelector(state => state.coins?.list?.data);
  const isLoading = useSelector(state => state.coins?.list?.loading);
  const dispatch = useDispatch();

  const [filteredCoins, setFilteredCoins] = useState(coinsList);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    setFilteredCoins(coinsList);
    setFilter('');
  }, [coinsList]);

  const renderItem = ({item}) => {
    return (
      <CoinButton
        coin={item}
        onPress={() =>
          navigation.navigate(ROUTES.CRYPTO_CHART, {
            id: item.id,
            title: item.name,
          })
        }
      />
    );
  };

  const applyFilter = () => {
    if (filter === '') {
      return setFilteredCoins(coinsList);
    }
    const parsedFilter = parseInt(filter, 10);
    if (isNaN(parsedFilter)) {
      return;
    }
    setFilteredCoins(
      coinsList.filter(
        coin => parseInt(coin.percent_change_24h, 10) >= parsedFilter,
      ),
    );
  };

  const resetFilter = () => {
    setFilter('');
    setFilteredCoins(coinsList);
  };

  return (
    <>
      <View style={globalStyles.mainView}>
        <View style={globalStyles.mainContainer}>
          <View style={styles.topContainer}>
            <Text>Hello, {userName}! Welcome to SunMait crypto viewer!</Text>
          </View>
          {isLoading ? (
            <ActivityIndicator size="large" color="#BF6900" />
          ) : (
            <FlatList
              contentContainerStyle={styles.flatlistContainer}
              ItemSeparatorComponent={() => (
                <View style={styles.itemSeparator} />
              )}
              data={filteredCoins}
              numColumns={4}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={globalStyles.flexContainer}>
          <Text>Filter by 24hr variation</Text>
        </View>
        <View style={globalStyles.flexContainer}>
          <TextInput
            style={styles.filterInput}
            value={filter}
            onChangeText={setFilter}
          />
          <PillButton text={'Apply'} onPress={applyFilter} />
          <PillButton text={'Reset'} onPress={resetFilter} />
        </View>
        <View style={globalStyles.flexContainer}>
          <Text ellipsizeMode="tail">Not {userName}?</Text>
          <PillButton text={'Log out'} onPress={() => dispatch(logOut())} />
        </View>
      </View>
    </>
  );
};
