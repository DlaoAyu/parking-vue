import request from '@/utils/request'

export default {
  getParkInfoList(searchModel,name) {
    return request({
        url: '/parkInfo/getParkInfoList',
        method: 'get',
        params:{
            pageNum: searchModel.pageNum,
            pageSize: searchModel.pageSize,
            parkName: searchModel.parkName,
            parkAddress: searchModel.parkAddress,
            userName: name
        }
    });
  },
  // 新增ParkInfo
  addParkInfo(parkInfo){
    return request({
      url: '/parkInfo',
      method: 'post',
      data: parkInfo
    });
  },
  // 修改ParkInfo
  updateParkInfo(parkInfo){
    return request({
      url: '/parkInfo',
      method: 'put',
      data: parkInfo
    });
  },

  //判断是新增还是修改
  saveParkInfo(parkInfo){
    if(parkInfo.parkId == null && parkInfo.parkId == undefined){
      return this.addParkInfo(parkInfo);
    }
    return this.updateParkInfo(parkInfo);
  },
  //根据parkId查数据
  getParkInfoById(parkId){
    return request({
      url: `/parkInfo/${parkId}`,
      method: 'get'
    });
  },

  //根据parkId删除数据
  deleteParkInfoById(parkId){
    return request({
      url: `/parkInfo/${parkId}`,
      method: 'delete'
    });
  },

  //查询所有停车场信息
  getAllParkInfoList(){
    return request({
      url: '/parkInfo/all',
      method: 'get'
    });
  },

  //查询所有停车位和剩余车位
  getParkSpace(name){
    return request({
      url: '/parkInfo/parkSpace',
      method: 'get',
      params:{
        userName: name
    }
    });
  }
}