import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Index = () => {
    const domRef = useRef(null);
    const contanierRef = useRef(null)

    useEffect(() => {
        // 场景（scene）、相机（camera）和渲染器（renderer）

        // 场景（scene）
        const scene = new THREE.Scene();
        // 透视相机 PerspectiveCamera
        // 视野范围（field of view）- 宽高比（aspect ratio）- 近裁剪面（near）和远裁剪面（far）
        const camera = new THREE.PerspectiveCamera(75, contanierRef.current.clientWidth / contanierRef.current.clientHeight, 0.1, 1000);
        // 渲染器（renderer）
        const renderer = new THREE.WebGLRenderer();

        // 设置渲染器尺寸 - 较低的分辨率渲染
        renderer.setSize(contanierRef.current.clientWidth / 2, contanierRef.current.clientHeight / 2, false);
        renderer.setAnimationLoop(animate);
        domRef.current.appendChild(renderer.domElement);

        // 创建一个立方体几何体，包含了立方体的所有顶点（vertices）和面（faces）
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        // 设置了材质属性
        const material = new THREE.MeshBasicMaterial({ color: 0xfb0000 });
        // Mesh（网格）。网格接受几何体并将材质应用于其上的对象，然后我们可以将它插入场景中并自由移动。
        // 继承自 Object3D,具有Object3D的属性和方法
        const cube = new THREE.Mesh(geometry, material);
        // 添加的对象会被放置在坐标 (0,0,0) 处
        scene.add(cube);

        camera.position.z = 5;
        
        renderer.render(scene, camera);

        function animate(time) {
            // 使用Object3D属性，用欧拉角表示物体的局部旋转
            cube.rotation.x = time / 2000;
            cube.rotation.y = time / 1000;
            cube.rotation.z = time / 1000;
            renderer.render(scene, camera);
        }

    }, [])

    return <div ref={contanierRef} className="w-full h-full">
        <div ref={domRef}>

        </div>
    </div>
}

export default Index