$(function() {
    //点击 “去注册账号的链接”
    $("#link_reg").on('click', function() {
            $('.login-box').hide()
            $('.reg-box').show()
        })
        //点击 去登录 的链接
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    //表单 验证 自定义
    //从laYui中获取form对象
    var form = layui.form
        // 通过form.verify()函数自定义校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格']
    })
})