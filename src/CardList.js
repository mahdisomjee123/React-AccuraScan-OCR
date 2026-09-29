import * as React from 'react';

import AccurascanOcr from 'react-native-accurascan-ocr';

import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
  } from 'react-native';


export default function CardList({ route, navigation }) {

    const { countrySelected, cardSelected} = route.params;
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
    };
  
      onPressOCR = () => {
      var isValid = true;
      if (countrySelected === null || countrySelected === '') {
        isValid = false;
      }
  
      if (cardSelected === null || cardSelected === '') {
        isValid = false;
      }
  
      if (isValid) {
        let passArgs = [
          countrySelected.id,
          cardSelected.id,
          cardSelected.name,
          cardSelected.type,
        ]; 
  
        AccurascanOcr.startOcrWithCard(passArgs, (error, response) => {
          if (error != null) {
            console.log('Failure!', error);
          } else {
            const res = this.getResultJSON(response);
            // result = res;
            navigation.navigate('Result Screen',{
              result: res,
      })
          }
        });
      }
    };
  
          return (
          <>
            <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
              <ScrollView showsVerticalScrollIndicator={false}>
                {/* <View
                  style={{ flex: 1, padding: 20, backgroundColor: '#ffffff' }}
                > */}
                {cardSelected.map((Cards) => {
                  return (
                    <View
                      style={{
                        backgroundColor: '#ffffff',
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          cardSelected.id = Cards.id;
                          cardSelected.name = Cards.name;
                          cardSelected.type = Cards.type;
                          this.onPressOCR();
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
                          {Cards.name}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
                {/* </View> */}
              </ScrollView>
            </View>
          </>
        );
   }