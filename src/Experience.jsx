import { Text, Html, Environment, useGLTF, OrbitControls, Float, PresentationControls, ContactShadows, SpotLight, useAnimations } from '@react-three/drei'
import { Leva, useControls } from 'leva'
import { act, useEffect, useRef } from 'react'
import * as THREE from 'three'


export default function Experience()
{   
    const spotLightRef = useRef()

    // // This is just playing around
    // const spotLightProps = useControls('Spot Light', {
    //     position:
    //     {
    //         value: { x: 0, y: 0, z: 0},
    //         step: 0.1,
    //         joystick: 'invertY'
    //     },
    //     distance: 
    //     {
    //         value: 5,
    //         step: 1,
    //         min: 0,
    //         max: 100
    //     }
    // })
    const computer = useGLTF('./models/macbook-animation.glb')
    const {ref, actions, names } = useAnimations(computer.animations, computer.scene)

    console.log( actions.TopAction )

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


    // const computer = useGLTF('./macbook.gltf')
    // const computer = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf')


    return <>
        {/* <Leva /> */}
        <Environment // This is using the city hdr preset for lighting
            preset='city' 
        /> 
        <color args={['#241a1a']} attach='background'/>

        {/* <OrbitControls makeDefault /> */}

        <PresentationControls
            global // can move the model from anywhere on the screen
            rotation={[0.13, 0.1, 0]} // the default rotation of the presentation controls
            polar={[-0.4, 0.2]} // how far up and down you can move the model
            azimuth={[-1, 0.75]} // How far left and right you can move the model
            config={ {mass: 2, tension: 400 }} // creates an elastic effect when you drag and drop
            snap={{mass: 3, tension: 400 }}
        >
            <Float 
                rotationIntensity={0.2}
            >
                {/* Light */}
                <rectAreaLight
                    width={2.5}
                    height={1.65}
                    intensity={50}
                    color={'white'}
                    rotation={[0.1, Math.PI, 0]}
                    position={[0, 0.55, -1.15]}
                />

                {/* <SpotLight 
                    distance={spotLightProps.distance}
                    angle={0.4}
                    attenuation={5}
                    anglePower={1}
                    position={[spotLightProps.position.x, spotLightProps.position.y, spotLightProps.position.z]}
                /> */}
                {/* Laptop model */}
                <primitive
                    object={computer.scene}
                    position-y={-1.2} 
                >
                    <Html
                        transform // can make the iframe move around
                        wrapperClass='htmlScreen' // makes a class we can target with CSS (adjust the width and height in the CSS)

                        // use LEVA for each of these
                        distanceFactor={1.17}
                        position={[0, 1.56, -1.4]} 
                        rotation-x={-0.256}

                    >
                        <iframe src='https://main--reids-portfolio.netlify.app/' />
                    </Html>
                </primitive>
                {/* The text */}
                <Text
                    font='./bangers-v20-latin-regular.woff'
                    position={[2, 0.75, 0.5]}
                    scale={1}
                    rotation-y={-1.25}
                    // children={'Reid\rBack'} // Can make a line break
                    maxWidth={2} // also creates the line break
                    textAlign='center' // centers the text
                >
                    Reid Back
                </Text>
            </Float>
        </PresentationControls>

        <ContactShadows 
            position-y={-1.4} 
            opacity={0.4}
            scale={5}
            blur={2.4}
        />
    
    </>
}