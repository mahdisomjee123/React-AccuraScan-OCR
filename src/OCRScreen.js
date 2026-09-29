import * as React from 'react';

import AccurascanOcr from 'react-native-accurascan-ocr';

import {
    Text,
    View,
    ScrollView,
    ImageBackground,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet
  } from 'react-native';


export default function OCRScreen({ route, navigation }) {
    var mrzSelected;
    var countrySelected;
    var cardSelected;
  
    const { objSDKRes, ocrContries, barcodeTypes} = route.params;
  
    onPressBankcard = () => {
      AccurascanOcr.startBankCard((error, response) => {
        if (error != null) {
          console.log('Failure!', error);
        } else {
          const res = this.getResultJSON(response);
          navigation.navigate('Result Screen',{
            result: res,
          })
        }
      });
    };
  
      onPressMRZ = () => {
      var isValid = true;
      if (mrzSelected === '' || mrzSelected === null) {
        isValid = false;
      }
  
      if (isValid) {
        let passArgs = [mrzSelected];
        //Method for start MRZ scaning from native OS.
        AccurascanOcr.startMRZ(passArgs, (error, response) => {
          if (error != null) {
            console.log('Failure!', error);
          } else {
            const res = this.getResultJSON(response);
            navigation.navigate('Result Screen',{
              result: res,
         })
          }
        });
      }
    };
  
    getResultJSON = (jsonString) => {
      var json;
      try {
        // eslint-disable-next-line no-eval
        json = eval(jsonString);
      } catch (exception) {
        try {
          json = JSON.parse(jsonString);
        } catch (exception) {
          json = null;
          console.log('NOT VAID JSON');
        }
      }
      if (json) {
        console.log('VAID JSON');
        return json;
      }
      return null;
    }
  
        return (
          <ImageBackground
            source={require('./assets/images/background.png')}
            style={styles.backgroundView}
          >
            <>
              <SafeAreaView>
                <View>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                      {ocrContries.map((Country) => {
                        return (
                          <View>
                            <TouchableOpacity
                              onPress={() => {
                                console.log('country selected', Country.value);
                                if (
                                  Country.label === 'Passport' ||
                                  Country.label === 'Mrz ID' ||
                                  Country.label === 'Visa Card' ||
                                  Country.label === 'Other'
                                ) {
                                  mrzSelected = Country.value;
                                  this.onPressMRZ();
                                } else if (Country.label === 'Barcode') {
                                  navigation.navigate('Barcode List',{
                                    barcodeTypes: barcodeTypes,
                                  })
                                } else if (Country.label === 'BankCard') {
                                  onPressBankcard();
                                } else {
                                  countrySelected =
                                    objSDKRes?.countries[
                                      Country.value
                                    ];
                                  cardSelected = countrySelected.cards;
  
                                  navigation.navigate('Card List',{
                                    countrySelected: countrySelected,
                                    cardSelected: cardSelected,
                            })
                                }
                              }}
                            >
                              {Country.label === 'Passport' ||
                              Country.label === 'Mrz ID' ||
                              Country.label === 'Visa Card' ||
                              Country.label === 'Other' ||
                              Country.label === 'Barcode' ||
                              Country.label === 'BankCard' ? (
                                <Text
                                  style={{
                                    flex: 1,
                                    backgroundColor: 'grey',
                                    color: 'white',
                                    padding: 15,
                                    margin: 5,
                                    height: 50,
                                    textAlign: 'left',
                                    borderRadius: 10,
                                    fontWeight: 'bold',
                                    overflow: 'hidden',
                                  }}
                                >
                                  {Country.label}
                                </Text>
                              ) : (
                                <Text
                                  style={{
                                    flex: 1,
                                    backgroundColor: '#D5323F',
                                    color: 'white',
                                    padding: 15,
                                    margin: 5,
                                    height: 50,
                                    textAlign: 'left',
                                    borderRadius: 10,
                                    fontWeight: 'bold',
                                    overflow: 'hidden',
                                  }}
                                >
                                  {Country.label}
                                </Text>
                              )}
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                    </View>
                  </ScrollView>
                </View>
              </SafeAreaView>
            </>
          </ImageBackground>
        );
   }

const styles = StyleSheet.create({
    backgroundView: {
        flex: 1,
      }, 
});