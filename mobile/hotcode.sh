DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd ${DIR} || exit

sudo umount /Volumes/C
sudo mkdir /Volumes
sudo mkdir  /Volumes/C
sudo mount -t smbfs //administrator:railsky-123@10.1.0.83/C /Volumes/C

sudo rm -rf /Volumes/C/json-server/ObeHeartUpdate/$1
sudo mkdir /Volumes/C/json-server/ObeHeartUpdate/$1

sudo rm -rf /Volumes/C/json-server/hotcode/$1.json
sudo cp -r ./cordova-hcp.json  /Volumes/C/json-server/hotcode/$1.json
cd www
sudo cp -r .  /Volumes/C/json-server/ObeHeartUpdate/$1/