cd core
rm -rf node_modules/@ionic-native

npm install --save @ionic-native/core@^4.4.2
npm install --save @ionic-native/http@^4.4.2
npm install --save @ionic-native/media@^4.4.2
npm install --save @ionic-native/network@^4.4.2
npm install --save @ionic-native/file-transfer@^4.4.2

cd ../mobile
rm -rf plugins/*
rm -rf node_modules/@ionic-native
rm -rf platforms/android

# ionic cordova plugin add com-sarriaroman-photoviewer@~1.1.11
# ionic cordova plugin add cordova-plugin-advanced-http@~1.8.1
# ionic cordova plugin add cordova-plugin-crop@~0.4.0
# ionic cordova plugin add cordova-plugin-media@~4.0.0 
# ionic cordova plugin add cordova-plugin-network-information@~1.3.4
# ionic cordova plugin add cordova-plugin-camera@~3.0.0 --variable CAMERA_USAGE_DESCRIPTION="您是否同意该应用使用您的手机拍照." --variable PHOTOLIBRARY_USAGE_DESCRIPTION="您是否同意该应用访问您的相册来选取一个照片."  #"cordova-plugin-camera": "^2.4.1"
# ionic cordova plugin add cordova-plugin-device@~1.1.7
# ionic cordova plugin add cordova-plugin-file@~5.0.0
# ionic cordova plugin add cordova-plugin-file-transfer@~1.7.0
# ionic cordova plugin add cordova-plugin-geolocation@~3.0.0 --variable GEOLOCATION_USAGE_DESCRIPTION="请求获取位置"
# ionic cordova plugin add cordova-plugin-splashscreen@~4.1.0
# ionic cordova plugin add cordova-plugin-statusbar@~2.3.0
# ionic cordova plugin add cordova-plugin-whitelist@~1.3.3
# ionic cordova plugin add cordova-hot-code-push-plugin@~1.5.3

npm install --save @ionic-native/core@^4.4.2
npm install --save @ionic-native/photo-viewer@^4.4.2
npm install --save @ionic-native/http@^4.4.2
npm install --save @ionic-native/crop@^4.4.2
npm install --save @ionic-native/media@^4.4.2
npm install --save @ionic-native/network@^4.4.2
npm install --save @ionic-native/camera@^4.4.2
npm install --save @ionic-native/device@^4.4.2
npm install --save @ionic-native/file@^4.4.2
npm install --save @ionic-native/file-transfer@^4.4.2
npm install --save @ionic-native/geolocation@^4.4.2
npm install --save @ionic-native/splash-screen@^4.4.2
npm install --save @ionic-native/status-bar@^4.4.2

ionic cordova platforms add android@6.3.0
#ionic cordova platforms add ios@4.5.1

npm install --save angular-2-local-storage@~1.0.1
npm install --save chart.js@~2.6.0
npm install --save ionic2-rating@~1.2.2
npm install --save videogular2@~4.2.0
npm install --save moment@~2.17.1
npm install --save @ngrx/core@~1.2.0
npm install --save @ngrx/effects@~2.0.5
npm install --save @ngrx/store@~2.2.2
npm install --save ngrx-store-freeze@~0.1.9
npm install --save ngrx-store-logger@~0.1.7
npm install --save @ngx-translate/core@~8.0.0
npm install --save @ngx-translate/http-loader@~0.1.0
