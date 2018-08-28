chmod +x AuthExec.sh
chmod +x publishone.sh
./AuthExec.sh

./build.sh $1
./CopyToWebsite.sh $1
./hotcode.sh $1oht

