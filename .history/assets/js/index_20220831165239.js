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
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            //调用renderAvatar 渲染用户的头像
            renderAvatar(res.data)
        }
    })
}

//渲染用户的头像
function renderAvatar(user) {
    //1 获取用户的名称
    var name = user.nickname || user.username
        //2 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
}