$(function() {
    var form = layui.form

    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        //value 是新密码框输入的值
        samePwd: function(value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同！'
            }
        },
        //value 是确认新密码框输入的值
        rePwd: function(value) {
            if (value !== $('[name=rePwd]').val()) {
                return '两次输入密码不一致！'
            }
        }

    })
})