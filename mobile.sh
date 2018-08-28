cd ./mobile
yarn
yarn link "oneheart-core"
#cp  -r ./buildconfig/$1_res/  ./resources
# npm uninstall cordova-ios
# npm install cordova-ios@4.4.0
if [ "$2" = "ios" ] ;  then
   echo -e  "\E[1;33m======publish ios debug======\E[0m"
   rm -rf ./resources/ios
   ionic cordova resources ios --force
   ionic cordova platform rm ios
   ionic cordova platform add ios@4.4.0
   ionic cordova build ios  $3 $4
elif [ "$2" = "apk" ] ;  then
   echo -e  "\E[1;33m======publish android debug======\E[0m"
   rm -rf ./resources/android
   ionic cordova resources android  --force
   ionic cordova platform rm android
   ionic cordova platform add android@6.3.0
   ionic cordova build android $3 $4
else
   echo -e  "\E[1;31m======local bowser debug======\E[0m"
   cp  -f ./buildconfig/$1oht_res/icon.png  ./resources/icon.png
   cp  -f ./buildconfig/$1oht_res/splash.png  ./resources/splash.png
   cp  -f ./buildconfig/$1oht_res/appicon-svg.png  ./src/assets/img/appicon-svg.png
   cp  -f ./buildconfig/$1oht_res/webappname.ts  ./src/shared/models/cache/webappname.ts
   cp  -f ./buildconfig/$1oht_res/cordova-hcp.json  ./cordova-hcp.json
   cp  -f ./buildconfig/$1oht_res/config.xml  ./config.xml
   ./filecopy.sh $1
   ionic serve
fi
##//node --max-old-space-size=8192 ./node_modules/@ionic/app-scripts/bin/ionic-app-scripts.js build