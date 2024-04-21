import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {MarketItem} from '../../../constants/interfaces/IMarketItem.ts';
import {useSelector} from 'react-redux';
import {Colors} from '../../../constants/Colors.ts';
import i18next from 'i18next';
import {CryptoCurrency} from '../../../constants/interfaces/ICryptoCurrency.ts';

interface MarketListItemProps {
  item: MarketItem;
  t: (key: string) => string;
  navigation: any;
  currencies: CryptoCurrency | undefined;
}

const MarketListItem: React.FC<MarketListItemProps> = ({
  item,
  navigation,
  currencies,
}) => {
  const {theme} = useSelector((state: any) => state.themeReducer);

  const language = i18next.language;
  const translatedName = language === 'fa' ? item.name.fa : item.name.en;
  const translatedSell =
    language === 'fa'
      ? item.quote_currency_symbol.fa
      : item.quote_currency_symbol.en;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate('MarketDetailPage', {item});
      }}>
      <View style={[styles.box, {backgroundColor: theme.CAROUSEL_ITEM_COLOR}]}>
        <Image source={{uri: item.logo}} style={styles.logo} />
        <View style={styles.itemContainer}>
          <View style={styles.infoContainer}>
            <Text style={[styles.name, {color: theme.SECONDARY_TEXT_COLOR}]}>
              {translatedName} ({item.base_currency_symbol.en})
            </Text>
            <View style={styles.priceBox}>
              <Text>{item.base_precision}X</Text>
            </View>
          </View>
          <View style={[styles.infoContainer, {marginTop: 5}]}>
            <Text style={[styles.price, {color: theme.SECONDARY_TEXT_COLOR}]}>
              {item.sell.toLocaleString()}
              <Text style={styles.currency}> {translatedSell}</Text>
            </Text>
            <View style={styles.amountBox}>
              <Text>{item.amount_step}%</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
  },
  box: {
    flexDirection: 'row',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 15,
    elevation: 2,
    shadowColor: 'rgba(204,204,204,0.87)',
    shadowRadius: 6,
    shadowOpacity: 1,
    backgroundColor: 'pink',
    borderWidth: 0.25,
    borderColor: Colors.gray,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  itemContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 5,
  },
  currency: {
    fontSize: 11,
  },
  priceBox: {
    backgroundColor: Colors.lightyellow,
    padding: 4,
    borderRadius: 5,
  },
  amountBox: {
    backgroundColor: Colors.green,
    padding: 4,
    borderRadius: 5,
  },
});

export default MarketListItem;
