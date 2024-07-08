import styled from "styled-components"
import InfoIcon from './InfoIcon';

type ShapePanelProps = {
  // atomicNumber: number
  shape: string
  onShapeUp: () => void
  onShapeDown: () => void
}

const ShapePanel = (props: ShapePanelProps): React.ReactNode => {
  // const selectedElement = elements[props.atomicNumber]

  return (
    <StyledShapePanel
      onClick={(event) => {
        event.stopPropagation()
      }}
    >
        <div className="shapeBox">

          <div className="rightBox">
            <a href="posts/shapes-of-periodic-table"className = "infoIcon"><InfoIcon/></a>

            <button className="shapeUpButton" onClick={props.onShapeUp}>

              <span className="shapeName">{props.shape}</span>
              {"▶︎"}
            </button>
          </div>
          <button className="shapeDownButton" onClick={props.onShapeDown}>
            {"◀︎"}
          </button>
          <div className="shapeLabel"> Shape：</div>
        </div>
    </StyledShapePanel>
  )
}

const StyledShapePanel = styled.div`
  position: fixed;
  top: 8px;
  right: 8px;
  z-index: 800;
  height: 36px;

  .shapeLabel{
    padding:0px;
    font-size:14px;
    padding-left:4px;
  }
  .shapeBox{
    display:flex;
    flex-direction:row-reverse;
    align-items:center;
    margin:4px;
  }
  .shapeDownButton{
    width:30px;
    heitht:50px;
    background-color: white;
    opacity: 0.7;
    font-size:20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    padding:0px;
    margin:0px;
    cursor: pointer;
  }

  .rightBox{
    display:flex;
    flex-direction:row;
    width:155px;
    background-color: white;
    opacity: 0.7;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding:0px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

    .infoIcon{
    position: relative;
    top:6px;
    width:30px;
    left: 6px;
      margin:0px;
      padding:0px;
          cursor: pointer;


    }
     .shapeUpButton{
     width:140px;
     background-color: white;
    text-align:right;
     margin-right:0px;
     padding-right:0px;
      border: none;
      font-size:20px;
          cursor: pointer;
          .shapeName{
            font-size:16px;
            }
    }
  }
    cursor: pointer;
  }

  .shape{
    width:240px;
    background-color:transparent;
    padding:0px;
    font-size:20px;
    font-family: Arial, sans-serif;
    border:none;
    cursor: pointer;
  }

`

export default ShapePanel
