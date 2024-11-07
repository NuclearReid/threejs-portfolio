import { Text, Html, Environment, useGLTF, OrbitControls, Float, PresentationControls, ContactShadows } from '@react-three/drei'


export default function Experience()
{   
    const computer = useGLTF('./macbook.gltf')
    // const computer = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf')

    return <>

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