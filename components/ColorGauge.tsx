import styled from "styled-components"
import ColorSample from "./ColorSample"
import constants from "../constants/constants"

const ColorGauge = (): React.ReactNode => {
  return (
    <StyledColorGauge>
        <ColorSample color={constants.COLORS[0].s}/>
        <ColorSample color={constants.COLORS[0].p}/>
        <ColorSample color={constants.COLORS[0].d}/>
        <ColorSample color={constants.COLORS[0].f}/>
    </StyledColorGauge>
  )
}

const StyledColorGauge = styled.div`
  position: fixed;
  opacity: 0.55;
  top: 90px;
  right: 8px;
  z-index: 800;
  width: 40px;
  height: 36px;
  padding:0px;
  text-align: center;


`

export default ColorGauge
