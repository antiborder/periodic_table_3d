import styled from "styled-components"
import elements from "../constants/elements"
import AtomicModel from "./AtomicModel"
import React from "react"

type ElementDetailModalProps = {
  atomicNumber: number
  setIsModalVisible: (isModalVisible: boolean) => void
}

function ElementDetailModal(props: ElementDetailModalProps): React.ReactNode {
  const element = elements[props.atomicNumber]

  const handleSubmit = () => {
    props.setIsModalVisible(false)
  }

  const shell =
    element.orbit.charAt(0) === "1"
      ? "K"
      : element.orbit.charAt(0) === "2"
        ? "L"
        : element.orbit.charAt(0) === "3"
          ? "M"
          : element.orbit.charAt(0) === "4"
            ? "N"
            : element.orbit.charAt(0) === "5"
              ? "O"
              : element.orbit.charAt(0) === "6"
                ? "P"
                : element.orbit.charAt(0) === "7"
                  ? "Q"
                  : ""

  const metallic =
    element.metallic === "metal"
      ? "金属"
      : element.metallic === "nonmetal"
        ? "非金属"
        : element.metallic === "semimetal"
          ? "半金属"
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
        <div className="nameLabel">{element.japaneseName}</div>

        <div className="propertyBox1">
          <div>英名: {element.name}</div>
          <div>原子番号: {element.atomicNumber}</div>
        </div>

        <AtomicModel
          atomicNumber={props.atomicNumber}
          symbol={element.symbol}
          electron={element.electron}
        />

        <div className="propertyBox2">
          <div>{element.family} 族</div>
          <div>{shell} 殻</div>
          <div>{metallic}</div>
          <div>
            常温で
            {element.state === "solid" ? "固体" : element.state === "liquid" ? "液体" : "気体"}
          </div>
        </div>

        <div className="propertyBox3">
          <div>原子量：{element.atomicMass}</div>
          <div>融点：{element.meltingPoint}℃</div>
          <div>沸点：{element.boilingPoint}℃</div>
          <div className="firstIonizationEnergy">
            第一イオン化エネルギー：{element["1stIonizationEnergy"]} kJ/mol
          </div>
          <div>電子親和力：{element.electronAffinity} kJ/mol</div>
          <div>密度：{element.density} g/cm3</div>
        </div>

        <div className="electronConfigurationBox">
          <div>＜電子配置＞</div>
          <div style={{ textAlign: "left", marginLeft: "100px", fontSize: "16px" }}>
            {Object.entries(element.electron).map(([key, value]) => (
              <div key={key}>
                {key}:&nbsp;&nbsp;&nbsp;&nbsp;
                {/* <ul> */}
                {Object.entries(value).map(([subKey, subValue]) => (
                  <span key={subKey}>{subValue}&nbsp;</span>
                ))}
                {/* </ul> */}
              </div>
            ))}
          </div>
        </div>

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

    }
    .propertyBox3{
      width:80%;
      background-color: #ddd;
      font-size: 16px;
      border-radius: 8px;
      margin:20px auto;

    }

    .firstIonizationEnergy{
      font-size: 12px;
    }

    .electronConfigurationBox{
      width:80%;
      background-color: #ddd;
      font-size: 16px;
      border-radius: 8px;
      margin:20px auto;

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
