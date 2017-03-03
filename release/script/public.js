(function(){
	/*
	 * 工具类
	 */
	window.Tool = {
		/*
         * 将模板加载到指定的dom元素上
         * @param dom       dom 对象
         * @param tplName   模板名称   如：tpl/list
         * @param data      将数据传入模板
         */
        renderTemplate: function(dom, tplName, data){
            var render = template.compile(iTemplates[tplName]);
            dom.innerHTML = render(data);
        },
        /**
         * 获取浏览器参数名称
         * @param name 浏览器地址参数名
         */
        queryUrlParam : function(name){
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r !== null) return decodeURIComponent(r[2]); return null;
        }
	};


})();