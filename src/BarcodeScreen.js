import * as React from 'react';

import AccurascanOcr from 'react-native-accurascan-ocr';

import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
  } from 'react-native';


export default function BarcodeScreen({ route, navigation }){
    const { barcodeTypes } = route.params;
  
    var barcodeSelected;
  
      onPressBarcode = () => {
      var isValid = true;
      if (barcodeSelected?.toString() === '') {
        isValid = false;
      }
  
      if (isValid) {
        let passArgs = [barcodeSelected];
        //Method for start MRZ scaning from native OS.
        AccurascanOcr.startBarcode(passArgs, (error, response) => {
          if (error != null) {
            console.log('Failure!', error);
          } else {
            const res = getResultJSON(response);
            navigation.navigate('Result Screen',{
              result: res,
            })
          }
        });
      }
    }
  
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
          <>
            <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
              <ScrollView showsVerticalScrollIndicator={false}>
                {barcodeTypes.map((Cards) => {
                  return (
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          console.log(Cards);
                          barcodeSelected = Cards.value;
                          onPressBarcode();
                        }}
                      >
                        <Text
                          style={{
                            flex: 1,
                            fontWeight: 'bold',
                            borderRadius: 10,
                            color: 'white',
                            backgroundColor: '#D5323F',
                            padding: 15,
                            margin: 5,
                            height: 50,
                            textAlign: 'left',
                            overflow: 'hidden',
                          }}
                        >
                          {Cards.label}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </>
        );
   }