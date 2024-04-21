import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {MarketItem} from '../../constants/interfaces/IMarketItem.ts';
import {HomeNavigationProps} from '../../components/Navigation.tsx';
import {Header} from '../../components';
import {useSelector} from 'react-redux';
import {Colors} from '../../constants/Colors.ts';
import Icon from 'react-native-remix-icon';
import i18next from 'i18next';

interface MarketDetailPageProps {
  item: MarketItem;
}

const DATA = [
  {code: 'واریز', codeEn: 'Deposit', name: 'ri-arrow-up-circle-line'},
  {code: 'انتقال', codeEn: 'Transfer', name: 'ri-arrow-down-circle-line'},
  {code: 'تبادل', codeEn: 'Exchange', name: 'ri-arrow-up-down-line'},
  {code: 'برداشت', codeEn: 'Withdraw', name: 'ri-arrow-up-down-line'},
];
const MarketDetailPage: React.FC<HomeNavigationProps<'MarketDetailPage'>> = ({
  navigation,
  route,
}) => {
  const {theme} = useSelector((state: any) => state.themeReducer);
  const item: MarketItem = (route.params as unknown as MarketDetailPageProps)
    ?.item;
  const {financial} = item;
  const financialEntries = Object.entries(financial.last24h);

  // Determine the current language
  const language = i18next.language;

  // Translate the item name and currency symbol based on the selected language
  const translatedName = language === 'fa' ? item.name.fa : item.name.en;
  const translatedCurrencySymbol =
    language === 'fa'
      ? item.base_currency_symbol.fa
      : item.base_currency_symbol.en;

  return (
    <View style={{flex: 1, backgroundColor: theme.PRIMARY_BACKGROUND_COLOR}}>
      <Header
        variant={'primary'}
        title={translatedName}
        right={{
          icon: 'ri-arrow-left-s-line',
          onPress: () => navigation.goBack(),
        }}
      />

      <View style={{alignItems: 'center'}}>
        <View style={styles.container}>
          <Image source={{uri: item.logo}} style={styles.logo} />
        </View>
        <View style={{alignItems: 'center', width: '100%'}}>
          <Text style={[styles.name, {color: theme.SECONDARY_TEXT_COLOR}]}>
            {item.sell.toLocaleString()}{' '}
            {translatedCurrencySymbol.toUpperCase()}{' '}
            {/* Use translated currency symbol */}
          </Text>
          <View style={styles.tableContainer}>
            {financialEntries.map(([key, value], index) => (
              <React.Fragment key={key}>
                <View style={styles.row}>
                  <Text
                    style={[styles.label, {color: theme.SECONDARY_TEXT_COLOR}]}>
                    {key}
                  </Text>
                  <Text
                    style={[styles.value, {color: theme.SECONDARY_TEXT_COLOR}]}>
                    {value}
                  </Text>
                </View>
                {index !== financialEntries.length - 1 && (
                  <View style={styles.horizontalLine} />
                )}
              </React.Fragment>
            ))}
          </View>
          <View style={[styles.horizontalLine, {marginVertical: 15}]} />
          <View style={{flexDirection: 'row'}}>
            {DATA.map((item, index) => (
              <View
                style={{marginHorizontal: 15, alignItems: 'center'}}
                key={`${item.code}-${index}`}>
                <View
                  style={{
                    backgroundColor: Colors.lightyellow,
                    width: 55,
                    height: 55,
                    borderRadius: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Icon name={item.name} size={33} color={Colors.yellow} />
                </View>
                <Text
                  style={{color: theme.SECONDARY_TEXT_COLOR, marginTop: 10}}>
                  {language === 'fa' ? item.code : item.codeEn}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  logo: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  tableContainer: {
    marginTop: 20,
    width: '80%',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  value: {
    fontSize: 16,
  },
  horizontalLine: {
    width: '90%',
    backgroundColor: Colors.gray,
    height: 1,
  },
});

export default MarketDetailPage;
