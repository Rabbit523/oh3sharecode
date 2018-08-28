#!/bin/bash
TipFun(){
  pwd
  echo “$1”
  ##read -n1 -r -p "按任意键继续" key
}


DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd ${DIR} || exit


TipFun "9.sudo mount -t smbfs //administrator:railsky-123@10.1.0.83/C /Volumes/C"
cd ${DIR}

sudo umount /Volumes/C
sudo mkdir /Volumes
sudo mkdir  /Volumes/C

sudo mount -t smbfs //administrator:railsky-123@10.1.0.83/C /Volumes/C

TipFun "10.sudo cp -r android-release.apk"

#sudo cp -f /Users/macosx/OhIonic2/mobile/platforms/android/build/outputs/apk/release/android-release.apk /Volumes/C/json-server/ObeHeartUpdate/apk/$1oht.apk
sudo cp -f /Users/macosx/OhIonic2/mobile/platforms/android/build/outputs/apk/android-release.apk /Volumes/C/json-server/ObeHeartUpdate/apk/$1oht.apk
#sudo cp -f /Users/macosx/OhIonic2/mobile/platforms/android/build/outputs/apk/android-debug.apk /Volumes/C/json-server/ObeHeartUpdate/apk/$1oht.apk
