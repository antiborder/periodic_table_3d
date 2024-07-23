import React from "react"
import styled from "styled-components"
import elements from "../../constants/elements"
import constants from "../../constants/constants"
import { characteristicData } from "../../constants/characteristics"

const ElectronConfigurationBox = (props: { atomicNumber: number }): React.ReactNode => {
  return (
    <StyledElectronConfigurationBox>
      <div className="electronConfigurationBox">
        <div>
          <strong>Electronic Configuration</strong>
        </div>
        <Table className="electronConfigurationTable">
          <thead>
            <tr>
              <TD></TD>
              <TD>s</TD>
              <TD>p</TD>
              <TD>d</TD>
              <TD>f</TD>
            </tr>
          </thead>
          <tbody>
            {Object.entries(elements[props.atomicNumber].electron).map(([key, value]) => (
              <tr key={key}>
                <TD>{constants.SHELL_NAMES[parseInt(key, 10) - 1]}:&nbsp;&nbsp;</TD>
                {Object.entries(value).map(([subKey, subValue], index) => (
                  <TD key={subKey} color={characteristicData[0].GAUGE[index].COLOR}>
                    <TD>{subValue}</TD>
                  </TD>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </StyledElectronConfigurationBox>
  )
}
export default ElectronConfigurationBox

const Table = styled.table`
  text-align: left;
  margin-top: 0px;
  margin-left: 30px;
  padding-bottom: 16px;
  font-size: 16px;
  border-spacing: 4px 4px;
    tbody{
    font-weight: bold;
}
`

const TD = styled.td<{ color?: string }>`
width: 34px;
height:24px;
  background-color: ${(props) => props.color};
  opacity: 0.7;
  text-align: center;
    border-collapse: collapse;
  border-spacing: 4px 4px;
  border-radius:4px;
`

const StyledElectronConfigurationBox = styled.div`
  .electronConfigurationBox {
    width: 80%;
    background-color: #ddd;
    font-size: 16px;
    border-radius: 8px;
    margin: 20px auto;
    text-align: center;
  }
`
