import { PostItemShow, PostListModel, PostTypeEnum } from '../webapi/eventpost/postlistmodel';
import { Utils } from '../../utils/utils';
import { WebapiConfig } from '../../config/webapiconfig';
import { ContactorCacheHelper } from './contactorcachehelper';

export class PostListModelHelper {

    static CalcPostItemShowsPersonIndex(posts: PostItemShow[]): PostItemShow[] {
        var personindexs = [];
        posts.forEach(post => {
            if (personindexs[post.personid]) {
                post.PersonIndex = personindexs[post.personid];
            }
            else {
                post.PersonIndex = personindexs.length;
                personindexs[post.personid] = post.PersonIndex;
            }
        });
        return posts;
    }
    static InitPostItems(Post: Array<PostListModel>, segment: string): Array<PostItemShow> {
        var excludeupdate = PostListModelHelper.PostListModelItemsByType(Post, segment);
        if (segment == 'excludeupdate' && excludeupdate.length == 0) {
            segment = "update";
            excludeupdate = PostListModelHelper.PostListModelItemsByType(Post, segment);
        }
        return excludeupdate;
    }
    static PostListModelItemsByType(post: PostListModel[], type: string): PostItemShow[] {

        var result = new Array<PostItemShow>();
        let isUpdate = (type == "update");
        if (post) {
            post.forEach(item => {
                if (type == "*") {
                    result.push(PostListModelHelper.PostListModelItemBy(item, isUpdate));
                }
                else if (type == "excludeupdate") {
                    if (item.TxtDetail.bp_type != "update") {
                        result.push(PostListModelHelper.PostListModelItemBy(item, isUpdate));
                    }
                }
                else {
                    if (item.TxtDetail.bp_type == type) {
                        result.push(PostListModelHelper.PostListModelItemBy(item, isUpdate));
                    }
                }
            });
        }

        var resultorder = PostListModelHelper.CalcPostItemShowsPersonIndex(result);
        return resultorder;
    }


    static PostListModelItemBy(post: PostListModel, isUpdate: boolean): PostItemShow {
        var result = new PostItemShow(post.bp_id);
        if (post) {
            if (isUpdate) {
                if (post.ChangeStr)
                    result.ShowText = post.ChangeStr;
                else
                    result.ShowText = post.TxtDetail.bp_comment;
                if (post.TxtDetail.bp_content_type === "text/html")
                    result.Imgtype = "html";
                else
                    result.Imgtype = "text";
            }
            else {
                if (post.TxtDetail.bp_type === PostTypeEnum.Comment) {
                    result.ContentType = post.TxtDetail.bp_content_type;
                    if (result.ContentType === "text/html") {
                        result.Imgtype = "html";
                        result.ShowText = post.TxtDetail.bp_comment;
                    }
                    else {
                        result.Imgtype = "text";
                        result.ShowText = Utils.trimHtmlTag(post.TxtDetail.bp_comment);
                    }
                }
                if (post.TxtDetail.bp_type === PostTypeEnum.File) {
                    result.ContentType = post.TxtDetail.bp_content_type;
                    if ((post.ImgThb) && (post.ImgThb.ImgSrc)) {
                        result.ImgSrc = WebapiConfig.geturl(post.ImgThb.ImgSrc);
                        result.ImgAnchor = WebapiConfig.geturl(post.ImgThb.ImgAnchor);
                        result.Imgtype = "image";
                    } else {
                        if (result.ContentType.indexOf("video/") != -1) {
                            result.Imgtype = "video";
                        } else if (result.ContentType.indexOf("audio/") != -1) {
                            result.Imgtype = "audio";
                        } else {
                            result.Imgtype = "file";
                        }
                        result.ImgSrc = WebapiConfig.geturl("/contents/uploads/" + post.TxtDetail.bp_bug + "_" + post.TxtDetail.bp_id + "_" + post.TxtDetail.bp_file);
                        result.ImgAnchor = post.TxtDetail.bp_file;
                    }
                }
            }
            //creator info
            if ((post.TxtDetail) && (post.TxtDetail.bp_user)) {
                result.personid = post.TxtDetail.bp_user;
                let item = ContactorCacheHelper.GetContactorById(result.personid);//Webapi.users.userIdDic[result.personid];// Webapi.Config.contactorDic.getValue(result.personid);
                if (item) {
                    result.PersonPhone = item.PhoneNo;
                    result.PersonPicurl = item.UserPic;
                }
                result.personName = Utils.getLastCharactors(post.TxtDetail.us_fullname, 4);
                result.DateTimeStr = post.DateDayStr + post.DateWeekStr;
            }
        }
        return result;
    }
}