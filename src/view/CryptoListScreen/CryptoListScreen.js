import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import {View, Text, ActivityIndicator, FlatList, TextInput} from 'react-native';

import {CoinButton} from '../../components/CoinButton/CoinButton';
import {PillButton} from '../../components/PillButton/PillButton';
import {globalStyles} from '../../common/styles';
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
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener(state => {
      if (!state.isConnected || state.isInternetReachable === false) {
        setOffline(true);
      } else {
        setOffline(false);
      }
    });

    return () => removeNetInfoSubscription();
  }, []);

  useEffect(() => {
    if (offline) {
      navigation.navigate(ROUTES.LOST_CONNECTION_MODAL);
    }
  }, [offline, navigation]);

  useEffect(() => {
    setFilteredCoins(coinsList);
    setFilter('');
  }, [coinsList]);

  const renderItem = ({item}) => {
    return (
      <CoinButton
        disabled={offline}
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
            <Text style={styles.greetingText}>
              Hello, {userName}! Welcome to SunMait crypto viewer!
            </Text>
          </View>
          {isLoading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#BF6900" />
            </View>
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
          <Text>Not {userName}?</Text>
          <PillButton text={'Log out'} onPress={() => dispatch(logOut())} />
        </View>
      </View>
    </>
  );
};
