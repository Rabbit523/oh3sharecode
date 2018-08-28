
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd ${DIR} || exit

cp  -R ../resources/$1oht_res/resources/* ./resources/
./fileprepare.sh $1

rm -r ./platforms
mkdir ./platforms


#sudo ionic cordova platform rm android

sudo ionic cordova platform add android@6.3.0
#sudo ionic cordova platform rm ios
sudo ionic cordova platform add ios@4.4.0
#sudo ionic cordova platform add ios@latest

cp  -R ./platforms ../resources/$1oht_res/



