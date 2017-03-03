系统架构
less				css样式框架		
art-template		处理html模板工具		
iTemplates			打包生成的模板对象

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