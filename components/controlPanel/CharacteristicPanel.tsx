import styled from "styled-components"
// import elements from '../constants/elements'

type CharacteristicPanelProps = {
  // atomicNumber: number
  characteristic: string
  onCharacteristicUp: () => void
  onCharacteristicDown: () => void
}

function CharacteristicPanel(props: CharacteristicPanelProps): React.ReactNode {
  // const selectedElement = elements[props.atomicNumber]

  return (
    <StyledCharacteristicPanel
      onClick={(event) => {
        event.stopPropagation()
      }}
    >
      <div className="modal-content">
        <div className="characteristicBox">
          <div className="characteristicLabel"> Color：</div>
          <button className="characteristicDownButton" onClick={props.onCharacteristicDown}>
            {"◀︎"}
          </button>

          <button className="characteristicUpButton" onClick={props.onCharacteristicUp}>
            <span className="characteristicName">{props.characteristic}</span>
            {"▶︎"}
          </button>
        </div>
      </div>
    </StyledCharacteristicPanel>
  )
}

const StyledCharacteristicPanel = styled.div`
  position: fixed;
  top: 50px;
  right: 8px;
  z-index: 800;
  width: 246px;
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
  .characteristicLabel{
    padding:0px;
    font-size:14px;
    padding-left:4px;
  }
  .characteristicBox{
    display:flex;
    justify-content:center;
    align-items:center;
    margin:4px;
  }
  .characteristicDownButton{
    width:60px;
    background-color: white;
    opacity: 0.7;
    text-align:right;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    padding:0px;
    font-size:20px;
    cursor: pointer;

  }
  .characteristicUpButton{
    width:330px;
    background-color: white;
    opacity: 0.7;
    text-align:right;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    padding:0px;
    font-size:20px;
    cursor: pointer;
    .characteristicName{
      font-size:16px;}
  }

  .characteristic{
    width:240px;
    background-color:transparent;
    padding:0px;
    font-size:20px;
    font-family: Arial, sans-serif;
    border:none;
    cursor: pointer;
  }

`

export default CharacteristicPanel
