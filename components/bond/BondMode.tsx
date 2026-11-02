import React, { useEffect, useMemo, useState } from "react"
import styled, { keyframes } from "styled-components"
import elements from "../../constants/elements"
import AtomicModel from "../modal/AtomicModel"
import {
  analyzeBond,
  electronAfterAccepting,
  electronAfterDonating,
  explainBond,
  isNoble,
  needOf,
  valenceOf,
  BondType,
} from "../../domain/bond"

export type BondPhase = "pick" | "predict" | "result"

type BondModeProps = {
  a: number
  b: number | null
  phase: BondPhase
  guessed: BondType | null
  onGuess: (t: BondType) => void
  onReset: () => void
  onExit: () => void
}

const PREDICTIONS: { type: BondType; icon: string; label: string }[] = [
  { type: "ionic", icon: "🎁", label: "渡す" },
  { type: "covalent", icon: "🤝", label: "分け合う" },
  { type: "metallic", icon: "🌊", label: "海になる" },
  { type: "none", icon: "💨", label: "何もしない" },
]

function captionFor(z: number): string {
  const el = elements[z]
  if (isNoble(el)) return "最外殻は満員！"
  if (el.metallic === "metal") return `最外殻 ${valenceOf(el)} 個（手放しやすい）`
  return `最外殻 ${valenceOf(el)} 個（あと ${needOf(el)} 個で満員）`
}

function BondMode(props: BondModeProps): React.ReactNode {
  const { a, b, phase, guessed } = props
  const elA = elements[a]
  const elB = b != null ? elements[b] : null
  const analysis = useMemo(() => (b != null ? analyzeBond(a, b) : null), [a, b])
  const explanation = useMemo(
    () => (b != null && analysis ? explainBond(a, b, analysis) : null),
    [a, b, analysis]
  )
  const [settled, setSettled] = useState(false)

  useEffect(() => {
    if (phase === "result") {
      setSettled(false)
      const t = setTimeout(() => setSettled(true), 1700)
      return () => clearTimeout(t)
    }
  }, [phase, a, b])

  const atomView = (
    z: number,
    opts: { size?: number; electronOverride?: any; charge?: string; dim?: boolean; extraClass?: string } = {}
  ) => {
    const el = elements[z]
    const size = opts.size ?? 165
    return (
      <div className={`atomWrap ${opts.extraClass ?? ""}`} style={{ width: size, opacity: opts.dim ? 0.3 : 1 }}>
        <div className="atomBox" style={{ width: size, height: size }}>
          <AtomicModel atomicNumber={z} symbol={el.symbol} electron={opts.electronOverride ?? el.electron} />
          {opts.charge && <div className={`charge ${opts.charge.startsWith("+") ? "plus" : "minus"}`}>{opts.charge}</div>}
        </div>
        <div className="atomCap">
          <b>{el.symbol}</b> {el.japaneseName}
          <br />
          {captionFor(z)}
        </div>
      </div>
    )
  }

  const renderStage = () => {
    if (b == null || !analysis) {
      return <div className="stageRow">{atomView(a, { size: 200 })}</div>
    }
    if (phase === "result" && analysis.type === "metallic") {
      const seq = a === b ? Array(9).fill(a) : [a, b, a, b, a, b, a, b, a]
      return (
        <div className="stageCol">
          <div className="lattice">
            {seq.map((z, i) => (
              <div key={i} className="latom" style={{ background: i % 2 ? "#7d8ca3" : "#5b7ba6" }}>
                {elements[z].symbol}
              </div>
            ))}
            {[...Array(12)].map((_, i) => (
              <span
                key={`s${i}`}
                className="seadot"
                style={{
                  left: `${8 + ((i * 29) % 84)}%`,
                  top: `${10 + ((i * 37) % 78)}%`,
                  animationDelay: `${(i % 6) * 0.35}s`,
                  animationDuration: `${2.4 + (i % 5) * 0.5}s`,
                }}
              />
            ))}
          </div>
          <div className="atomCap">最外殻の電子が「電子の海」になって全体を泳ぐ</div>
        </div>
      )
    }

    // ionic settled: swap electron configs, show charges and extra atoms
    let leftElectron: any = undefined
    let rightElectron: any = undefined
    let leftCharge: string | undefined
    let rightCharge: string | undefined
    if (phase === "result" && settled && analysis.type === "ionic") {
      const donorIsLeft = analysis.donor === a
      const donorEl = elements[analysis.donor as number]
      const acceptorEl = elements[analysis.acceptor as number]
      const donorView = electronAfterDonating(donorEl)
      const acceptorView = electronAfterAccepting(acceptorEl)
      leftElectron = donorIsLeft ? donorView : acceptorView
      rightElectron = donorIsLeft ? acceptorView : donorView
      leftCharge = donorIsLeft ? `+${analysis.electronsPerDonor}` : `−${analysis.needPerAcceptor}`
      rightCharge = donorIsLeft ? `−${analysis.needPerAcceptor}` : `+${analysis.electronsPerDonor}`
    }

    const showFly = phase === "result" && !settled && analysis.type === "ionic"
    const donorIsLeft = analysis.type === "ionic" && analysis.donor === a
    const flyCount =
      analysis.type === "ionic"
        ? Math.min(4, (analysis.electronsPerDonor ?? 1) * (analysis.acceptorCount ?? 1))
        : 0
    const flyDots = (inLeft: boolean) =>
      showFly && donorIsLeft === inLeft
        ? [...Array(flyCount)].map((_, i) => (
            <span
              key={i}
              className={`flyDot ${inLeft ? "flyToRight" : "flyToLeft"}`}
              style={{ top: 60 + i * 16, animationDelay: `${i * 0.18}s` }}
            />
          ))
        : null

    const pairDots =
      phase === "result" && analysis.type === "covalent" ? (
        <div className="bondZone">
          {[...Array(analysis.pairs ?? 1)].map((_, i) => (
            <React.Fragment key={i}>
              <span
                className="pairDot shareA"
                style={{ top: 26 + i * 22, marginLeft: (analysis.polarShift ?? 0) - 7 }}
              />
              <span
                className="pairDot shareB"
                style={{ top: 40 + i * 22, marginLeft: (analysis.polarShift ?? 0) - 7 }}
              />
            </React.Fragment>
          ))}
        </div>
      ) : (
        <div className="bondZone" />
      )

    const bDim = phase === "result" && settled && analysis.type === "none"
    const bClass = phase === "result" && analysis.type === "none" && !settled ? "bounce" : ""

    const extras: React.ReactNode[] = []
    if (phase === "result" && settled && analysis.type === "ionic") {
      if ((analysis.donorCount ?? 1) > 1)
        extras.push(
          <div key="ed" className="atomCap">
            {elements[analysis.donor as number].symbol} は全部で {analysis.donorCount} 個必要
          </div>
        )
      if ((analysis.acceptorCount ?? 1) > 1)
        extras.push(
          <div key="ea" className="atomCap">
            {elements[analysis.acceptor as number].symbol} は全部で {analysis.acceptorCount} 個必要
          </div>
        )
    }

    return (
      <div className="stageCol">
        <div className="stageRow">
          <div style={{ position: "relative" }}>
            {atomView(a, { electronOverride: leftElectron, charge: leftCharge })}
            {flyDots(true)}
          </div>
          {pairDots}
          <div className={bClass} style={{ position: "relative" }}>
            {atomView(b, { electronOverride: rightElectron, charge: rightCharge, dim: bDim })}
            {flyDots(false)}
          </div>
        </div>
        {extras}
      </div>
    )
  }

  return (
    <Root>
      <div className="bar">
        <span>
          🧲 くっつき方実験： <b>{elA.symbol}</b>
          {elB ? ` ＋ ${elB.symbol}` : ""}
        </span>
        <button className="exitBtn" onClick={props.onExit}>
          ✕ おわる
        </button>
      </div>

      <div className="stage">{renderStage()}</div>

      {phase === "pick" && (
        <div className="sheet">
          <p className="pickText">
            <b>{elA.symbol}</b> の相手を、うしろの周期表からタップしてね。
            <br />
            （タイルを長押しすると、その元素で実験をはじめられるよ）
          </p>
        </div>
      )}

      {phase !== "pick" && analysis && (
        <div className="sheet">
          {phase === "predict" && <p className="predTitle">どうなると思う？ 電子の動きを予想してタップ！</p>}
          {phase === "result" && explanation && (
            <p className="verdict">
              {guessed === analysis.type
                ? "🎉 予想的中！"
                : `実際は「${explanation.title.split("（")[0]}」だった。電子の動きを見てみて👇`}
            </p>
          )}
          <div className="predGrid">
            {PREDICTIONS.map((p) => {
              let cls = "pred"
              if (phase === "result") {
                if (p.type === analysis.type) cls += " correct"
                else if (p.type === guessed) cls += " wrong"
              }
              return (
                <button
                  key={p.type}
                  className={cls}
                  disabled={phase === "result"}
                  onClick={() => props.onGuess(p.type)}
                >
                  <span className="ico">{p.icon}</span>
                  {p.label}
                </button>
              )
            })}
          </div>
          {phase === "result" && explanation && (
            <div className="explain">
              <h3>
                {explanation.title}
                {analysis.formula && <span className="formula">{analysis.formula}</span>}
              </h3>
              <p>{explanation.body}</p>
              <div className="actions">
                <button onClick={props.onReset}>🔁 別の組み合わせ</button>
                <button onClick={props.onExit}>周期表にもどる</button>
              </div>
            </div>
          )}
        </div>
      )}
    </Root>
  )
}

const flyToRight = keyframes`
  0% { transform: translate(0,0); opacity: 0; }
  15% { opacity: 1; }
  55% { transform: translate(110px,-38px); opacity: 1; }
  100% { transform: translate(215px,0); opacity: 1; }
`
const flyToLeft = keyframes`
  0% { transform: translate(0,0); opacity: 0; }
  15% { opacity: 1; }
  55% { transform: translate(-110px,-38px); opacity: 1; }
  100% { transform: translate(-215px,0); opacity: 1; }
`
const shareA = keyframes`
  0%,100% { transform: translateX(-11px); }
  50% { transform: translateX(11px); }
`
const shareB = keyframes`
  0%,100% { transform: translateX(11px); }
  50% { transform: translateX(-11px); }
`
const drift = keyframes`
  0% { transform: translate(0,0); }
  33% { transform: translate(16px,-12px); }
  66% { transform: translate(-13px,9px); }
  100% { transform: translate(0,0); }
`
const bounce = keyframes`
  0% { transform: translateX(0); }
  40% { transform: translateX(-34px); }
  60% { transform: translateX(6px); }
  80% { transform: translateX(-16px); }
  100% { transform: translateX(0); }
`

const Root = styled.div`
  position: fixed;
  inset: 0;
  z-index: 700;
  pointer-events: none;
  font-family: "Hiragino Kaku Gothic Pro", Arial, sans-serif;

  .bar {
    pointer-events: auto;
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(34, 48, 74, 0.92);
    color: #fff;
    border-radius: 999px;
    padding: 8px 10px 8px 18px;
    font-size: 14px;
    display: flex;
    gap: 14px;
    align-items: center;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
    white-space: nowrap;
  }
  .exitBtn {
    pointer-events: auto;
    border: none;
    background: #fff;
    color: #22304a;
    font-weight: 700;
    border-radius: 999px;
    padding: 6px 12px;
    cursor: pointer;
    font-size: 13px;
  }
  .stage {
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    pointer-events: none;
  }
  .stageRow {
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }
  .stageCol {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }
  .atomWrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: opacity 0.5s;
  }
  .atomBox {
    position: relative;
    background: rgba(255, 255, 255, 0.88);
    border-radius: 50%;
  }
  .charge {
    position: absolute;
    top: 2px;
    right: 2px;
    min-width: 30px;
    height: 30px;
    border-radius: 999px;
    color: #fff;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    padding: 0 6px;
    z-index: 5;
  }
  .charge.plus { background: #2470c9; }
  .charge.minus { background: #e6492d; }
  .atomCap {
    text-align: center;
    font-size: 12px;
    color: #33507e;
    background: rgba(255, 255, 255, 0.85);
    border-radius: 8px;
    padding: 3px 8px;
    line-height: 1.5;
    margin-top: 2px;
  }
  .bondZone {
    position: relative;
    width: 56px;
    flex: 0 0 auto;
  }
  .pairDot {
    position: absolute;
    left: 50%;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #f59e0b;
    border: 2.5px solid #b45309;
    box-shadow: 0 0 8px rgba(245, 158, 11, 0.8);
  }
  .pairDot.shareA { animation: ${shareA} 1.15s ease-in-out infinite; }
  .pairDot.shareB { animation: ${shareB} 1.15s ease-in-out infinite; }
  .flyDot {
    position: absolute;
    left: 50%;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #f59e0b;
    border: 2.5px solid #b45309;
    box-shadow: 0 0 10px rgba(245, 158, 11, 0.9);
    opacity: 0;
    z-index: 8;
  }
  .flyDot.flyToRight { animation: ${flyToRight} 1.35s ease-in-out forwards; }
  .flyDot.flyToLeft { animation: ${flyToLeft} 1.35s ease-in-out forwards; }
  .bounce { animation: ${bounce} 1.1s ease-in-out; }
  .lattice {
    position: relative;
    display: grid;
    grid-template-columns: repeat(3, 62px);
    gap: 8px;
    background: rgba(255, 255, 255, 0.75);
    padding: 14px;
    border-radius: 16px;
  }
  .latom {
    width: 62px;
    height: 62px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: 800;
    font-size: 19px;
    box-shadow: inset 0 -6px 10px rgba(0, 0, 0, 0.22);
  }
  .seadot {
    position: absolute;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: #fbbf24;
    border: 2px solid #b45309;
    animation: ${drift} 3s ease-in-out infinite;
    z-index: 4;
  }
  .sheet {
    pointer-events: auto;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 14px;
    width: min(94vw, 430px);
    background: rgba(255, 255, 255, 0.96);
    border-radius: 18px;
    box-shadow: 0 6px 22px rgba(40, 60, 110, 0.22);
    padding: 14px 14px 12px;
  }
  .pickText {
    text-align: center;
    font-size: 14px;
    line-height: 1.7;
    color: #22304a;
    margin: 0;
  }
  .predTitle, .verdict {
    text-align: center;
    font-size: 14px;
    font-weight: 700;
    color: #22304a;
    margin: 0 0 10px;
  }
  .predGrid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 7px;
  }
  .pred {
    border: 3px solid #dbe4f2;
    background: #f7fafd;
    border-radius: 14px;
    padding: 9px 2px 7px;
    font-size: 13px;
    font-weight: 800;
    color: #22304a;
    cursor: pointer;
    text-align: center;
  }
  .pred .ico { display: block; font-size: 23px; margin-bottom: 3px; }
  .pred.correct { border-color: #22a06b; background: #e6f7ee; }
  .pred.wrong { border-color: #e6492d; background: #fdecea; }
  .pred:disabled { cursor: default; opacity: 0.92; }
  .explain { margin-top: 12px; }
  .explain h3 { font-size: 17px; margin: 0 0 6px; color: #22304a; display: flex; gap: 10px; align-items: center; }
  .formula {
    background: #22304a;
    color: #fff;
    border-radius: 9px;
    padding: 3px 12px;
    font-size: 16px;
    letter-spacing: 0.05em;
  }
  .explain p { font-size: 13px; line-height: 1.75; color: #33475f; margin: 0; }
  .actions { display: flex; gap: 8px; margin-top: 11px; }
  .actions button {
    flex: 1;
    border: none;
    border-radius: 11px;
    padding: 11px;
    background: #eef2f8;
    color: #22304a;
    font-weight: 800;
    font-size: 13.5px;
    cursor: pointer;
  }
`

export default BondMode
