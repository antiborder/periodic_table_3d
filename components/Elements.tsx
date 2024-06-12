import React from 'react';
import Element from './Element';
import elements from '../constants/elements';

const Elements = (): React.ReactNode => {
  return (
    <>
      {[...Array(118)].map((_, i) => {
        return (
                    <Element
                        key={i}
                        atomicNumber = {elements[(i + 1).toString()].atomicNumber}
                        numberOfCharacteristics={5}
                        characteristicCount={0}
                        numberOfShapes={5}
                        shapesCount={0}
                        selectedAtomicNumber={1}
                        count={1000}
                        // emissive={new THREE.Color('#000000')}
                        // count={props.count}
                    />
        )
      })}
    </>
  )
}
export default Elements