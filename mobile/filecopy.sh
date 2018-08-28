
company='empty'
case $1 in 'gener') company=$1 ;;
'hebjwd') company=$1 ;;
'whdgl') company=$1 ;;
'xyfire') company=$1 ;;
'xygdd') company=$1 ;;
'xyjwd') company=$1 ;;
'xysky') company=$1 ;;
*) company='empty'
esac
if [ $company == 'empty' ]; then
    echo '错误的参数'  
else     
    if [ $2 == 'pub' ]; then
        echo "###### pub file"
        cp  -f ./buildconfig/$1oht_res/src/assets/i18n/data.json ./src/assets/i18n/data.json
        cp  -f ./buildconfig/$1oht_res/src/pages/login/login.html ./src/pages/login/login.html
        cp  -f ./buildconfig/$1oht_res/src/pages/login/login.scss ./src/pages/login/login.scss
        cp  -f ./buildconfig/$1oht_res/src/pages/tabs/tabspage.html ./src/pages/tabs/tabspage.html
        cp  -f ./buildconfig/$1oht_res/src/pages/tabs/tabspage.ts ./src/pages/tabs/tabspage.ts
        cp  -f ./buildconfig/$1oht_res/src/pages/firstpage/firstpage.html ./src/pages/firstpage/firstpage.html
        cp  -f ./buildconfig/$1oht_res/src/pages/firstpage/firstpage.scss ./src/pages/firstpage/firstpage.scss
        cp  -f ./buildconfig/$1oht_res/src/pages/firstpage/firstpage.ts ./src/pages/firstpage/firstpage.ts
        cp  -f ./buildconfig/$1oht_res/src/pages/application/applicationpage.html ./src/pages/application/applicationpage.html
        cp  -f ./buildconfig/$1oht_res/src/pages/application/applicationpage.ts ./src/pages/application/applicationpage.ts
        cp  -f ./buildconfig/$1oht_res/src/pages/my/setuppage/setupbtnlist.html ./src/pages/my/setuppage/setupbtnlist.html
        cp  -f ./buildconfig/$1oht_res/src/pages/event-detail/event-detail.html ./src/pages/event-detail/event-detail.html
        cp  -f ./buildconfig/$1oht_res/src/pages/event-list/eventlistmenufiltercontent.html ./src/pages/event-list/eventlistmenufiltercontent.html
        cp  -f ./buildconfig/$1oht_res/src/pages/event-list/eventlistmenufiltercontent.scss ./src/pages/event-list/eventlistmenufiltercontent.scss
        cp  -f ./buildconfig/$1oht_res/src/pages/event-list/eventlistmenufiltercontent.ts ./src/pages/event-list/eventlistmenufiltercontent.ts
        cp  -f ./buildconfig/$1oht_res/src/index.html ./src/index.html
        cp  -f ./buildconfig/$1oht_res/webappname.ts ./src/shared/models/cache/webappname.ts
        echo "###### pub file ok"
    elif [ $2 == 'bak' ]; then
        echo "###### bak file"
        cp  -f ./src/assets/i18n/data.json ./buildconfig/$1oht_res/src/assets/i18n/data.json
        cp  -f ./src/pages/login/login.html ./buildconfig/$1oht_res/src/pages/login/login.html
        cp  -f ./src/pages/login/login.scss ./buildconfig/$1oht_res/src/pages/login/login.scss
        cp  -f ./src/pages/tabs/tabspage.html ./buildconfig/$1oht_res/src/pages/tabs/tabspage.html
        cp  -f ./src/pages/tabs/tabspage.ts ./buildconfig/$1oht_res/src/pages/tabs/tabspage.ts
        cp  -f ./src/pages/firstpage/firstpage.html ./buildconfig/$1oht_res/src/pages/firstpage/firstpage.html
        cp  -f ./src/pages/firstpage/firstpage.scss ./buildconfig/$1oht_res/src/pages/firstpage/firstpage.scss
        cp  -f ./src/pages/firstpage/firstpage.ts ./buildconfig/$1oht_res/src/pages/firstpage/firstpage.ts
        cp  -f ./src/pages/application/applicationpage.html ./buildconfig/$1oht_res/src/pages/application/applicationpage.html
        cp  -f ./src/pages/application/applicationpage.ts ./buildconfig/$1oht_res/src/pages/application/applicationpage.ts
        cp  -f ./src/pages/my/setuppage/setupbtnlist.html ./buildconfig/$1oht_res/src/pages/my/setuppage/setupbtnlist.html
        cp  -f ./src/pages/event-detail/event-detail.html ./buildconfig/$1oht_res/src/pages/event-detail/event-detail.html
        cp  -f ./src/pages/event-list/eventlistmenufiltercontent.html ./buildconfig/$1oht_res/src/pages/event-list/eventlistmenufiltercontent.html
        cp  -f ./src/pages/event-list/eventlistmenufiltercontent.scss ./buildconfig/$1oht_res/src/pages/event-list/eventlistmenufiltercontent.scss
        cp  -f ./src/pages/event-list/eventlistmenufiltercontent.ts ./buildconfig/$1oht_res/src/pages/event-list/eventlistmenufiltercontent.ts
        cp  -f ./src/index.html ./buildconfig/$1oht_res/src/index.html
        cp  -f ./src/shared/models/cache/webappname.ts ./buildconfig/$1oht_res/webappname.ts
        echo "###### bak file ok"
    else
        echo "###### no file copy or bak"
    fi
fi

