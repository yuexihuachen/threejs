import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Index = () => {
    const domRef = useRef(null);
    const contanierRef = useRef(null)

    useEffect(() => {
        // 场景（scene）、相机（camera）和渲染器（renderer）
        const renderer = new THREE.WebGLRenderer();

        // 设置渲染器尺寸 - 较低的分辨率渲染
        renderer.setSize(contanierRef.current.clientWidth, contanierRef.current.clientHeight, false);

        domRef.current.appendChild(renderer.domElement);
        // 场景（scene）
        const scene = new THREE.Scene();
        const light = new THREE.DirectionalLight(0xffffff, 5);
        light.position.set(-1, 2, 4);
        scene.add(light);

        // 透视相机 PerspectiveCamera
        // 视野范围（field of view）俯仰角 75度- 宽高比（aspect ratio）2- 近裁剪面（near）和远裁剪面（far）
        const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 5);
        // 渲染器（renderer）

        camera.position.z = 2;
        // 正方体
        const zhengfangti = new THREE.BoxGeometry(1, 1, 1);
        // 材质 - MeshBasicMaterial是一种不受任何光源影响的材质
        // const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
        // 网格
        const makeInstance = (geometry, color, x) => {
            const material = new THREE.MeshPhongMaterial({ color });

            const cube = new THREE.Mesh(geometry, material);
            scene.add(cube);
            cube.position.x = x;
            return cube;
        }
        // const cube = new THREE.Mesh(zhengfangti, material);
        const cubes = [
            makeInstance(zhengfangti, 0x44aa88, 0),
            makeInstance(zhengfangti, 0x8844aa, -2),
            makeInstance(zhengfangti, 0xaa8844, 2),
        ]

        // scene.add(cube)

        // renderer.render(scene, camera)

        function render(time) {
            time *= 0.001;

            camera.aspect = domRef.current.clientWidth / domRef.current.clientHeight;
            camera.updateProjectionMatrix();

            cubes.forEach((cube, ndx) => {
                const speed = 1 + ndx * .1;
                const rot = time * speed;
                cube.rotation.x = rot;
                cube.rotation.y = rot;
            });

            renderer.render(scene, camera)

            requestAnimationFrame(render);
        }

        requestAnimationFrame(render);



    }, [])

    return <div ref={contanierRef} className="w-full h-full">
        <div ref={domRef}>

        </div>
    </div>
}

export default Index