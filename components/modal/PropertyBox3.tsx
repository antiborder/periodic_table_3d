import React from "react"
import elements from "../../constants/elements"
import styled from "styled-components"

const PropertyBox3 = (props: { atomicNumber: number }): React.ReactNode => {
  const element = elements[props.atomicNumber]
  return (
    <StyledPropertyBox3>
      <table>
        <tr>
          <td>Atomic Mass</td>
          <td>{element.atomicMass}</td>
        </tr>
        <tr>
          <td>Melting Point</td>
          <td>{element.meltingPoint}℃</td>
        </tr>
        <tr>
          <td>Boiling Point</td>
          <td>{element.boilingPoint}℃</td>
        </tr>
        <tr>
          <td>1st Ionization Energy</td>
          <td>{element["1stIonizationEnergy"]} kJ/mol</td>
        </tr>
        <tr>
          <td>Electron Affirnity</td>
          <td>{element.electronAffinity} kJ/mol</td>
        </tr>
        <tr>
          <td>Density</td>
          <td>{element.density} g/cm3</td>
        </tr>
      </table>
    </StyledPropertyBox3>
  )
}
export default PropertyBox3

const StyledPropertyBox3 = styled.div`

    border-collapse: collapse;
    width:80%;
    background-color: none;
    font-size: 14px;
    margin:20px auto;
      table{
          border-collapse: collapse;
          width:100%;
      }
      td{
        border: 1px solid gray;
      }
    }
    .firstIonizationEnergy{
      font-size: 12px;
    }
`
