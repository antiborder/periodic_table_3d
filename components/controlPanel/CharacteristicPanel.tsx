import styled from "styled-components"
import {characteristicData } from "../../constants/characteristics"

type CharacteristicPanelProps = {
  characteristic: number
  onCharacteristicUp: () => void
  onCharacteristicDown: () => void
}

function CharacteristicPanel(props: CharacteristicPanelProps): React.ReactNode {

  return (
    <StyledCharacteristicPanel
      onClick={(event) => {
        event.stopPropagation()
      }}
    >
      <div className="characteristicBox">
        <div className="rightBox">
          <button className="characteristicUpButton" onClick={props.onCharacteristicUp}>
            <span className="characteristicName">{characteristicData[props.characteristic].NAME}</span>
            {"▶︎"}
          </button>
        </div>
        <button className="characteristicDownButton" onClick={props.onCharacteristicDown}>
          {"◀︎"}
        </button>
        <div className="characteristicLabel"> Color：</div>
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

  .characteristicLabel{
    padding:0px;
    font-size:14px;
    padding-left:4px;
  }
  .characteristicBox{
    display:flex;
    flex-direction:row-reverse;
    align-items:center;
    margin:4px;
  }
  .characteristicDownButton{
    width:26px;
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
    flex-direction:row-reverse;
    width:155px;
    background-color: white;
    opacity: 0.7;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding:0px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

    .infoIcon{
      // position: relative;
      // top:6px;
      // width:30px;
      // left: 6px;
      // margin:0px;
      // padding:0px;
      // cursor: pointer;
    }
    .characteristicUpButton{
      width:140px;
      background-color: white;
      text-align:right;
      margin-right:0px;
      padding-right:0px;
      border: none;
      font-size:20px;
      cursor: pointer;
      .characteristicName{
        font-size:14px;
      }
    }
  }
  cursor: pointer;
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
