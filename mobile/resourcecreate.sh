
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd ${DIR} || exit

./fileprepare.sh $1

ionic cordova resources android  --force
ionic cordova resources ios --force

cp  -R ./resources ../resources/$1oht_res/


cp  -f ./config.xml ./buildconfig/$1oht_res/config.xml     



