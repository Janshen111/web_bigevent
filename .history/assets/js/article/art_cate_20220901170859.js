$(function() {
    var layer = layui.layer
        // 2-2声明填充form变量
    var form = layui.form
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
            data: $(this).serialize(),
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

    //通过代理的形式，为btn-edit 按钮绑定点击事件
    var indexEdit = null
    $('tbody').on('click', '.btn-edit', function(e) {
        // console.log('OK');
        // 弹出一个修改文字分类信息的层
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })

        var id = $(this).attr('data-id')
            // console.log(id);
            //发起请求获取对应分类的数据
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
                // console.log(res);
                //2-3填充form 数据
                form.val('form-edit', res.data)
            }
        })
    })

    //通过代理的形式 为修改分类的表单绑定 submit 事件
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类数据失败！')
                }
                layer.msg('更新分类数据成功！')
                layer.close(indexEdit)
                initArtCateList()
            }
        })
    })

    //通过代理的形式 为删除按钮绑定点击事件
    $('tbody').on('click', '.btn-delete', function(e) {
        e.preventDefault()
            // console.log('ok');
    })
})