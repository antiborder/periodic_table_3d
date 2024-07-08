import styled from "styled-components"
import ColorSample from "./ColorSample"
import constants from "../constants/constants"

type ColorgaugeProps = {
  characteristic: string
}

const ColorGauge = (props: ColorgaugeProps): React.ReactNode => {
  return (
    <StyledColorGauge>
      {constants.COLORS[props.characteristic].map((color, index) => (
        <ColorSample key={index} color={color.COLOR} text={color.TEXT} />
      ))}
    </StyledColorGauge>
  )
}

const StyledColorGauge = styled.div`
  position: fixed;
  opacity: 0.55;
  top: 90px;
  right: 0px;
  z-index: 800;
  width: 100px;
  height: 36px;
  padding:0px;
  text-align: center;
`

export default ColorGauge
