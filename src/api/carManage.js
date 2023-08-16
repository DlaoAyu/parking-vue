import request from '@/utils/request'

export default {
  getCarInfoList(searchModel,name) {
    return request({
        url: '/carInfo/getCarInfoList',
        method: 'get',
        params:{
            pageNum: searchModel.pageNum,
            pageSize: searchModel.pageSize,
            belongName: searchModel.belongName,
            plateColor: searchModel.plateColor,
            plateNum: searchModel.plateNum,
            userName: name
        }
    });
  },
  // 新增carInfo
  addCarInfo(carInfo){
    return request({
      url: '/carInfo',
      method: 'post',
      data: carInfo
    });
  },
  // 修改CarInfo
  updateParkInfo(carInfo){
    return request({
      url: '/carInfo',
      method: 'put',
      data: carInfo
    });
  },

  //判断是新增还是修改
  saveCarInfo(carInfo){
    if(carInfo.carId == null && carInfo.carId == undefined){
      return this.addCarInfo(carInfo);
    }
    return this.updateParkInfo(carInfo);
  },
  //根据carId查数据
  getCarInfoById(carId){
    return request({
      url: `/carInfo/${carId}`,
      method: 'get'
    });
  },

  //根据carId删除数据
  deleteCarInfoById(carId){
    return request({
      url: `/carInfo/${carId}`,
      method: 'delete'
    });
  },
}