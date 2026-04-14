import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const root = document.getElementById('root');
const body = document.body
// 场景（scene）、相机（camera）和渲染器（renderer）
// 渲染器（renderer）
const renderer = new THREE.WebGLRenderer();
// 设置渲染器尺寸 - 较低的分辨率渲染
renderer.setSize(window.innerWidth, window.innerHeight, false);
root.appendChild(renderer.domElement);

// 场景（scene）
const scene = new THREE.Scene();
// 透视相机 PerspectiveCamera
// 视野范围（field of view）- 宽高比（aspect ratio）- 近裁剪面（near）和远裁剪面（far）
const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
// OrbitControls（轨道控制器）是一个用于控制3D场景中相机的组件。它允许用户通过鼠标、触摸板或键盘等交互方式，从不同角度和距离来观察场景中的物体
const orbit = new OrbitControls(camera, renderer.domElement)
// 可视化三个坐标轴的坐标轴对象
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper)
camera.position.set(-10,30,30)
orbit.update()
// 创建一个立方体几何体，包含了立方体的所有顶点（vertices）和面（faces）
const boxGeometry = new THREE.BoxGeometry();
// 设置了材质属性
const boxMetryaterial = new THREE.MeshBasicMaterial({ color: 0x00FF00 });
// Mesh（网格）。网格接受几何体并将材质应用于其上的对象，然后我们可以将它插入场景中并自由移动。
// 继承自 Object3D,具有Object3D的属性和方法
const box = new THREE.Mesh(boxGeometry, boxMetryaterial);
// 添加的对象会被放置在坐标 (0,0,0) 处
scene.add(box);
// 用于表示平面的几何类。
const planeGeometry = new THREE.PlaneGeometry(30,30);
// 平面的材质 side : 定义要渲染面的哪一面——正面、背面或两者都渲染。
const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0xFFFFFF,
    side: THREE.DoubleSide
});
// 将平面几何体和平面材质放入网格
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
// 插入场景
scene.add(plane)
/**
 * 欧拉角 - 欧拉角是一种描述三维物体朝向的方法：通过围绕三个互相垂直的轴（X、Y、Z）依次旋转一定角度，来表示任意旋转。
 * 弧度 - 弧度 = 角度 × 180 / π
 * 在 Three.js 中，所有涉及旋转的角度（如 rotation.x）均使用弧度
 */
plane.rotation.x = -0.5 * Math.PI;
// plane.rotateX(-0.5 * Math.PI - plane.rotation.x)

// 网格的对象。网格是二维的线条数组。
const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper)

// 添加一个球形几何体
const sphereGeometry = new THREE.SphereGeometry(4);
// 添加一个球形材质 wireframe : boolean - 将几何体渲染为线框。
const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x0000FF,
    wireframe: true
});
// 将球形几何体和球形材质加入到网格
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
// 球形网格插入场景
scene.add(sphere)

function animate(time) {
    box.rotation.x = time / 1000;
    box.rotation.y = time / 1000;
    // 渲染器加载场景和相机
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate)






