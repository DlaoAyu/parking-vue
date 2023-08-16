import request from '@/utils/request'

export default {
    getParkOrderList(searchModel, name) {
        return request({
            url: '/parkOrder/getParkOrderList',
            method: 'get',
            params: {
                pageNum: searchModel.pageNum,
                pageSize: searchModel.pageSize,
                plateColor: searchModel.plateColor,
                type: searchModel.type,
                parkName: searchModel.parkName,
                userName: name
            }
        });
    },
    //根据id删除出入场记录
    deleteParkOrderById(id) {
        return request({
            url: `/parkOrder/${id}`,
            method: 'delete'
        });
    },

    //计算总收入
    getTotalIncome(name){
        return request({
            url: '/parkOrder/totalIncome',
            method: 'get',
            params: {
                userName: name
            }
        });
    }
}