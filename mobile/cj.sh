# function getdir(){    
#     for file in $1/*
#     do
#     if test -f $file
#     then
#         if [[ $file == *'screen.png'* ]]
#         then
#             echo 'screen '$file
#         fi 
#         if [[ $file == *'icon.png'* ]]
#         then
#             echo 'icon '$file                   
#         fi            
#     else
#         getdir $file    
#     fi
#     done
# }
# getdir 'appsplashres/resources'$1'/android'
# getdir 'platforms/android/res'

cp appsplashres/resources$1/android/icon/drawable-hdpi-icon.png platforms/android/res/mipmap-hdpi/icon.png
cp appsplashres/resources$1/android/icon/drawable-ldpi-icon.png platforms/android/res/mipmap-ldpi/icon.png
cp appsplashres/resources$1/android/icon/drawable-mdpi-icon.png platforms/android/res/mipmap-mdpi/icon.png
cp appsplashres/resources$1/android/icon/drawable-xhdpi-icon.png platforms/android/res/mipmap-xhdpi/icon.png
cp appsplashres/resources$1/android/icon/drawable-xxhdpi-icon.png platforms/android/res/mipmap-xxhdpi/icon.png
cp appsplashres/resources$1/android/icon/drawable-xxxhdpi-icon.png platforms/android/res/mipmap-xxxhdpi/icon.png

cp appsplashres/resources$1/android/splash/drawable-land-hdpi-screen.png platforms/android/res/drawable-land-hdpi/screen.png
cp appsplashres/resources$1/android/splash/drawable-land-ldpi-screen.png platforms/android/res/drawable-land-ldpi/screen.png
cp appsplashres/resources$1/android/splash/drawable-land-mdpi-screen.png platforms/android/res/drawable-land-mdpi/screen.png
cp appsplashres/resources$1/android/splash/drawable-land-xhdpi-screen.png platforms/android/res/drawable-land-xhdpi/screen.png
cp appsplashres/resources$1/android/splash/drawable-land-xxhdpi-screen.png platforms/android/res/drawable-land-xxhdpi/screen.png
cp appsplashres/resources$1/android/splash/drawable-land-xxxhdpi-screen.png platforms/android/res/drawable-land-xxxhdpi/screen.png
cp appsplashres/resources$1/android/splash/drawable-port-hdpi-screen.png platforms/android/res/drawable-port-hdpi/screen.png
cp appsplashres/resources$1/android/splash/drawable-port-ldpi-screen.png platforms/android/res/drawable-port-ldpi/screen.png
cp appsplashres/resources$1/android/splash/drawable-port-mdpi-screen.png platforms/android/res/drawable-port-mdpi/screen.png
cp appsplashres/resources$1/android/splash/drawable-port-xhdpi-screen.png platforms/android/res/drawable-port-xhdpi/screen.png
cp appsplashres/resources$1/android/splash/drawable-port-xxhdpi-screen.png platforms/android/res/drawable-port-xxhdpi/screen.png
cp appsplashres/resources$1/android/splash/drawable-port-xxxhdpi-screen.png platforms/android/res/drawable-port-xxxhdpi/screen.png

ionic cordova build android --release --prod