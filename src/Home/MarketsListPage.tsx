import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  Button,
  FlatList,
  Pressable,
} from 'react-native';
import {HomeNavigationProps} from '../../components/Navigation.tsx';
import {Header, CustomModal, SearchBox} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {themeActions} from '../../store/ThemeSlice.ts';
import {useTranslation} from 'react-i18next';
import {changeLanguage} from 'i18next';
import {Colors} from '../../constants/Colors.ts';
import axios from 'axios';
import MarketListItem from './components/MarketListItem.tsx';
import {MarketItem} from '../../constants/interfaces/IMarketItem.ts';
import Icon from 'react-native-remix-icon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CryptoCurrency} from '../../constants/interfaces/ICryptoCurrency.ts';
import NetInfo from '@react-native-community/netinfo';

const SIZE = 30;
const REACT_APP_API_URL = 'http://127.0.0.1:9000/';
const languages = [
  {code: 'en', name: 'English', image: require('../../assets/flag/en.png')},
  {code: 'fa', name: 'فارسی', image: require('../../assets/flag/ir.png')},
];
const MarketListPage = ({
  navigation,
}: HomeNavigationProps<'MarketListPage'>) => {
  const {isDarkMode, theme} = useSelector((state: any) => state.themeReducer);
  const flatListRef = useRef<FlatList | null>(null);
  const {t} = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [ListData, setListData] = useState([]);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [currencies, setCurrencies] = useState<CryptoCurrency>();
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const dispatch = useDispatch();
  const toggleDarkMode = () => {
    dispatch(themeActions.darkMod());
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if the device is connected to the internet
        const netInfoState = await NetInfo.fetch();

        // Load persisted data from AsyncStorage
        const persistedData = await AsyncStorage.getItem('marketListings');

        if (netInfoState.isConnected && persistedData) {
          // If connected to the internet and data is available in cache, use cached data
          setListData(JSON.parse(persistedData));
        } else {
          // If not connected to the internet or no cached data available, fetch fresh data from the API
          const marketListingsResponse = await axios.get(
            `${REACT_APP_API_URL}Market%20listings.json`,
          );
          setListData(marketListingsResponse.data.data);

          // Save the fetched data to AsyncStorage
          await AsyncStorage.setItem(
            'marketListings',
            JSON.stringify(marketListingsResponse.data.data),
          );
        }

        // Fetch fresh data for currencies from the API
        const currenciesResponse = await axios.get(
          `${REACT_APP_API_URL}currencies.json`,
        );
        setCurrencies(currenciesResponse.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call fetchData initially
    fetchData();

    // Set up interval to fetch data every 20 seconds
    const id = setInterval(fetchData, 20000);
    setIntervalId(id);

    // Clean up interval on component unmount
    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId); // Check if intervalId is not null before clearing
      }
    };
  }, []); // Empty dependency array to run only once

  useEffect(() => {
    // Function to filter data based on search text
    const filteredData = ListData?.filter(item =>
      item?.name.en.toLowerCase().includes(searchText.toLowerCase()),
    );
    setListData(filteredData);
  }, [searchText]);

  const scrollToTop = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({offset: 0, animated: true});
    }
  };
  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const threshold = 200; // You can adjust this threshold as needed

    setShowScrollToTop(offsetY > threshold);
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR},
      ]}>
      <Header
        left={{
          icon: isDarkMode ? 'moon-line' : 'sun-line',
          onPress: toggleDarkMode,
        }}
        leftsecond={{
          icon: 'ri-settings-3-line',
          onPress: () => setModalVisible(true),
        }}
        title={t('Ramzinex')}
        right={{
          icon: 'ri-money-dollar-circle-line',
          onPress: () => {},
        }}
      />
      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={t('زبان')}>
        {languages.map(lang => (
          <TouchableOpacity
            key={lang.code}
            style={styles.languageOption}
            onPress={() => changeLanguage(lang.code)}>
            <Image source={lang.image} style={styles.languageImage} />
            <Text style={styles.languageText}>{lang.name}</Text>
          </TouchableOpacity>
        ))}
        <Button title={t('بستن')} onPress={() => setModalVisible(false)} />
      </CustomModal>

      <SearchBox
        onSearch={(text: string) => setSearchText(text)}
        listData={ListData}
        setListData={setListData}
        placeholder="Enter search text..."
      />

      <View style={{marginTop: SIZE / 1.5}}>
        {!ListData ? (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>No data available</Text>
          </View>
        ) : (
          currencies && (
            <FlatList
              ref={flatListRef}
              data={ListData}
              keyExtractor={(item: MarketItem, index: number) =>
                item.pair_id.toString()
              }
              renderItem={({item}) => (
                <MarketListItem
                  item={item}
                  t={t}
                  navigation={navigation}
                  currencies={currencies}
                />
              )}
              onScroll={handleScroll}
              scrollEventThrottle={10}
            />
          )
        )}
        {showScrollToTop && (
          <Pressable style={styles.scrollToTopButton} onPress={scrollToTop}>
            <Icon name={'ri-arrow-up-line'} color={Colors.white} size={30} />
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  languageOption: {
    paddingVertical: SIZE / 2,
    paddingHorizontal: SIZE,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageText: {
    fontSize: SIZE / 2,
    marginLeft: SIZE / 2,
  },
  languageImage: {
    width: SIZE,
    height: SIZE / 2,
  },
  scrollToTopButton: {
    position: 'absolute',
    bottom: '25%',
    right: '10%',
    backgroundColor: Colors.yellow,
    padding: 15,
    borderRadius: 50,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 20,
    color: Colors.gray,
  },
});

export default MarketListPage;
