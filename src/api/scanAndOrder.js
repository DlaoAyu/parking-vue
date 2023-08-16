import request from '@/utils/request'


export default {
  // 新增扫描记录
  addEntryCar(carScan) {
    return request({
      url: '/carScan/addEntryCar',
      method: 'post',
      data: carScan
    });
  },
  //出场
  exitCar(carScan) {
    return request({
      url: '/carScan/exitCar',
      method: 'post',
      data: carScan
    });
  }
}