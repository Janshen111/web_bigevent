$(function() {
    var layer = layui.layer
    initArtCateList()
        //获取文章分类的列表
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                // console.log(res);
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }

    //为添加类别按钮添加绑定点击事件
    $('#btnAddCate').on('click', function() {
        layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    })

    //通过代理的形式 为 form-add 表单绑定 submit事件
    $('body').on('submit', '#form-add', function(e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
            // console.log('ok');
        $.ajax({
            method: 'POST',
            url: '/my/artcate/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败！')

                }
                initArtCateList()
                layer.msg('新增分类成功！')
            }
        })
    })

})