$(function() {

    //调用getUserInfo获取用户的基本信息
    getUserInfo()
    $('#btnLogout').on('click', function() {
        // console.log('ok');
        // 提示用户是否确认退出
        var layer = layui.layer
        layui.layer.confirm('is not?', { icon: 3, title: '提示' }, function(index) {
            //do something

            layer.close(index);
        });
    })
})

//获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
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
        //3 按需渲染用户的头像
    if (user.user_pic !== null) {
        //3.1渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        //3.2 渲染文本头像
        $('.layui-nav-img').hide()
            // 获取到第一个字符 转换成 大写 
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}