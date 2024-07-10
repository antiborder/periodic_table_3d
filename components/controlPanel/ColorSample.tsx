import styled from "styled-components"

const ColorSample = (props: { color: string; text: string }): React.ReactNode => {
  return (
    <StyledColorSample color={props.color}>
      <div className="card"></div>
      <span className="label">{props.text}</span>
    </StyledColorSample>
  )
}

const StyledColorSample = styled.div<{ color: string }>`
display: flex;
  flex-direction: row-reverse;
  font-size: 14px;

  margin-right: 10px;

    .card{
    width: 24px;
    height: 16px;
    z-index: 800;
    padding:0px;
    margin: 2px;
    align-items: center;
    background-color: ${(props) => props.color};
}
  `
export default ColorSample
