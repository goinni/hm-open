
@Author HOUZHENYU

系统按装
bower install && npm install 

系统启动&发布
grunt 启动

grunt release 发布上线时用

系统架构
less					
art-template		
iTemplates			将html模板压缩打包生成的模板对象，使用方法iTemplates[tplName]

系统变量 关键字（开发时不要与其命名冲突）：
template
iTemplates

模板使用
/*
 * 将模板加载到指定的dom元素上
 * @param dom       dom 对象
 * @param tplName   模板名称
 * @param data      将数据传入模板
 */
function renderTemplate(dom, tplName, data){
    var render = template.compile(iTemplates[tplName]);
    dom.innerHTML = render(data);
}