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
            content: '可以填写任意的layer代码'
        })
    })

})