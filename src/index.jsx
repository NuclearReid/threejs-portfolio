import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { Suspense } from 'react'
import { Loader } from '@react-three/drei'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <>
    <Canvas
    className='r3f' // This is needed to make the gestures work on mobile 
        camera={ {
            fov: 45,
            near: 0.1,
            far: 2000,
            position: [ -3, 1.5, 4 ]
        } }
    >
        <Suspense 
            fallback={null}
        >
        <Experience />
        </Suspense>
    </Canvas>
    <Loader />
    </>
)