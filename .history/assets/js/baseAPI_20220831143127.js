//注意： 每次调用$.get() 或者$.post()的时候
//会调用 ajaxPrefilter这个函数
//在这个函数中，可以拿到我们给Ajax提供配置对象
$.ajaxPrefilter(function(options) {
    console.log(options.url);
})