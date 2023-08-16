import request from '@/utils/request'

export default{
  getUserList(searchModel){
    return request({
      url: '/user/getUserList',
      method: 'get',
      params:{
        pageNum: searchModel.pageNum,
        pageSize: searchModel.pageSize,
        userName: searchModel.userName,
        phonenumber: searchModel.phonenumber,
        sex: searchModel.sex

      }
    });
  },
  addUser(user){
    return request({
      url: '/user',
      method: 'post',
      data: user
    });
  },
  updateUser(user){
    return request({
      url: '/user',
      method: 'put',
      data: user
    });
  },
  //判断是新增还是修改
  saveUser(user){
    if(user.userId == null && user.userId == undefined){
      return this.addUser(user);
    }
    return this.updateUser(user);
  },
  getUserById(userId){
    return request({
      url: `/user/${userId}`,
      method: 'get'
    });
  },
  deleteUserById(userId){
    return request({
      url: `/user/${userId}`,
      method: 'delete'
    });
  },
}