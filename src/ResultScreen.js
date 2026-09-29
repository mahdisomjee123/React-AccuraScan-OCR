import * as React from 'react';

import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    Image
  } from 'react-native';


export default function ResultScreen({ route }){
    const { result } = route.params;
    var facematchURI;
  
  
      getResultType = (type) => {
      switch (type) {
        case 'BANKCARD':
          return 'Bank Card Data';
        case 'DL_PLATE':
          return 'Vehicle Plate';
        case 'BARCODE':
          return 'Barcode Data';
        case 'PDF417':
          return 'PDF417 Barcode';
        case 'OCR':
          return 'OCR Front';
        case 'MRZ':
          return 'MRZ';
        case 'BARCODEPDF417':
          return 'USA DL Result';
        default:
          return 'Front Side';
      }
    };
  
    getMRZLable = (key) => {
      var lableText = '';
      switch (key) {
        case 'lines':
          lableText += 'MRZ';
          break;
        case 'placeOfBirth':
          lableText += 'Place Of Birth';
          break;
        case 'retval':
          lableText += 'Retval';
          break;
        case 'givenNames':
          lableText += 'First Name';
          break;
        case 'country':
          lableText += 'Country';
          break;
        case 'surName':
          lableText += 'Last Name';
          break;
        case 'expirationDate':
          lableText += 'Date of Expiry';
          break;
        case 'passportType':
          lableText += 'Document Type';
          break;
        case 'personalNumber':
          lableText += 'Other ID';
          break;
        case 'correctBirthChecksum':
          lableText += 'Correct Birth Check No.';
          break;
        case 'correctSecondrowChecksum':
          lableText += 'Correct Second Row Check No.';
          break;
        case 'personalNumberChecksum':
          lableText += 'Other Id Check No.';
          break;
        case 'secondRowChecksum':
          lableText += 'Second Row Check No.';
          break;
        case 'expirationDateChecksum':
          lableText += 'Expiration Check No.';
          break;
        // case 'correctPersonalChecksum':
        //   lableText += 'Correct Document check No.';
        //   break;
        case 'passportNumber':
          lableText += 'Document No.';
          break;
        case 'correctExpirationChecksum':
          lableText += 'Correct Expiration Check No.';
          break;
        case 'sex':
          lableText += 'Sex';
          break;
        case 'birth':
          lableText += 'Date Of Birth';
          break;
        case 'birthChecksum':
          lableText += 'Birth Check No.';
          break;
        case 'personalNumber2':
          lableText += 'Other ID2';
          break;
        case 'correctPassportChecksum':
          lableText += 'Correct Document check No.';
          break;
        case 'placeOfIssue':
          lableText += 'Place Of Issue';
          break;
        case 'nationality':
          lableText += 'Nationality';
          break;
        case 'passportNumberChecksum':
          lableText += 'Document check No.';
          break;
        case 'issueDate':
          lableText += 'Date Of Issue';
          break;
        case 'departmentNumber':
          lableText += 'Department No.';
          break;
        default:
          lableText += key;
          break;
      }
      return lableText;
    };
  
    if (result === undefined || result === null) {
          return;
    }
  
        if (result.hasOwnProperty('face')) {
          facematchURI = result?.face;
        }
        var sides = ['front_data', 'back_data'];
        return (
          <>
            <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View
                  style={{
                    backgroundColor: 'white',
                    padding: 20,
                    flex: 1,
                  }}
                >
                  {result.hasOwnProperty('face') ? (
                    <View style={styles.modelFace}>
                      <View
                        style={{
                          width: '100%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'row',
                        }}
                      >
                        <Image
                          style={styles.faceImageView}
                          source={{ uri: result?.face }}
                        />
                      </View>
                    </View>
                  ) : (
                    <View />
                  )}
  
                  <View style={{ marginTop: -20 }}>
                    {sides.map((side, index) => {
                      return (
                        <View key={index.toString()}>
                          {result.hasOwnProperty(side) ? (
                            Object.keys(result[side]).length > 0 ? (
                              <View>
                                {index === 0 ? (
                                  <View style={styles.dataHeader}>
                                    <Text
                                      style={{ fontSize: 18, fontWeight: 'bold' }}
                                    >
                                      {getResultType(result?.type)}
                                    </Text>
                                  </View>
                                ) : (
                                  <View style={styles.dataHeader}>
                                    <Text
                                      style={{ fontSize: 18, fontWeight: 'bold' }}
                                    >
                                      {'OCR Back'}
                                    </Text>
                                  </View>
                                )}
                                {Object.keys(result[side]).map(
                                  (key, index) => {
                                    return (
                                      <View key={index.toString()}>
                                        {key !== 'PDF417' ? (
                                          ![
                                            'signature',
                                            'front_img',
                                            'back_img',
                                          ].includes(key) ? (
                                            result.type === 'MRZ' ? (
                                              <View style={styles.dataItem}>
                                                <Text style={styles.lblDataTitle}>
                                                  {getMRZLable(key)}
                                                </Text>
                                                <Text style={styles.lblDataText}>
                                                  {result[side][
                                                    key
                                                  ].toString()}
                                                </Text>
                                              </View>
                                            ) : (
                                              <View style={styles.dataItem}>
                                                <Text style={styles.lblDataTitle}>
                                                  {key}
                                                </Text>
                                                <Text style={styles.lblDataText}>
                                                  {result[side][
                                                    key
                                                  ].toString()}
                                                </Text>
                                              </View>
                                            )
                                          ) : key === 'signature' ? (
                                            <View style={styles.dataItem}>
                                              <Text style={styles.lblDataTitle}>
                                                {key}
                                              </Text>
                                              <Image
                                                style={styles.signatureImage}
                                                source={{
                                                  uri: result[side][key],
                                                }}
                                              />
                                            </View>
                                          ) : (
                                            <View />
                                          )
                                        ) : (
                                          <View />
                                        )}
                                      </View>
                                    );
                                  }
                                )}
                              </View>
                            ) : (
                              <View />
                            )
                          ) : (
                            <View />
                          )}
                        </View>
                      );
                    })}
                    {result.hasOwnProperty('mrz_data') ? (
                      Object.keys(result.mrz_data).length > 0 ? (
                        <>
                          <View style={styles.dataHeader}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                              {'MRZ'}
                            </Text>
                          </View>
                          {Object.keys(result.mrz_data).map((key, index) => {
                            return (
                              <View
                                style={styles.dataItem}
                                key={index.toString()}
                              >
                                <Text style={styles.lblDataTitle}>
                                  {getMRZLable(key)}
                                </Text>
                                <Text style={styles.lblDataText}>
                                  {result.mrz_data[key].toString()}
                                </Text>
                              </View>
                            );
                          })}
                        </>
                      ) : (
                        <View />
                      )
                    ) : (
                      <View />
                    )}
                  </View>
                  {result.hasOwnProperty('front_img') ? (
                    <View>
                      <View style={styles.dataHeader}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                          {'FRONT SIDE'}
                        </Text>
                      </View>
                      <View style={{ marginVertical: 10, borderRadius: 10 }}>
                        <Image
                          style={styles.cardImage}
                          source={{ uri: result.front_img }}
                        />
                      </View>
                    </View>
                  ) : (
                    <View />
                  )}
  
                  {result.hasOwnProperty('back_img') ? (
                    <View>
                      <View style={styles.dataHeader}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                          {'BACK SIDE'}
                        </Text>
                      </View>
                      <View style={{ marginVertical: 10, borderRadius: 10 }}>
                        <Image
                          style={styles.cardImage}
                          source={{ uri: result.back_img }}
                        />
                      </View>
                    </View>
                  ) : (
                    <View />
                  )}
                </View>
              </ScrollView>
            </View>
          </>
        );
   }

   const styles = StyleSheet.create({

    dataHeader: {
        width: '100%',
        backgroundColor: 'lightgrey',
        padding: 10,
      },
      dataItem: {
        width: '100%',
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1,
        paddingHorizontal: 5,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
      },
      lblDataTitle: {
        fontSize: 16,
        color: '#d22c39',
        flex: 2,
        paddingHorizontal: 5,
      },
      lblDataText: {
        fontSize: 16,
        flex: 1,
        color: '#000000',
      },
      signatureImage: {
        aspectRatio: 3 / 2,
        width: '50%',
        borderRadius: 10,
        resizeMode: 'contain',
        alignSelf: 'flex-start',
      },
      cardImage: {
        aspectRatio: 3 / 2,
        width: '100%',
        borderRadius: 10,
        resizeMode: 'contain',
        backgroundColor: 'lightgrey',
      },
      faceImageView: {
        height: 140,
        width: 100,
        borderRadius: 10,
        backgroundColor: 'lightgrey',
      },
      modelFace: {
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
      },
   });