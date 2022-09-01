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

    $('#file').on('change', function(e) {
        console.log(e);
    })
})