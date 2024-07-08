import styled from "styled-components"

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
      <div className="modal-content">
        <div className="shapeBox">
          <div className="shapeLabel"> Shape：</div>
          <button className="shapeDownButton" onClick={props.onShapeDown}>
            {"◀︎"}
            {/* </button>
          <button
            className='shape'
            onClick={props.onShapeUp}
          > */}
          </button>
          <button className="shapeUpButton" onClick={props.onShapeUp}>
            {props.shape}
            {"▶︎"}
          </button>
        </div>
      </div>
    </StyledShapePanel>
  )
}

const StyledShapePanel = styled.div`
  position: fixed;
  top: 8px;
  right: 8px;
  z-index: 800;
  width: 280px;
  height: 36px;
  padding:0px;
  text-align: center;

  .modal-content{
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    width:100%;
    margin:0px;
    padding: 0px;
  }
  .modal-content::-webkit-scrollbar{
    display: none;
  }
  .shapeLabel{
    padding:0px;
    font-size:16px;
    padding-left:4px;
  }
  .shapeBox{
    display:flex;
    justify-content:center;
    align-items:center;
    margin:4px;
  }
  .shapeDownButton{
    width:50px;
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
  .shapeUpButton{
    width:350px;
    background-color: white;
    opacity: 0.7;
    text-align:right;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    padding:0px;
    margin:0px;
    font-size:20px;
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
