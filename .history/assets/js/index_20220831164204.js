$(function() {

    //调用getUserInfo获取用户的基本信息
    getUserInfo()
})

//获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // headers就是请求头配置对象
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function(res) {
            console.log(res);
        }
    })
}