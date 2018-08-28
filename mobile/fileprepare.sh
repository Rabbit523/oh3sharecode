
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd ${DIR} || exit

## 资源文件
cp  -f ./buildconfig/$1oht_res/appicon-svg.png  ./src/assets/img/appicon-svg.png
cp  -f ./buildconfig/$1oht_res/appicon.png      ./src/assets/img/appicon.png

cp  -f ./buildconfig/$1oht_res/icon.png         ./resources/icon.png
cp  -f ./buildconfig/$1oht_res/splash.png       ./resources/splash.png

## 配置文件
cp  -f ./buildconfig/$1oht_res/cordova-hcp.json ./cordova-hcp.json
cp  -f ./buildconfig/$1oht_res/config.xml       ./config.xml
#cp  -f ./buildconfig/package.json               ./package.json

## 页面文件
chmod +x ./filecopy.sh
sudo ./filecopy.sh $1 'pub'

