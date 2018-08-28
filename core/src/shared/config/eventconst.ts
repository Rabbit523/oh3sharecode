export class EventConst {
  
  static Goto_Page = 'GotoPage';
  static GeoLocating = 'system:geolocating'; //位置信息

  static Login_timeOut = 'user:Login_timeOut';
  static Login_Success = 'user:Login_Success';

  static System_InLineMsg = "system:pageinlinemessage";
  static System_Resetwaiting = 'system:resetwaiting'; //取消等待  
  static System_Waiting = 'system:waiting'; //等待  
  static System_ShowConFirmMessage="System:ShowConFirmMessage";//确定取消按钮message
  static System_ShowMessage = 'System:ShowMessage';//显示消息
  
  static Event_ListViewChangeClick = 'system:listviewchangeclick'; //List视图的样式改变
  static Event_NewBugCreatedNavGo = 'event:newbugcreatednavtopage'//新事物创建后跳转到
  static Event_BugListRefresh = 'event:eventbuglistrefresh';// 页面刷新
  static Event_BugListCountChange = 'event:eventbugcountchange';// 新数据增加后 统计改变
  static Event_CategoryAdded = "event:categoryadded";//新的分类创建
  static Event_UpdatePostComplate = 'event:updatepostcomplate';//Post成功
  static Event_UpdatePostTimeout = 'event:updateposttimeout';//Post超时
  static Event_DetailViewChangeClick = 'system:detailviewchangeclick'; //detail视图的样式改变  
  static Event_BugItemUpdated = 'event:bugitemupdated';//事务被更改
  static Event_BugItemCreated = 'event:bugitemcreated';//事务被创建
  static Event_NewCommentPosted = 'event:newcommentpostcreated';//新的评论提交  
  static Event_DelBugSucc='event:Event_DelBugSucc';//关闭当前的页面
}