$(function() {

    var layer = layui.layer
    var form = layui.form
    initCate()
        //初始化富文本编辑器
    initEditor()
        //定义加载文章分类的方法
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('初始化文章分类失败！')
                }
                //调用模板引擎，渲染分类的下拉菜单
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                    //一定要记得调用 form.render()方法 
                form.render()
            }
        })
    }

    //1 初始化图片裁剪器
    var $image = $('#image')

    //2 裁剪选项
    var options = {
        aspectRatio: 400 / 200,
        preview: '.img-preview'
    }

    //3 初始化裁剪区域
    $image.cropper(options)

    //未选择封面的按钮 绑定点击事件处理函数
    $('#btnChooseImage').on('click', function() {
        $('#coverFile').click()
    })

    //监听coverFile的change事件，获取用户选择的文件列表
    $('#coverFile').on('change', function(e) {
        //获取到文件的列表数组
        var files = e.target.files
            //    判断用户是否选择了文件
        if (files.length === 0) {
            return
        }
        //根据文件 创建对应对应的URL地址
        var newImgURL = URL.createObjectURL(files[0])
            //为裁剪区域重新设置图片
        $image
            .cropper('destroy') //销毁旧的裁剪区域
            .attr('src', newImgURL) //重新设置图片路径
            .cropper(options) //重新初始化裁剪区域
    })


    //定义文章的发布状态
    var art_state = '已发布'

    // 为存为草稿按钮，绑定点击事件处理函数
    $('#btnSave2').on('click', function() {
        art_state = '草稿'
    })

    //为表单绑定submit提交事件
    $('#form-pub').on('submit', function(e) {
        //1 阻止表单的默认提交行为
        e.preventDefault();
        //2 基于form表单 快速创建一个FormData对象
        var fd = new FormData($(this)[0])
            //3 将文章的发布状态，存到fd中
        fd.append('state', art_state)
        fd.forEach(function(v, k) {
            console.log(k, v);

        })
    })
})