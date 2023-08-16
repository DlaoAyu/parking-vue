import request from '@/utils/request'

export default {
    getCarScanList(searchModel, name) {
        return request({
            url: '/carScan/getCarScanList',
            method: 'get',
            params: {
                pageNum: searchModel.pageNum,
                pageSize: searchModel.pageSize,
                plateColor: searchModel.plateColor,
                type: searchModel.type,
                direction: searchModel.direction,
                userName: name
            }
        });
    },
    //根据id删除出入场记录
    deleteCarScanById(id) {
        return request({
            url: `/carScan/${id}`,
            method: 'delete'
        });
    },
}