
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd ${DIR} || exit

cd ${DIR}


pwd
rm -r ./resources
mkdir ./resources
cp  -R ../resources/$1oht_res/resources/* ./resources/
ls ./resources
pwd


rm -r ./platforms
mkdir ./platforms
cp  -R ../resources/$1oht_res/platforms/* ./platforms/
ls ./platforms


./fileprepare.sh $1



cd ${DIR}
sudo chmod -R 777 *
cd platforms/ios
sudo chmod -R 777 .
sudo chown -R macosx .

cd ${DIR} || exit





