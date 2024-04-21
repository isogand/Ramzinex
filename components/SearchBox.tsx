import React, {useEffect, useState} from 'react';
import {
  Platform,
  TextInput,
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-remix-icon';
import {useSelector} from 'react-redux';
import {Colors} from '../constants/Colors.ts';
import {Button} from './index.ts';
import {MarketItem} from '../constants/interfaces/IMarketItem.ts';

interface SearchViewProps {
  onSearch: (searchText: string) => void;
  placeholder: string;
  listData: MarketItem[];
  setListData: any;
}

const SearchBox: React.FC<SearchViewProps> = ({
  onSearch,
  placeholder,
  listData,
  setListData,
}) => {
  const [searchText, setSearchText] = useState<string>(''); // State for search text
  const [modalVisible, setModalVisible] = useState<boolean>(false); // State for modal visibility
  const {theme} = useSelector((state: any) => state.themeReducer); // Selecting theme from Redux store

  // Function to sort list data
  const handleSort = (
    sortFunction: (a: MarketItem, b: MarketItem) => number,
  ) => {
    const sortedData = [...listData].sort(sortFunction); // Creating a sorted copy of listData
    setListData(sortedData); // Updating listData state with sorted data
  };

  // Sorting function by price
  const handleSortByPrice = () => {
    handleSort((a, b) => a.buy - b.buy); // Sorting based on 'buy' price
  };

  // Sorting function by volume
  const handleSortByVolume = () => {
    handleSort(
      (a, b) =>
        a.financial?.last24h.base_volume - b.financial?.last24h.base_volume ??
        0,
    ); // Sorting based on base_volume
  };

  // Sorting function by name
  const handleSortByName = () => {
    handleSort((a, b) =>
      a.name.fa.localeCompare(b.name.fa, 'fa', {sensitivity: 'base'}),
    ); // Sorting based on name in Persian ('fa')
  };

  // Sorting function by changes
  const handleSortByChanges = () => {
    handleSort(
      (a, b) =>
        (a.financial?.last24h?.change_percent ?? 0) -
        (b.financial?.last24h?.change_percent ?? 0),
    ); // Sorting based on change_percent
  };

  // Options for sorting
  const sortingOptions = [
    {title: 'تغییرات', onPress: handleSortByChanges}, // Sorting by changes
    {title: 'قیمت', onPress: handleSortByPrice}, // Sorting by price
    {title: 'حجم', onPress: handleSortByVolume}, // Sorting by volume
    {title: 'نام', onPress: handleSortByName}, // Sorting by name
  ];

  // Function to open modal
  const openModal = () => {
    setModalVisible(true); // Setting modal visibility to true
  };

  // Effect to handle search when search text or list data changes
  useEffect(() => {
    if (searchText) {
      const lowercaseSearchText = searchText.toLowerCase(); // Converting search text to lowercase
      onSearch(lowercaseSearchText); // Triggering search with lowercase text
    }
  }, [searchText, listData]); // Dependency array includes searchText and listData

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          backgroundColor: theme.CAROUSEL_ITEM_COLOR,
          flexDirection: 'row',
          borderRadius: 10,
          justifyContent: 'space-between',
          padding: Platform.OS === 'ios' ? 12 : undefined,
        }}>
        <View
          style={{
            alignItems: Platform.OS === 'android' ? 'center' : undefined,
            justifyContent: Platform.OS === 'android' ? 'center' : undefined,
            marginLeft: Platform.OS === 'android' ? 10 : undefined,
            flexDirection: 'row',
          }}>
          <Icon name="ri-search-line" size={22} color="gray" />
          <TextInput
            style={{
              paddingHorizontal: 10,
              borderRadius: 5,
              fontFamily: 'Vazirmatn-Bold',
              fontSize: 14,
              textAlign: 'right',
            }}
            placeholder={placeholder}
            onChangeText={text => setSearchText(text)}
            value={searchText}
            placeholderTextColor={'gray'}
          />
        </View>
        <TouchableOpacity onPress={openModal}>
          <Icon name="ri-line-height" size={22} color="gray" />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.modalContent,
              {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR},
            ]}>
            <View style={styles.line} />
            <View style={styles.icon}>
              <Icon
                name={'ri-close-fill'}
                color={Colors.black}
                size={25}
                onPress={() => setModalVisible(false)}
              />
            </View>
            <View style={styles.buttonsContainer}>
              {sortingOptions.map((option, index) => (
                <Button
                  key={index}
                  title={option.title}
                  onPress={option.onPress}
                  width={70}
                  height={50}
                  borderRadius={10}
                  textStyle={{
                    fontSize: 14,
                    color: Colors.yellow,
                  }}
                  style={{
                    margin: 10,
                    borderWidth: 2,
                    borderColor: Colors.yellow,
                  }}
                />
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 10,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  input: {
    paddingHorizontal: 10,
    borderRadius: 5,
    fontFamily: 'Vazirmatn-Bold',
    fontSize: 14,
    textAlign: 'right',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.22)',
  },
  modalContent: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
    width: '100%',
    height: '25%',
    position: 'absolute',
    bottom: 0,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: Colors.yellow,
    alignSelf: 'center',
    borderRadius: 2,
    marginTop: 15,
  },
  icon: {
    width: '80%',
  },
  buttonsContainer: {
    flexDirection: 'row',
    margin: 20,
  },
});

export default SearchBox;
