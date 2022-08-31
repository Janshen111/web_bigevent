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
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        //校验两次密码是否一致的规则
        repwd: function(value) {
            //通过形参拿到的确认密码框中的内容
            //还需要拿到密码框中的内容
            //然后进行移除等于的判断
            //如果判断失败则return 一个提示消息即可
            var pwd = $('.reg-box[name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })
})