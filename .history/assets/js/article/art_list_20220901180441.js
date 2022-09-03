$(function() {
    var layer = layui.layer
        // 定义一个查询的参数对象，将来请求数据的时候
        //需要将请求对象提交到服务器
    var q = {
        pagenum: 1, //页码之，默认请求第一页的数据
        pagesize: 2, //煤业显示几条数据，默认每页显示2条
        cate_id: '', //文章分类的Id
        state: '' //文章的分类状态 默认为空
    }
    initTable()
        //获取文章列表数据的方法
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败！')
                }
                // 使用模板引擎渲染页面的数据
                console.log(res);
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }
})