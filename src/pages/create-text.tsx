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
        renderer.setSize(contanierRef.current.clientWidth, contanierRef.current.clientHeight, false);
  
        domRef.current.appendChild(renderer.domElement);




    }, [])

    return <div ref={contanierRef} className="w-full h-full">
        <div ref={domRef}>

        </div>
    </div>
}

export default Index