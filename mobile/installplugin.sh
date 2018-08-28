#!/bin/bash
TipFun(){
  pwd
  echo “$1”
  ##read -n1 -r -p "按任意键继续" key
}



DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd ${DIR} || exit
##npm config set registry https://registry.npm.taobao.org
npm remove ionic-native
cordova plugin remove cordova-plugin-app-version --save
cordova plugin remove cordova-plugin-network-information  
cordova plugin remove cropperjs --save
cordova plugin remove cordova-plugin-mauron85-background-geolocation --save
cordova plugin remove jpush-phonegap-plugin
cordova plugin remove cordova-plugin-console --save

npm -g install ionic-native@2.2.16 
npm install
npm install videogular2 --save
npm install @types/core-js --save
npm install moment --save
npm install ionic-cache --save
npm install chart.js --save
npm install -g bower
bower install ionic-cache-src
ionic plugin add cordova-plugin-file-transfer --save
ionic plugin add cordova-plugin-camera --save
ionic plugin add cordova.plugins.diagnostic  --save
ionic plugin add ionic-plugin-keyboard  --save
ionic plugin add cordova-plugin-splashscreen --save
cordova plugin add cordova-plugin-crop --save
cordova plugin add cordova-plugin-geolocation --save
cordova plugin add cordova-plugin-file --save
cordova plugin add cordova-plugin-http --save
cordova plugin add com-sarriaroman-photoviewer --save
cordova plugin add cordova-plugin-network-information@latest   --save
##cordova plugin add cordova-plugin-mauron85-background-geolocation --save
cordova plugin add cordova-plugin-media --save

TipFun "1.我们需要安装热更新插件和文件管理插件cordova plugin add cordova-hot-code-push-plugin"
cd ${DIR}
cordova plugin add cordova-hot-code-push-plugin --save
TipFun "2.我们需要安装热更新插件和文件管理插件cordova plugin add cordova-hot-code-push-local-dev-addon"
##cordova plugin remove cordova-hot-code-push-local-dev-addon --save
##TipFun "3.我们需要安装热更新插件和文件管理插件npm install -g cordova-hot-code-push-cli"
##npm install -g cordova-hot-code-push-cli --save
##npm install -g cordova-hot-code-push-cli
TipFun "4.我们需要安装热更新插件和文件管理插件cordova-plugin-file-transfer"
cordova plugin add cordova-plugin-file-transfer --save

## yarn add signalr-no-jquery

npm install --save @ionic-native/qr-scanner
ionic cordova plugin add cordova-plugin-qrscanner