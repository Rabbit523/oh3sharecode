##npm install -g ionic@3.13.2   ##https://github.com/ionic-team/ionic-cli
##npm install -g cordova@7.1.0 ##https://github.com/apache/cordova-cli/
##修改node的编译heap (NPM全局配置)
## ionic info  可以查看ionic的目录
##%AppData%\Roaming\npm => ionic --max-old-space-size=2048

## 升级 yarn 界面好点
#npm uninstall yarn -g
#npm install yarn@1.3.2 -g

cd core
rm -rf node_modules
rm -f yarn.lock
cd ..
./core.sh

cd mobile
rm -rf node_modules
rm -f yarn.lock
cd ..
./mobile.sh gener