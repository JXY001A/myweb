/**
 * 
 * @authors: JXY001A
 * @Emali:   JXY001A@aliyun.com
 * @date:    2017-04-26 14:18:18
 * @desc:    (webgl实现的地球)
 * @github:  github.com/JXY001A
 * @version: 1.0
 */
$(function() {
    // 加载完成后执行
    setUp();
});
// 监听窗口事件
$(window).bind('resize',function(event) {
    /* Act on the event */
     setUp();
});
//启动函数 
function setUp(){
    var container = document.getElementById("canvas-frame");
    $(container).css('height', window.innerHeight);
    $(container).css('width', window.innerWidth);
    var app = new EarthApp();
    app.init({
        container: container
    });
    app.run();
}

var EarthApp = function() {
    Sim.App.call(this);
}

EarthApp.prototype = new Sim.App();
//开始初始整个程序中的常量
EarthApp.prototype.init = function(param) {

        Sim.App.prototype.init.call(this, param);
        //创建地球
        var earth = new Earth();
        //初始地球
        earth.init();
        //将earth对象添加到objects[] 数组中去
        this.addObject(earth);

        var sun = new Sun();
        sun.init();
        this.addObject(sun);
    }
    //自定义地球类
var Earth = function() {
        Sim.Object.call(this);
    }
    //Earth对象继承Object对象
Earth.prototype = new Sim.Object();

Earth.prototype.init = function() {
    //生成一个包含地球，云层的群组
    var earthGoroup = new THREE.Object3D();
    //将群组添加到框架中
    this.setObject3D(earthGoroup);
    //初始化地球
    this.createGlobe();
    //初始化云层
    this.createClouds();
}

Earth.prototype.createGlobe = function() {
        //加载地球颜色纹理
        var surfaceMap = THREE.ImageUtils.loadTexture('../public/images/earth_surface_2048.jpg');
        //加载法线贴图
        var normalMap = THREE.ImageUtils.loadTexture("../public/images/earth_normal_2048.jpg");
        //加载高光贴图，描绘地球反光度
        var specularMap = THREE.ImageUtils.loadTexture("../public/images/earth_specular_2048.jpg");
        //使用shader工具类（使用法线贴图着色器）

        var shader = THREE.ShaderUtils.lib['normal'];
        var uniforms = THREE.UniformsUtils.clone(shader.uniforms);
        //添加到unifrom 的图片将会被赋值个着色器
        uniforms['tNormal'].texture = normalMap;
        uniforms['tDiffuse'].texture = surfaceMap;
        uniforms['tSpecular'].texture = specularMap;
        uniforms['enableDiffuse'].value = true;
        uniforms['enableSpecular'].value = true;
        //生成材质
        var material = new THREE.ShaderMaterial({
            fragmentShader: shader.fragmentShader,
            vertexShader: shader.vertexShader,
            uniforms: uniforms,
            lights: true
        });

        //生成球体
        var globeGeometry = new THREE.SphereGeometry(.5, 32, 32);
        //为着色器计算法线
        globeGeometry.computeTangents();
        var globeMesh = new THREE.Mesh(globeGeometry, material);
        //添加到群组中去
        this.object3D.add(globeMesh);
        this.globeMesh = globeMesh;
    }
    //创建云层
Earth.prototype.createClouds = function() {
        var cloudsMap = THREE.ImageUtils.loadTexture('../public/images/earth_clouds_1024.png');
        //生成云层材质
        var material = new THREE.MeshLambertMaterial({
            color: 0xffffff,
            map: cloudsMap,
            transparent: true
        });
        var cloudsGeometry = new THREE.SphereGeometry(.6, 32, 32);
        var cloudsMesh = new THREE.Mesh(cloudsGeometry, material);
        this.object3D.add(cloudsMesh);
        this.cloudsMesh = cloudsMesh;
    }
    //为Earth对象添位置改变方法
Earth.prototype.update = function() {
    //让地球动起来,环绕y轴旋转
    this.globeMesh.rotation.y += Earth.ROTATION_Y;
    this.cloudsMesh.rotation.y += Earth.ROTATION_Y * 0.9;
}

//定义模拟太阳
var Sun = function() {
    Sim.Object.call(this);
}
Sun.prototype = new Sim.Object();

Sun.prototype.init = function() {
    var light = new THREE.PointLight(0xffffff, 2, 1000);
    light.position.set(-15, 0, 20);
    //将对象传递给框架
    this.setObject3D(light);
}
Earth.ROTATION_Y = 0.01;
Earth.TILE = 0.42;
