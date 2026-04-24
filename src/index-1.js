import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import stars from 'url:./images/img-1/stars.jpg';
import nebula from 'url:./images/img-1/nebula.jpg';
import vShader from './index.vert';
import fShader from './index.frag';

const monkeyUrl = new URL('./assets/monkey.glb', import.meta.url);

const root = document.getElementById('root');
// 场景（scene）、相机（camera）和渲染器（renderer）
// 渲染器（renderer）
const renderer = new THREE.WebGLRenderer();
// 渲染器开启阴影映射
renderer.shadowMap.enabled = true;
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
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00FF00 });
// Mesh（网格）。网格接受几何体并将材质应用于其上的对象，然后我们可以将它插入场景中并自由移动。
// 继承自 Object3D,具有Object3D的属性和方法
const box = new THREE.Mesh(boxGeometry, boxMaterial);
// 添加的对象会被放置在坐标 (0,0,0) 处
scene.add(box);
// 用于表示平面的几何类。
const planeGeometry = new THREE.PlaneGeometry(30,30);
// 平面的材质 side : 定义要渲染面的哪一面——正面、背面或两者都渲染。
const planeMaterial = new THREE.MeshStandardMaterial({
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
// 平面接收阴影的设置
plane.receiveShadow = true;

// 网格的对象。网格是二维的线条数组。
const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper)

// 添加一个球形几何体
const sphereGeometry = new THREE.SphereGeometry(4, 50, 50);
// 添加一个球形材质 wireframe : boolean - 将几何体渲染为线框。
const sphereMaterial = new THREE.MeshStandardMaterial({
    color: 0x0000FF,
    wireframe: false
});
// 将球形几何体和球形材质加入到网格
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
// 球形网格插入场景
scene.add(sphere)
sphere.position.set(-10, 10, 0);
// 投射阴影
sphere.castShadow = true;

// 环境光。
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight)

// 方向光
// const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 2);
// scene.add(directionalLight);
// directionalLight.position.set(-30, 50, 0);
// // 投射阴影
// directionalLight.castShadow = true;
// directionalLight.shadow.camera.bottom = -12;
// // 构建一个新的方向光辅助器
// const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
// scene.add(dLightHelper);
// // 创建一个新的箭头辅助函数。
// const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(dLightShadowHelper)

// 聚光灯 灯光的颜色 和强度
const spotLight = new THREE.SpotLight(0xFFFFFF, 10);
scene.add(spotLight);
spotLight.position.set(-100, 100, 0);
// 投射阴影
spotLight.castShadow = true;

const sLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(sLightHelper);

// renderer.setClearColor(0xFFEA00)
// 创建一个新的纹理加载器。
const textureLoader = new THREE.TextureLoader();
// scene.background = textureLoader.load(stars);
// 构建一个新的立方体纹理加载器。
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    nebula,
    nebula,
    stars,
    stars,
    stars,
    stars
])
// 几何体
const box2Geometry = new THREE.BoxGeometry(4,4,4);
// 纹理
const box2Material = new THREE.MeshBasicMaterial({
    // map: textureLoader.load(nebula)
})
const box2MultiMaterial = [
    new THREE.MeshBasicMaterial({map:textureLoader.load(stars)}),
    new THREE.MeshBasicMaterial({map:textureLoader.load(stars)}),
    new THREE.MeshBasicMaterial({map:textureLoader.load(nebula)}),
    new THREE.MeshBasicMaterial({map:textureLoader.load(stars)}),
    new THREE.MeshBasicMaterial({map:textureLoader.load(nebula)}),
    new THREE.MeshBasicMaterial({map:textureLoader.load(stars)})
]
const box2 = new THREE.Mesh(box2Geometry, box2MultiMaterial);
scene.add(box2)
box2.position.set(0, 15, 10)
// box2.material.map = textureLoader.load(nebula)

const plane2Geometry = new THREE.PlaneGeometry(10, 10, 10, 10);
const plane2Material = new THREE.MeshBasicMaterial({
    color: 0xFFFFFF,
    wireframe: true
})
const plane2 = new THREE.Mesh(plane2Geometry, plane2Material);
scene.add(plane2)
plane2.position.set(10, 10, 15);

plane2.geometry.attributes.position.array[0] -= 10 * Math.random();
plane2.geometry.attributes.position.array[1] -= 10 * Math.random();
plane2.geometry.attributes.position.array[2] -= 10 * Math.random();
const lastPointZ = plane2.geometry.attributes.position.array.length - 1;
plane2.geometry.attributes.position.array[lastPointZ] -= 10 * Math.random();

const sphere2Geometry = new THREE.SphereGeometry(4);
// const vShader = `
//     void main() {
//         gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//     }
// `;

// const fShader = `
//     void main() {
//         gl_FragColor = vec4(0.5, 0.5, 1.0, 1.0);
//     }
// `;
const sphere2Material = new THREE.ShaderMaterial({
    vertexShader: vShader, // document.getElementById("vertexShader").textContent,
    fragmentShader: fShader // document.getElementById("fragmentShader").textContent
});
const sphere2 = new THREE.Mesh(sphere2Geometry, sphere2Material);
scene.add(sphere2);
sphere2.position.set(-5, 10, 10);

const assetLoader = new GLTFLoader();

assetLoader.load(monkeyUrl.href, function(gltf) {
    const model = gltf.scene;
    scene.add(model);
    model.position.set(-12, 4, 10)
}, undefined, function(error) {
    console.error(error)
})

const gui = new dat.GUI();

const options = {
    sphereColor: '#ffea00',
    wireframe: false,
    speed: 0.01,
    angle: 0.2,
    penumbra: 0,
    intensity: 10,
    decay: 0.1
}

gui.addColor(options, 'sphereColor').onChange(function(e) {
    sphere.material.color.set(e)
});

gui.add(options, 'wireframe').onChange(function(e) {
    sphere.material.wireframe = e;
})

gui.add(options, 'speed', 0, 0.1)
// 光线从其方向散射的最大角度,光圈大小
gui.add(options, 'angle', 0, 1)
// 聚光灯边缘的模糊程度，取值范围为[0,1]。
gui.add(options, 'penumbra', 0, 1)
// 光的强度
gui.add(options, 'intensity', 0, 10)
// 灯光沿距离逐渐衰减的程度
gui.add(options, 'decay', 0, 10)

let step = 0;

const mousePosition = new THREE.Vector2();

window.addEventListener('mousemove', function(e) {
    mousePosition.x = e.clientX / window.innerWidth * 2 - 1;
    mousePosition.y = - e.clientY / window.innerHeight * 2 + 1;
})

const rayCaster = new THREE.Raycaster();
const sphereId = sphere.id;
box2.name = 'theBox';

function animate(time) {
    box.rotation.x = time / 1000;
    box.rotation.y = time / 1000;

    step += options.speed;
    sphere.position.y = 10 * Math.abs(Math.sin(step));

    spotLight.angle = options.angle;
    spotLight.penumbra = options.penumbra;
    spotLight.intensity = options.intensity;
    spotLight.decay = options.decay;
    sLightHelper.update();

    rayCaster.setFromCamera(mousePosition, camera);
    const intersects = rayCaster.intersectObjects(scene.children);
    // console.log(intersects)
    for(let i = 0; i < intersects.length; i++) {
        if (intersects[i].object.id === sphereId) {
            intersects[i].object.material.color.set(0xFF0000)
        }

        if (intersects[i].object.name === 'theBox') {
            intersects[i].object.rotation.x = time / 1000;
            intersects[i].object.rotation.y = time / 1000;
        }
    }

    plane2.geometry.attributes.position.array[0] = 10 * Math.random();
    plane2.geometry.attributes.position.array[1] = 10 * Math.random();
    plane2.geometry.attributes.position.array[2] = 10 * Math.random();
    plane2.geometry.attributes.position.array[lastPointZ] = 10 * Math.random();
    plane2.geometry.attributes.position.needsUpdate = true
    // 渲染器加载场景和相机
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate)

window.addEventListener("resize", function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight)
})




