# React Native Accura Scan OCR

Accura Scan OCR is used for Optical character recognition.

Accura Scan Face Match is used for Matching 2 Faces, Source face and Target face. It matches the User Image from a Selfie vs User Image in document.

Accura Scan Authentication is used for your customer verification and authentication. Unlock the True Identity of Your Users with 3D Selfie Technology

Below steps to setup Accura Scan's SDK to your project.

## Note:-

`yarn add 'react-native-accurascan-ocr'`

OR

`npm i react-native-accurascan-ocr`

**Usage**
Import npm library into file.
`import AccurascanOcr from 'react-native-accurascan-ocr';`

## 1.Setup Android

**Add it in your root build.gradle at the end of repositories.**

```
allprojects {
    repositories {
        google()
        mavenCentral()
        maven { url 'https://jitpack.io/' }
        maven { url 'https://developer.huawei.com/repo/' } // Add Huawei Maven
        maven {
            url 'https://jitpack.io'
            credentials { username 'jp_g8ttn08p68n9brtt8jshql7q33' }
        }
    }
}
```

**Add it in your app/build.gradle file.**

```
packagingOptions {
   pickFirst 'lib/arm64-v8a/libcrypto.so'
   pickFirst 'lib/arm64-v8a/libssl.so'

   pickFirst 'lib/armeabi-v7a/libcrypto.so'
   pickFirst 'lib/armeabi-v7a/libssl.so'

   pickFirst 'lib/x86/libcrypto.so'
   pickFirst 'lib/x86/libssl.so'

   pickFirst 'lib/x86_64/libcrypto.so'
   pickFirst 'lib/x86_64/libssl.so'

}
splits {
  abi {
    ...
    reset()
    include 'armeabi-v7a', 'arm64-v8a', 'x86', 'x86_64'
  }
}
```

## 2.Setup iOS

1.Install Git LFS using command install `git-lfs`

2.Add the following in your podfile
`use_frameworks!` below `prepare_react_native_project!`

take reference from [here](https://github.com/Anaslokhandwala/Accurascan_KYC/blob/master/ios/Podfile)

3.Run `pod install`

**Add this permissions into iOS Info.plist file.**

```
<key>NSCameraUsageDescription</key>
<string>App usage camera for scan documents.</string>
```

## 3.Setup Accura Scan licenses into your projects

Accura Scan has two license require for use full functionality of this library. Generate your own Accura license from [here](https://accurascan.com/developer/dashboard) using your bundle id.

**key.license**

This license is compulsory for this library to work. it will get all setup of accura SDK.

**accuraface.license**

This license is use for get face match percentages between two face pictures.

**For Android**

```
Create "assets" folder under app/src/main and Add license file in to assets folder.
- key.license // for Accura Scan OCR
Generate your Accura Scan license from https://accurascan.com/developer/dashboard
```

**For iOS**

```
Place the license in your project's Runner directory, and add the licenses to the target.
```

## 4.Get license configuration from SDK. It returns all active functionalities of your license.

### Setting up License

```
  getAccuraSetup = () => {
    //Method for get license info from native OS.
    AccurascanOcr.getMetaData((error, response) => {
      if (error != null) {

      } else {
        console.log(response);
      }
    });
  };
```

**Error:** String

**Success:** JSON String Response = {
countries: Array[<CountryModels>],
barcodes: Array[],
isValid: boolean,
isOCREnable: boolean,
isBarcodeEnable: boolean,
isBankCardEnable: boolean,
isMRZEnable: boolean
}

### Setting up Configuration's,Error mssages and Scaning title messages

```
   setUpCustomMessages = () => {
      var config = {
        setFaceBlurPercentage: 80,
        setHologramDetection: true,
        setLowLightTolerance: 10,
        setMotionThreshold: 25,
        setMinGlarePercentage: 6,
        setMaxGlarePercentage: 99,
        setBlurPercentage: 60,
        setCameraFacing: 0,
      };
  
      var accuraConfigs = {
        flipImage: flipImagePath,
        CameraScreen_CornerBorder_Enable: true,
        CameraScreen_Border_Width: 15,
        Disable_Card_Name: false,
        enableLogs: 0,
        setCameraFacing: 0,
        isShowLogo: 1,
        isFlipImg: 1,
        CameraScreen_Frame_Color: '#D5323F',
        CameraScreen_Text_Color: '#FFFFFF',
        CameraScreen_Text_Border_Color: '#000000',
        CameraScreen_Color: '#80000000',
        CameraScreen_Back_Button: 1,
        CameraScreen_Change_Button: 1,
        ACCURA_ERROR_CODE_MOTION: 'Keep Document Steady',
        ACCURA_ERROR_CODE_DOCUMENT_IN_FRAME: 'Keep document in frame',
        ACCURA_ERROR_CODE_BRING_DOCUMENT_IN_FRAME: 'Bring card near to frame',
        ACCURA_ERROR_CODE_PROCESSING: 'Processing...',
        ACCURA_ERROR_CODE_BLUR_DOCUMENT: 'Blur detect in document',
        ACCURA_ERROR_CODE_FACE_BLUR: 'Blur detected over face',
        ACCURA_ERROR_CODE_GLARE_DOCUMENT: 'Glare detect in document',
        ACCURA_ERROR_CODE_HOLOGRAM: 'Hologram Detected',
        ACCURA_ERROR_CODE_DARK_DOCUMENT: 'Low lighting detected',
        ACCURA_ERROR_CODE_PHOTO_COPY_DOCUMENT:
          'Can not accept Photo Copy Document',
        ACCURA_ERROR_CODE_FACE: 'Face not detected',
        ACCURA_ERROR_CODE_MRZ: 'MRZ not detected',
        ACCURA_ERROR_CODE_PASSPORT_MRZ: 'Passport MRZ not detected',
        ACCURA_ERROR_CODE_ID_MRZ: 'ID MRZ not detected',
        ACCURA_ERROR_CODE_VISA_MRZ: 'Visa MRZ not detected',
        ACCURA_ERROR_CODE_UPSIDE_DOWN_SIDE:
          'Document is upside down. Place it properly',
        ACCURA_ERROR_CODE_WRONG_SIDE: 'Scanning wrong side of Document',
      };
  
      var accuraTitleMsg = {
        SCAN_TITLE_OCR_FRONT: 'Scan Front side of ',
        SCAN_TITLE_OCR_BACK: 'Scan Back side of ',
        SCAN_TITLE_OCR: 'Scan ',
        SCAN_TITLE_MRZ_PDF417_FRONT: 'Scan Front Side of Document',
        SCAN_TITLE_MRZ_PDF417_BACK: 'Scan Back Side of Document',
        SCAN_TITLE_DLPLATE: 'Scan Number plate',
        SCAN_TITLE_BARCODE: 'Scan Barcode',
        SCAN_TITLE_BANKCARD: 'Scan BankCard',
      };
  
      //Method for setup config into native OS.
      AccurascanOcr.setupAccuraConfig(
        [config, accuraConfigs, accuraTitleMsg],
        (error, response) => {
          if (error != null) {
            console.log('Failure!', error);
          } else {
            console.log('Message:- ', response);
          }
        }
      );
    };    setUpCustomMessages = () => {
      var config = {
        setFaceBlurPercentage: 80,
        setHologramDetection: true,
        setLowLightTolerance: 10,
        setMotionThreshold: 25,
        setMinGlarePercentage: 6,
        setMaxGlarePercentage: 99,
        setBlurPercentage: 60,
        setCameraFacing: 0,
      };
  
      var accuraConfigs = {
        flipImage: flipImage,
        CameraScreen_CornerBorder_Enable: true,
        CameraScreen_Border_Width: 15,
        Disable_Card_Name: false,
        enableLogs: 0,
        setCameraFacing: 0,
        isShowLogo: 1,
        isFlipImg: 1,
        CameraScreen_Frame_Color: '#D5323F',
        CameraScreen_Text_Color: '#FFFFFF',
        CameraScreen_Text_Border_Color: '#000000',
        CameraScreen_Color: '#80000000',
        CameraScreen_Back_Button: 1,
        CameraScreen_Change_Button: 1,
        ACCURA_ERROR_CODE_MOTION: 'Keep Document Steady',
        ACCURA_ERROR_CODE_DOCUMENT_IN_FRAME: 'Keep document in frame',
        ACCURA_ERROR_CODE_BRING_DOCUMENT_IN_FRAME: 'Bring card near to frame',
        ACCURA_ERROR_CODE_PROCESSING: 'Processing...',
        ACCURA_ERROR_CODE_BLUR_DOCUMENT: 'Blur detect in document',
        ACCURA_ERROR_CODE_FACE_BLUR: 'Blur detected over face',
        ACCURA_ERROR_CODE_GLARE_DOCUMENT: 'Glare detect in document',
        ACCURA_ERROR_CODE_HOLOGRAM: 'Hologram Detected',
        ACCURA_ERROR_CODE_DARK_DOCUMENT: 'Low lighting detected',
        ACCURA_ERROR_CODE_PHOTO_COPY_DOCUMENT:
          'Can not accept Photo Copy Document',
        ACCURA_ERROR_CODE_FACE: 'Face not detected',
        ACCURA_ERROR_CODE_MRZ: 'MRZ not detected',
        ACCURA_ERROR_CODE_PASSPORT_MRZ: 'Passport MRZ not detected',
        ACCURA_ERROR_CODE_ID_MRZ: 'ID MRZ not detected',
        ACCURA_ERROR_CODE_VISA_MRZ: 'Visa MRZ not detected',
        ACCURA_ERROR_CODE_UPSIDE_DOWN_SIDE:
          'Document is upside down. Place it properly',
        ACCURA_ERROR_CODE_WRONG_SIDE: 'Scanning wrong side of Document',
      };
  
      var accuraTitleMsg = {
        SCAN_TITLE_OCR_FRONT: 'Scan Front side of ',
        SCAN_TITLE_OCR_BACK: 'Scan Back side of ',
        SCAN_TITLE_OCR: 'Scan ',
        SCAN_TITLE_MRZ_PDF417_FRONT: 'Scan Front Side of Document',
        SCAN_TITLE_MRZ_PDF417_BACK: 'Scan Back Side of Document',
        SCAN_TITLE_DLPLATE: 'Scan Number plate',
        SCAN_TITLE_BARCODE: 'Scan Barcode',
        SCAN_TITLE_BANKCARD: 'Scan BankCard',
      };
  
      //Method for setup config into native OS.
      AccurascanOcr.setupAccuraConfig(
        [config, accuraConfigs, accuraTitleMsg],
        (error, response) => {
          if (error != null) {
            console.log('Failure!', error);
          } else {
            console.log('Message:- ', response);
          }
        }
      );
    };    setUpCustomMessages = () => {
      var config = {
        setFaceBlurPercentage: 80,
        setHologramDetection: true,
        setLowLightTolerance: 10,
        setMotionThreshold: 25,
        setMinGlarePercentage: 6,
        setMaxGlarePercentage: 99,
        setBlurPercentage: 60,
        setCameraFacing: 0,
      };
  
      var accuraConfigs = {
        flipImage: flipImage,
        CameraScreen_CornerBorder_Enable: true,
        CameraScreen_Border_Width: 15,
        Disable_Card_Name: false,
        enableLogs: 0,
        setCameraFacing: 0,
        isShowLogo: 1,
        isFlipImg: 1,
        CameraScreen_Frame_Color: '#D5323F',
        CameraScreen_Text_Color: '#FFFFFF',
        CameraScreen_Text_Border_Color: '#000000',
        CameraScreen_Color: '#80000000',
        CameraScreen_Back_Button: 1,
        CameraScreen_Change_Button: 1,
        ACCURA_ERROR_CODE_MOTION: 'Keep Document Steady',
        ACCURA_ERROR_CODE_DOCUMENT_IN_FRAME: 'Keep document in frame',
        ACCURA_ERROR_CODE_BRING_DOCUMENT_IN_FRAME: 'Bring card near to frame',
        ACCURA_ERROR_CODE_PROCESSING: 'Processing...',
        ACCURA_ERROR_CODE_BLUR_DOCUMENT: 'Blur detect in document',
        ACCURA_ERROR_CODE_FACE_BLUR: 'Blur detected over face',
        ACCURA_ERROR_CODE_GLARE_DOCUMENT: 'Glare detect in document',
        ACCURA_ERROR_CODE_HOLOGRAM: 'Hologram Detected',
        ACCURA_ERROR_CODE_DARK_DOCUMENT: 'Low lighting detected',
        ACCURA_ERROR_CODE_PHOTO_COPY_DOCUMENT:
          'Can not accept Photo Copy Document',
        ACCURA_ERROR_CODE_FACE: 'Face not detected',
        ACCURA_ERROR_CODE_MRZ: 'MRZ not detected',
        ACCURA_ERROR_CODE_PASSPORT_MRZ: 'Passport MRZ not detected',
        ACCURA_ERROR_CODE_ID_MRZ: 'ID MRZ not detected',
        ACCURA_ERROR_CODE_VISA_MRZ: 'Visa MRZ not detected',
        ACCURA_ERROR_CODE_UPSIDE_DOWN_SIDE:
          'Document is upside down. Place it properly',
        ACCURA_ERROR_CODE_WRONG_SIDE: 'Scanning wrong side of Document',
      };
  
      var accuraTitleMsg = {
        SCAN_TITLE_OCR_FRONT: 'Scan Front side of ',
        SCAN_TITLE_OCR_BACK: 'Scan Back side of ',
        SCAN_TITLE_OCR: 'Scan ',
        SCAN_TITLE_MRZ_PDF417_FRONT: 'Scan Front Side of Document',
        SCAN_TITLE_MRZ_PDF417_BACK: 'Scan Back Side of Document',
        SCAN_TITLE_DLPLATE: 'Scan Number plate',
        SCAN_TITLE_BARCODE: 'Scan Barcode',
        SCAN_TITLE_BANKCARD: 'Scan BankCard',
      };
  
      //Method for setup config into native OS.
      AccurascanOcr.setupAccuraConfig(
        [config, accuraConfigs, accuraTitleMsg],
        (error, response) => {
          if (error != null) {
            console.log('Failure!', error);
          } else {
            console.log('Message:- ', response);
          }
        }
      );
    };

```

## 5.Method for scan MRZ documents.

```
onPressMRZ = () => {
   let passArgs = [ mrzSelected];
   //Method for start MRZ scaning from native OS.
   AccurascanOcr.startMRZ(passArgs, (error, response) => {
     if (error != null) {
       console.log('Failure!', error);
        showAlert('Failure!', error);
     } else {
       console.log('Success!', response);
     }
   });
};
```

**MRZType:** String

#### value: other_mrz or passport_mrz or id_mrz or visa_mrz<br></br>

**Success:** JSON Response {
front_data: JSONObjects?,
back_data: JSONObjects?,
type: Recognition Type,
face: URI?
front_img: URI?
back_img: URI?
}

**Error:** String

## 6.Method for scan OCR documents.

```
onPressOCR = () => {
   let passArgs = [
      countrySelected.id,  //integer
      cardSelected.id,     //integer
      cardSelected.name,   //String
      cardSelected.type,   //integer
   ]; //[{"enableLogs":false},1,41,"Emirates National ID",0,"portrait-primary"]
   //Method for start OCR scaning from native OS.
   AccurascanOcr.startOcrWithCard(passArgs, (error, response) => {
     if (error != null) {
       console.log('Failure!', error);
     } else {
       console.log('Success!', response);
     }
   });
};
```

**Success:** JSON Response
**Error:** String

## 7.Method for scan barcode.

```
onPressBarcode = () => {
   let passArgs = [ barcodeSelected];
   //Method for start MRZ scaning from native OS.
   AccurascanOcr.startBarcode(passArgs, (error, response) => {
     if (error != null) {
       console.log('Failure!', error);
     } else {
       console.log('Success!', response);
     }
   });
};
```

**Success:** JSON Response
**Error:** String

## 8.Method for scan bankcard.

```
onPressBankcard = () => {
 AccurascanOcr.startBankCard((error, response) => {
   if (error != null) {
     console.log('Failure!', error);
   } else {
      console.log('Success!', response);
   }
 });
};
```

**Success:** JSON Response
**Error:** String

Contributing
See the contributing guide to learn how to contribute to the repository and the development workflow.

License:
MIT
