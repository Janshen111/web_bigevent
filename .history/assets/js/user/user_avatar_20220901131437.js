$(function() {
    //1 .1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        //1.2 配置选项
    const options = {
        //纵横比 指定裁剪框的比例 1：1   3：4
        aspectRatio: 1,
        //指定预览区域
        preview: '.img-preview'
    }

    //1.3 创建裁剪区域
    $image.cropper(options)

    //为上传按钮绑定点击事件
    $('#btnChooseImage').on('click', function() {
            $('#file').click()
        })
        //1 为文件选择框绑定 change事件
    $('#file').on('change', function(e) {
        // console.log(e);
        // 获取用户选择的文件
        var fileList = e.target.files
            // console.log(fileList);
        if (fileList.length === 0) {
            return layui.layer.msg('请选择照片！')
        }
        // layui.layer.msg('上传成功')
        // 2 更换裁剪区域图片
        //1 拿到用户选择的文件
        var file = e.target.files[0]
            //2 将文件 转化为路径
        var imgURL = URL.createObjectURL(file)
            //3 重新初始化裁剪区域
        $image
            .cropper('destroy') //销毁旧的裁剪区域
            .attr('src', newImgURL) //重新设置图片路径
            .cropper(options) //重新初始化裁剪区域 
    })


})