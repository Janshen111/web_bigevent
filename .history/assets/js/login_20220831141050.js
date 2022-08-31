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
        //从laYui中获取layui对象
    var layer = layui.layer
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
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
        $.post('http://www.liulongbin.top:3007/api/reguser', data,
            function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功');
                //模拟人的点击行为
                $('#link_login').click()
            })
    })

    //监听登录表单的提交事件
    $('#form_login').submit(function(e) {
        //阻止默认提交行为
        e.preventDefault()
        $.ajax({
            url: 'http://www.liulongbin.top:3007/api/login',
            method: 'POST',
            //快速获取表单中的数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                console.log(res.token);
                // location.href = '/index.html'
            }
        })
    })
})