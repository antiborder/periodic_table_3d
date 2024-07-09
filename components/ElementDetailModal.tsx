import styled from "styled-components"
import elements from "../constants/elements"
import constants from "../constants/constants"
import AtomicModel from "./AtomicModel"
import React from "react"
import ElectronConfigurationBox from "./ElectronConfigrationBox"

type ElementDetailModalProps = {
  atomicNumber: number
  setIsModalVisible: (isModalVisible: boolean) => void
}

function ElementDetailModal(props: ElementDetailModalProps): React.ReactNode {
  const element = elements[props.atomicNumber]

  const handleSubmit = () => {
    props.setIsModalVisible(false)
  }

  const metallic =
    element.metallic === "metal"
      ? "Metal"
      : element.metallic === "nonmetal"
        ? "Nonmeta"
        : element.metallic === "semimetal"
          ? "Semimetal"
          : ""

  return (
    <StyledElementDetailModal
      onClick={(event) => {
        event.stopPropagation()
      }}
    >
      <div className="modal-content">
        <div className="atomicNumberLabel">　{/* {element.atomicNumber} */}</div>
        <div className="symbolLabel">{element.symbol}</div>
        <div className="nameLabel">{element.name}</div>

        <div className="propertyBox1">
          {/* <div>English Name: {element.name}</div> */}
          <div>Atomic Number: {element.atomicNumber}</div>
        </div>

        <AtomicModel
          atomicNumber={props.atomicNumber}
          symbol={element.symbol}
          electron={element.electron}
        />

        <div className="propertyBox2">
          <table>
            <tr>
              <td>Family:</td>
              <td>{element.family}</td>
            </tr>
            <tr>
              <td>Shell:</td>
              <td>{constants.SHELL_NAMES[element.orbit.charAt(0) - 1]}</td>
            </tr>
            <tr>
              <td>Group:</td>
              <td>{metallic}</td>
            </tr>
            <tr>
              <td>State:</td>
              <td>
                {element.state === "solid"
                  ? "Solid"
                  : element.state === "liquid"
                    ? "Liquid"
                    : "Gas"}
                <small>(RT)</small>
              </td>
            </tr>
          </table>
        </div>

        <div className="propertyBox3">
          <table>
            <tr>
              <td>Atomic Mass</td>
              <td>{element.atomicMass}</td>
            </tr>
            <tr>
              <td>Melting Point</td>
              <td>{element.meltingPoint}℃</td>
            </tr>
            <tr>
              <td>Boiling Point</td>
              <td>{element.boilingPoint}℃</td>
            </tr>
            <tr>
              <td>1st Ionization Energy</td>
              <td>{element["1stIonizationEnergy"]} kJ/mol</td>
            </tr>
            <tr>
              <td>Electron Affirnity</td>
              <td>{element.electronAffinity} kJ/mol</td>
            </tr>
            <tr>
              <td>Density</td>
              <td>{element.density} g/cm3</td>
            </tr>
          </table>
        </div>

        <ElectronConfigurationBox atomicNumber={props.atomicNumber} />

        <StyledCloseButton onClick={handleSubmit}>&times;</StyledCloseButton>
      </div>
    </StyledElementDetailModal>
  )
}

const StyledElementDetailModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  opacity: 0.9;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size:12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 800;
  max-width: 320px;
  width: 100%;
  padding:0px;
  text-align: center;

  .modal-content{
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    height:600px;
    width:100%;
    margin:0px;
    padding: 0px;
  }
  .modal-content::-webkit-scrollbar{
    display: none;
  }

    .atomicNumberLabel{
      text-align: left;
      margin-top:8px;
      margin-left: 8px;
      padding:0px;
      font-size:16px;
      font-family: Arial, sans-serif;
    }
    .symbolLabel{
      margin:16px;
      padding:0px;
      font-size:36px;
      line-height:0;
      font-family: Arial, sans-serif;

    }

    .nameLabel{
      font-size: 20px;
      font-family: "mochy","Hiragino Kaku Gothic Pro", "ヒラギノ角ゴ Pro", Arial, sans-serif;
    }

    .propertyBox1{
      width:80%;
      background-color: #fff;
      font-size: 16px;
      border-radius: 8px;
      margin:20px auto;


    }

    .propertyBox2{
      width:80%;
      background-color: #ddd;
      font-size: 16px;
      border-radius: 8px;
      margin:20px auto;
table{
width:140px;
margin: 0 auto;


      td:nth-child(1) {
  font-weight: normal ;
}

td:nth-child(2) {
  font-weight: bold;
}


}
    }

    .propertyBox3{
    border-collapse: collapse;
      width:80%;
      background-color: none;
      font-size: 14px;
      margin:20px auto;
table{
      border-collapse: collapse;
      width:100%;

      }
            td{
      border: 1px solid gray;


}

            }



    .firstIonizationEnergy{
      font-size: 12px;
    }

`

const StyledCloseButton = styled.button`
  position: absolute;
  width: 35px;
  height: 35px;
  top: -15px;
  right: -15px;
  background-color: #ccc;
  border-radius: 20px;
  border-width: 0px;
  border-color: #f2f2f2;
  font-size: 40px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default ElementDetailModal
