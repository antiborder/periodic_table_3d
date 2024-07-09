import styled from "styled-components"
import elements from "../constants/elements"

type AtomicModelProps = {
  symbol: string
  electron: any
  atomicNumber: number
}
function AtomicModel(props: AtomicModelProps): React.ReactNode {
  const initialPosition = (radius) => {
    const theta = Math.random() * 2 * Math.PI
    const x = 50 + Math.round(radius * Math.cos(theta))
    const y = 50 + Math.round(radius * Math.sin(theta))
    return [x, y]
  }

  const orbits = ["s", "p", "d", "f"]
  const orbitColors = ["#FF666A", "#FFBC20", "#67BCEE", "#6ADE68"]
  const radii = [10, 15.5, 21, 26.5, 32, 37.5, 43]

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <title>Classical Image of {props.symbol} by 3D periodic_table</title>
      {/* <!-- https://site-url/  --> */}

      <linearGradient
        id="bg-gradient"
        gradientUnits="userSpaceOnUse"
        x1="0%"
        y1="0%"
        x2="100%"
        y2="0%"
        gradientTransform="rotate(45)"
      >
        <stop offset="0%" stop-color="#f876de" />
        <stop offset="100%" stop-color="#b9d1eb" />
      </linearGradient>

      <circle
        cx="50%"
        cy="50%"
        r="5"
        stroke="url(#bg-gradient)"
        stroke-width="0.0"
        fill="#202e38"
      />
      <text
        x="50%"
        y="50.5%"
        fill="#ddd"
        dominant-baseline="middle"
        text-anchor="middle"
        font-family="'Open Sans', sans-serif"
        font-size="4"
        font-style="normal"
        font-weight="bold"
      >
        {props.symbol}
      </text>

      {[...Array(7)].map((_, k) => {
        return (
          <>
            {props.electron[k + 1] && (
              <circle cx="50%" cy="50%" r={radii[k]} stroke="#ccc" stroke-width="0.4" fill="none" />
            )}
            {orbits.map((orbit, j) => {
              return (
                props.electron[k + 1] &&
                [...Array(props.electron[k + 1][orbit] ? props.electron[k + 1][orbit] : 0)].map(
                  (_, i) => {
                    const pos = initialPosition(radii[k])
                    return (
                      <g key={i}>
                        <animateTransform
                          attributeName="transform"
                          attributeType="XML"
                          type="rotate"
                          from="0 50 50"
                          to="360 50 50"
                          dur={12 + Math.random() * 8 + "s"}
                          repeatCount="indefinite"
                        />
                        <circle
                          cx={Math.floor(pos[0]) + "%"}
                          cy={Math.floor(pos[1]) + "%"}
                          r="1.8"
                          stroke="#888"
                          stroke-width="0.1"
                          fill={orbitColors[j]}
                        />
                      </g>
                    )
                  }
                )
              )
            })}
          </>
        )
      })}
    </svg>
  )
}

export default AtomicModel
