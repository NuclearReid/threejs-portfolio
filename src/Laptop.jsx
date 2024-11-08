import { Html, useGLTF, useAnimations } from "@react-three/drei"
import { useControls } from "leva"
import { useEffect, useState } from "react"
import * as THREE from 'three'

export default function Laptop()
{
/* 
 * Computer
 */
    const computer = useGLTF('./models/macbook-animation.glb')

    // opening animation
    const {ref, actions, names } = useAnimations(computer.animations, computer.scene)
    useEffect(() =>
    {
        const action = actions.TopAction

        action
            .reset()
            .fadeIn(0.5)
            .setLoop(THREE.LoopOnce, 1)
            .clampWhenFinished = true
        
        action.play()
        return() =>
        {
            action.fadeOut(0.5)
        }
    }, [])


    // Waits for the computer animation to be done before displaying the html page
    const [showHtml, setShowHtml] = useState(false)

    useEffect(() =>
    {
        const timer = setTimeout(() =>
        {
        setShowHtml(true)
        }, 3000) // a 0.2 sec delay

        return() => clearTimeout(timer)
    }, [])

/* 
 * Controls
 */
    // HTML Controls
    // const { position, rotation} = useControls('htmlPage', {
    //     position:
    //     {
    //         value: { x: 0, y: 0, z: 0},
    //         step: 0.01,
    //         max: 3,
    //         joystick: 'invertY'
    //     },
    //     rotation:
    //     {
    //         value: -0.36,
    //         step: 0.001,
    //         min: -1,
    //         max: 1
    //     }

    // })   


    return(
        <>
            <primitive
                    object={computer.scene}
                    position-y={-1.2} 
                >

                    {showHtml && <Html
                        transform // can make the iframe move around
                        wrapperClass='htmlScreen' // makes a class we can target with CSS (adjust the width and height in the CSS)

                        // use LEVA for each of these
                        distanceFactor={1.17}

                        // Open Position
                        position={[0, 1.54, -1.47]} 
                        rotation-x={-0.36}

                    >
                        <iframe src='https://main--reids-portfolio.netlify.app/' />
                    </Html> }

                </primitive>

        </>
    )
}

