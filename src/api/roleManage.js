import request from '@/utils/request'

export default{
  getRoleList(searchModel){
    return request({
      url: '/role/getRoleList',
      method: 'get',
      params:{
        pageNum: searchModel.pageNum,
        pageSize: searchModel.pageSize,
        roleName: searchModel.roleName,
        flag: searchModel.flag
      }
    });
  },
  addRole(role){
    return request({
      url: '/role',
      method: 'post',
      data: role
    });
  },
  updateRole(role){
    return request({
      url: '/role',
      method: 'put',
      data: role
    });
  },
  //判断是新增还是修改
  saveRole(role){
    if(role.roleId == null && role.roleId == undefined){
      return this.addRole(role);
    }
    return this.updateRole(role);
  },
  getRoleById(roleId){
    return request({
      url: `/role/${roleId}`,
      method: 'get'
    });
  },
  deleteRoleById(roleId){
    return request({
      url: `/role/${roleId}`,
      method: 'delete'
    });
  },

  getAllRoleList(){
    return request({
      url: '/role/all',
      method: 'get'
    });
  },
}