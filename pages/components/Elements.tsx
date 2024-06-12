import React from 'react';

const Elements = (): React.ReactNode => {
  return (
    <>
      {[...Array(118)].map((_, i) => {
        return (
          //     // <Element {...props}
          //     //     key={i}
          //     //     atomicNumber={elements[(i + 1).toString()].atomicNumber}
          //     //     emissive={new THREE.Color('#000000')}
          //     //     count={props.count}
          //     // />

          <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, i, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="hotpink" />
          </mesh>
        )
      })}
    </>
  )
}
export default Elements

// const Element = (props) => {

//     return (
//         <>
//             {[...Array(118)].map((_, i) => {
//                 return (
//                     <Element {...props}
//                         key={i}
//                         atomicNumber={elements[(i + 1).toString()].atomicNumber}
//                         emissive={new THREE.Color('#000000')}
//                         count={props.count}
//                     />
//                 )
//             })}
//         </>
//     )
// }
