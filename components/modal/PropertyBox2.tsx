import React from "react"
import elements from "../../constants/elements"
import constants from "../../constants/constants"
import styled from "styled-components"

const PropertyBox2 = (props:{atomicNumber:number}):React.ReactNode => {

  const element = elements[props.atomicNumber]

  const metallic =
  element.metallic === "metal"
    ? "Metal"
    : element.metallic === "nonmetal"
      ? "Nonmeta"
      : element.metallic === "semimetal"
        ? "Semimetal"
        : ""

  const state=
    element.state === "solid"
      ? "Solid"
      : element.state === "liquid"
        ? "Liquid"
        : "Gas"

  return (
    <StyledPropertyBox2>
          <table>
            <tr>
              <td>Family:</td>
              <td>{elements[props.atomicNumber].family}</td>
            </tr>
            <tr>
              <td>Shell:</td>
              <td>{constants.SHELL_NAMES[elements[props.atomicNumber].orbit.charAt(0) - 1]}</td>
            </tr>
            <tr>
              <td>Group:</td>
              <td>{metallic}</td>
            </tr>
            <tr>
              <td>State:</td>
              <td>
                {state}
                <small>(RT)</small>
              </td>
            </tr>
          </table>

    </StyledPropertyBox2>
  )
}
export default PropertyBox2

const StyledPropertyBox2 = styled.div`
    width:80%;
    background-color: #ddd;
    font-size: 16px;
    border-radius: 8px;
    margin:20px auto;
    table{
    width:140px;
    margin: 0 auto;

      td:nth-child(1) {
        font-weight: normal ;
      }

      td:nth-child(2) {
        font-weight: bold;
      }
    }

`