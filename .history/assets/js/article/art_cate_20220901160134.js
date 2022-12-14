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
    //当你想关闭当前页的某个层时
    var indexAdd = null
    $('#btnAddCate').on('click', function() {
        indexAdd = layer.open({
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
            url: '/my/article/addcates',
            data: [$(this).serialize(), id = 21312312],
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败！')

                }
                initArtCateList()
                layer.msg('新增分类成功！')
                    //根据索引关闭对应的弹出层
                layer.close(indexAdd)
            }
        })
    })

})