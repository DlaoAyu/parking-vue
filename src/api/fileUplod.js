import request from '@/utils/request'

export default{
  fileUplod(){
    return request({
      url: '/file/upLoad',
      method: 'post'
    });
  }
}