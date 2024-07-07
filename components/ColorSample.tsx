import styled from "styled-components"

const ColorSample = (props: { color: string }): React.ReactNode => {
    return (
      <StyledColorSample color={props.color}>
      </StyledColorSample>
    )
  }

  const StyledColorSample = styled.div<{ color: string }>`
    width: 24px;
    height: 16px;
    z-index: 800;
    padding:0px;
    margin: 2px;
    align-items: center;
    background-color: ${(props) => props.color};
  `
  export default ColorSample