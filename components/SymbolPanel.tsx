import styled from "styled-components"
import elements from "../constants/elements"

type SymbolPanelProps = {
  atomicNumber: number
  onAtomicNumberUp: () => void
  onAtomicNumberDown: () => void
}

const SymbolPanel = (props: SymbolPanelProps): React.ReactNode => {
  const selectedElement = elements[props.atomicNumber]

  return (
    <StyledSymbolPanel
      onClick={(event) => {
        event.stopPropagation()
      }}
    >
      <div className="modal-content">
        <div className="symbolBox">
          <div>
            <button className="atomicNumberDownButton" onClick={props.onAtomicNumberDown}>
              {"◀︎"}
            </button>
          </div>
          <div className="symbolLabel">
            <button className="symbolButton" onClick={props.onAtomicNumberUp}>
              {selectedElement.symbol}
            </button>
          </div>
          <div>
            <button className="atomicNumberUpButton" onClick={props.onAtomicNumberUp}>
              {"▶︎"}
            </button>
          </div>
        </div>
        <div className="atomicNumber">{props.atomicNumber}</div>
        <div className="elementName">{selectedElement.name}</div>
      </div>
    </StyledSymbolPanel>
  )
}

const StyledSymbolPanel = styled.div`
  position: fixed;
  top: 8px;
  left: 8px;
  background-color: white;
  opacity: 0.7;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size:12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 800;
  width: 90px;
  height: 76px;
  padding:0px;
  text-align: center;

  .modal-content{
    position:relative;
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
  .symbolBox{
    display:flex;
    flex-direction:row;
    margin-top:8px;
  }
  .symbolLabel{
    width:200px;
    height:100px;

    margin-top:12px;
    padding:0px;
  }

  .symbolButton{
    background-color:transparent;
    font-size:36px;
    color: blue;
    padding:0px 0px 1px ;
    border:none;
    cursor: pointer;
  }
  .atomicNumberDownButton{
    background-color:transparent;
    font-size:20px;
    padding:20px 0px 1px ;
    border:none;
    cursor: pointer;
  }
  .atomicNumberUpButton{
    background-color:transparent;
    font-size:20px;
    padding:20px 0px 1px ;
    border:none;
    cursor: pointer;
  }

  .atomicNumber{
    position:absolute;
    top: 2px;
    left: 8px;
    padding:0px;
    font-weight:bold;
    font-size:16px;
  }

  .elementName{
    position:absolute;
    top: 52px;
    width:100%;
    text-align:center;
    font-size:16px;
    }


`

export default SymbolPanel
