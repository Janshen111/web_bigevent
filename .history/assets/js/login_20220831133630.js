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
                var pwd = $('.reg-box [name=password]').val()
                if (pwd !== value) {
                    return '两次密码不一致'
                }
            }
        })
        //监听之策表单的提交事件
    $('#form_reg').on('submit', function(e) {
        //1阻止默认的提交行为
        e.preventDefault();
        //2 发起ajax的post请求
        $.post('http://www.liulongbin.top:3007/api/reguser', { username: $('#form_reg[name=username]').val(), password: $('#form_reg[name=password]').val() },
            function(res) {
                if (res.status === 0) {
                    return console.log(res.message);
                }
                console.log('注册成功');
            })
    })
})