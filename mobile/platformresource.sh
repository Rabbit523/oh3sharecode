
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd ${DIR} || exit

cp -R ./buildconfig/$1oht_res/icon.png        ./resources/icon.png
cp -R ./buildconfig/$1oht_res/splash.png      ./resources/splash.png

sudo ionic cordova resources

cp -R ./resources/* ../resources/$1oht_res/resources/ 
