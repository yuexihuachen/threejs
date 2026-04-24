import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'

import stars from 'url:./images/img-2/stars.jpg';
import sunTexture from 'url:./images/img-2/sun.jpg';
import mercuryTexture from 'url:./images/img-2/mercury.jpg';
import venusTexture from 'url:./images/img-2/venus.jpg';
import earthTexture from 'url:./images/img-2/earth.jpg';
import marsTexture from 'url:./images/img-2/mars.jpg';
import jupiterTexture from 'url:./images/img-2/jupiter.jpg';
import saturnTexture from 'url:./images/img-2/saturn.jpg';
import saturnRingTexture from 'url:./images/img-2/saturn ring.png';
import uranusTexture from 'url:./images/img-2/uranus.jpg';
import uranusRingTexture from 'url:./images/img-2/uranus ring.png';
import neptuneTexture from 'url:./images/img-2/neptune.jpg';
import plutoTexture from 'url:./images/img-2/pluto.jpg';
import { texture } from 'three/src/nodes/TSL.js';

const root = document.getElementById('root');
// 场景（scene）、相机（camera）和渲染器（renderer）
// 渲染器（renderer）
const renderer = new THREE.WebGLRenderer();
// 设置渲染器尺寸 - 较低的分辨率渲染
renderer.setSize(window.innerWidth, window.innerHeight);
root.appendChild(renderer.domElement);

// 场景（scene）
const scene = new THREE.Scene();
// 透视相机 PerspectiveCamera
// 视野范围（field of view）- 宽高比（aspect ratio）- 近裁剪面（near）和远裁剪面（far）
const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
// 轨道控制功能允许相机围绕目标旋转。 - 缩放，轨道，平移
const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(-90, 140, 140);
orbit.update();

// 添加一个环境光
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

//构建一个新的立方体纹理加载器。
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    stars,stars,stars,stars,stars,stars
]);

// 纹理
const textureLoader = new THREE.TextureLoader()
// 球体几何体
const sunGeo = new THREE.SphereGeometry(16, 30, 30);
// 网格基础材质 - 这种材料不受光线影响  map - 颜色贴图
const sunMat = new THREE.MeshBasicMaterial({
    map: textureLoader.load(sunTexture)
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun)
// 通用方法
function createPlanete(size, texture, position, ring) {
    // 几何体
    const geo = new THREE.SphereGeometry(size, 30, 30);
    // 材质
    const mat = new THREE.MeshStandardMaterial({
        map: textureLoader.load(texture) // 纹理
    });
    // 网格
    const mesh = new THREE.Mesh(geo, mat);
    // 创建一个新的三维物体（网格集合）
    const obj = new THREE.Object3D();
    // 网格加载到三维物体
    obj.add(mesh);
    if (ring) {
        // 环形几何体
        const ringGeo = new THREE.RingGeometry(ring.innerRadius, ring.outerRadius, 32);
        // 网格基础材质 - 这种材料不受光线影响  map - 颜色贴图
        const ringMat = new THREE.MeshBasicMaterial({
            map: textureLoader.load(ring.texture),
            side: THREE.DoubleSide
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        obj.add(ringMesh);
        ringMesh.position.x = position;
        ringMesh.rotation.x = -0.5 * Math.PI;
    }

    // 三维物体加载到场景中
    scene.add(obj);
    mesh.position.x = position;
    return {mesh, obj}
}

// 球体几何体
const mercury = createPlanete(3.2, mercuryTexture, 28);
const venus = createPlanete(5.8, venusTexture, 44);
const earth = createPlanete(6, earthTexture, 62);
const mars = createPlanete(4, marsTexture, 78);
const jupiter = createPlanete(12, jupiterTexture, 100);
// 球体几何体 环形几何图形
const saturn = createPlanete(10, saturnTexture, 138, {
    innerRadius: 10,
    outerRadius: 20,
    texture: saturnRingTexture
});
const uranus = createPlanete(7, uranusTexture, 176, {
    innerRadius: 7,
    outerRadius: 12,
    texture: uranusRingTexture
});
const neptune = createPlanete(7, neptuneTexture, 200);
const pluto = createPlanete(2.8, plutoTexture, 216);

const pointLight = new THREE.PointLight(0xFFFFFF, 4, 300, 0);
scene.add(pointLight)

function animate(time) {
    // 自转
    sun.rotateY(0.004);
    mercury.mesh.rotateY(0.004);
    venus.mesh.rotateY(0.002);
    earth.mesh.rotateY(0.002);
    mars.mesh.rotateY(0.018);
    jupiter.mesh.rotateY(0.04);
    saturn.mesh.rotateY(0.038);
    uranus.mesh.rotateY(0.03);
    neptune.mesh.rotateY(0.032);
    pluto.mesh.rotateY(0.008);

    // 公转
    mercury.obj.rotateY(0.04);
    venus.obj.rotateY(0.0015);
    earth.obj.rotateY(0.01);
    mars.obj.rotateY(0.008);
    jupiter.obj.rotateY(0.002);
    saturn.obj.rotateY(0.0009);
    uranus.obj.rotateY(0.0004);
    neptune.obj.rotateY(0.0001);
    pluto.obj.rotateY(0.00007);

    // 渲染器加载场景和相机
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate)

window.addEventListener("resize", function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight)
})




