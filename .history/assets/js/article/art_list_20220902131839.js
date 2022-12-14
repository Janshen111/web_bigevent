$(function() {
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage

    //定义美化时间的过滤器
    template.defaults.imports.dataFormat = function(date) {
        const dt = new Date(date)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + 'd' + ' ' + hh + ':' + mm + ':' + ss
    }

    //定义补零的函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }
    // 定义一个查询的参数对象，将来请求数据的时候
    //需要将请求对象提交到服务器
    var q = {
        pagenum: 1, //页码之，默认请求第一页的数据
        pagesize: 2, //煤业显示几条数据，默认每页显示2条
        cate_id: '', //文章分类的Id
        state: '' //文章的分类状态 默认为空
    }
    initTable()
    initCate()
        //获取文章列表数据的方法
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                // console.log(res.message);
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败！')
                }
                // 使用模板引擎渲染页面的数据
                // console.log(res);
                var htmlStr = template('tpl-table', res)
                    // console.log(htmlStr);
                $('tbody').html(htmlStr)
                    // form.render()
                    //调用渲染分页的方法  数据渲染完后 渲染底部分页区域
                renderPage(res.total)
            }
        })
    }

    //初始化文章分类的方法
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取分类数据失败！')
                }
                //调用模板引擎渲染分类的可选项
                var htmlStr = template('tpl-cate', res)
                    // console.log(htmlStr);
                $('[name=cate_id]').html(htmlStr)
                    //通过layui 重新渲染表单区域的ui结构  解决 下拉列表获取到未显示
                form.render()
            }
        })
    }

    //定义渲染分页的方法
    function renderPage(total) {
        // console.log(total);
        // 调用 laypage.render()方法来渲染分页的结构
        laypage.render({
            elem: 'pageBox', //分页容器的Id
            count: total, //总数据条数
            limit: q.pagesize, //每页显示几条数据
            curr: q.pagenum, //设置默认被选中的分页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            //分页发生切换的时候，触发jump回调
            // 触发jump回调的方式有两种，  死循环了
            // 1 点击页码的时候，就会触发jump回调 
            // 2 只要调用了laypage.render()方法，就会触发jump回调
            jump: function(obj, first) {
                //可以通过first 的值，来按段是通过哪种方式，触发的jump回调
                //如果first 的值 为true 证明的方式是 2 触发的
                //如果值是false 就是方式1触发的
                console.log(first);
                //console.log(obj.curr); 打印点击的最新页面值
                // 把最新的页码值 ，赋值到 q 这个查询参数对象中
                q.pagenum = obj.curr
                    //把最新的条目数 赋值到q这个查询参数对象的pagesize属性中
                q.pagesize = obj.limit
                    //   根据最新的 q 获取对应的数据列表 并渲染表格
                    //   initTable()
                if (!first) {
                    initTable()
                }
            }
        })

    }


    //通过代理的形式， 为删除按钮绑定点击事件处理函数
    $('tbody').on('click', '.btn-delete', function() {
        // console.log('ok');
        //询问用户是否要删除数据
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            //do something

            layer.close(index);
        });

    })
})