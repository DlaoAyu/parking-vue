const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,

  nickName: state => state.user.nickName,
  email: state => state.user.email,
  phonenumber: state => state.user.phonenumber,
  sex: state => state.user.sex,

  name: state => state.user.name,
  menuList: state => state.user.menuList,

  parkInfoList: state => state.user.parkInfoList,

  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,   
  permission_routes: state => state.permission.routes
}
export default getters