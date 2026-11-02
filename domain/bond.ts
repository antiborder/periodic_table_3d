import elements from "../constants/elements"
import electronegativity from "../constants/electronegativity"

export type BondType = "ionic" | "covalent" | "metallic" | "none"

export type BondAnalysis = {
  type: BondType
  // ionic
  donor?: number
  acceptor?: number
  electronsPerDonor?: number
  needPerAcceptor?: number
  donorCount?: number
  acceptorCount?: number
  // covalent
  pairs?: number
  polarShift?: number // px, + toward B, - toward A
  polarToward?: number | null // atomic number of the element the pair leans to
  // shared
  formula: string
  countA: number
  countB: number
}

const SUB: { [n: number]: string } = { 2: "₂", 3: "₃", 4: "₄", 5: "₅", 6: "₆" }

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b)
}
function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b)
}

export function outerShellNumber(element: any): number {
  return Math.max(...Object.keys(element.electron).map((k) => parseInt(k, 10)))
}

/** electrons in the outermost shell (simplified model used across the app) */
export function valenceOf(element: any): number {
  const outer = outerShellNumber(element)
  return (Object.values(element.electron[outer]) as number[]).reduce((sum, n) => sum + n, 0)
}

export function shellCapacity(element: any): number {
  return outerShellNumber(element) === 1 ? 2 : 8
}

/** how many more electrons until the outer shell is full (0 for metals) */
export function needOf(element: any): number {
  if (element.metallic === "metal") return 0
  return Math.max(0, shellCapacity(element) - valenceOf(element))
}

export function isNoble(element: any): boolean {
  return element.family === 18
}

export function classify(aZ: number, bZ: number): BondType {
  const A = elements[aZ]
  const B = elements[bZ]
  if (isNoble(A) || isNoble(B)) return "none"
  const aMetal = A.metallic === "metal"
  const bMetal = B.metallic === "metal"
  if (aMetal && bMetal) return "metallic"
  if (aMetal !== bMetal) return "ionic"
  return "covalent"
}

function formulaOf(symA: string, countA: number, symB: string, countB: number, same: boolean): string {
  if (same) return symA + (SUB[countA + countB] ?? String(countA + countB))
  return (countA > 1 ? symA + (SUB[countA] ?? countA) : symA) + (countB > 1 ? symB + (SUB[countB] ?? countB) : symB)
}

export function analyzeBond(aZ: number, bZ: number): BondAnalysis {
  const A = elements[aZ]
  const B = elements[bZ]
  const type = classify(aZ, bZ)

  if (type === "ionic") {
    const donorZ = A.metallic === "metal" ? aZ : bZ
    const acceptorZ = donorZ === aZ ? bZ : aZ
    const donor = elements[donorZ]
    const acceptor = elements[acceptorZ]
    const perDonor = valenceOf(donor)
    const need = Math.max(1, needOf(acceptor))
    const total = lcm(perDonor, need)
    const donorCount = total / perDonor
    const acceptorCount = total / need
    const countA = donorZ === aZ ? donorCount : acceptorCount
    const countB = donorZ === aZ ? acceptorCount : donorCount
    return {
      type,
      donor: donorZ,
      acceptor: acceptorZ,
      electronsPerDonor: perDonor,
      needPerAcceptor: need,
      donorCount,
      acceptorCount,
      formula: formulaOf(donor.symbol, donorCount, acceptor.symbol, acceptorCount, false),
      countA,
      countB,
    }
  }

  if (type === "covalent") {
    const needA = needOf(A)
    const needB = needOf(B)
    const pairs = Math.max(1, Math.min(Math.min(needA, needB), 3))
    let countA = 1
    let countB = 1
    if (aZ === bZ) {
      countA = 1
      countB = 1
    } else if (needA !== needB) {
      const bigNeed = Math.max(needA, needB)
      const smallNeed = Math.min(needA, needB)
      if (bigNeed % smallNeed === 0) {
        const satellites = Math.min(bigNeed / smallNeed, 4)
        if (needA > needB) countB = satellites
        else countA = satellites
      }
    }
    // H-first convention except hydrocarbons
    let firstSym = A.symbol
    let firstCount = countA
    let secondSym = B.symbol
    let secondCount = countB
    if (B.symbol === "H" && A.symbol !== "C") {
      firstSym = B.symbol; firstCount = countB; secondSym = A.symbol; secondCount = countA
    } else if (A.symbol !== "H" && B.symbol !== "H") {
      // keep selected order
    } else if (A.symbol === "H" && B.symbol !== "C" && aZ !== bZ) {
      // already H first
    }
    const enA = electronegativity[aZ]
    const enB = electronegativity[bZ]
    let polarShift = 0
    let polarToward: number | null = null
    if (enA != null && enB != null && Math.abs(enB - enA) >= 0.5) {
      polarShift = Math.max(-18, Math.min(18, (enB - enA) * 14))
      polarToward = enB > enA ? bZ : aZ
    }
    return {
      type,
      pairs,
      polarShift,
      polarToward,
      formula: formulaOf(firstSym, firstCount, secondSym, secondCount, aZ === bZ),
      countA,
      countB,
    }
  }

  // metallic / none
  return { type, formula: "", countA: 1, countB: 1 }
}

/** electron config after losing the whole outer shell (donor in ionic bond) */
export function electronAfterDonating(element: any): any {
  const copy = JSON.parse(JSON.stringify(element.electron))
  delete copy[outerShellNumber(element)]
  return copy
}

/** electron config after the outer shell is filled (acceptor in ionic bond) */
export function electronAfterAccepting(element: any): any {
  const copy = JSON.parse(JSON.stringify(element.electron))
  const outer = outerShellNumber(element)
  let rest = needOf(element)
  const shell = copy[outer]
  const order = ["p", "s", "d", "f"]
  const caps: { [k: string]: number } = { s: 2, p: 6, d: 10, f: 14 }
  for (const sub of order) {
    if (rest <= 0) break
    const cur = shell[sub] ?? 0
    const add = Math.min(rest, caps[sub] - cur)
    if (add > 0) {
      shell[sub] = cur + add
      rest -= add
    }
  }
  return copy
}

export function explainBond(aZ: number, bZ: number, r: BondAnalysis): { title: string; body: string } {
  const A = elements[aZ]
  const B = elements[bZ]
  switch (r.type) {
    case "ionic": {
      const D = elements[r.donor as number]
      const C = elements[r.acceptor as number]
      return {
        title: "渡す（イオン結合）",
        body: `${D.symbol} は最外殻の電子 ${r.electronsPerDonor} 個を手放すと満員に、${C.symbol} は ${r.needPerAcceptor} 個もらうと満員になる。だから電子が ${D.symbol} から ${C.symbol} へ移り、＋と−が引き合ってくっつく。できあがりは ${r.formula}。`,
      }
    }
    case "covalent": {
      const polar =
        r.polarToward != null
          ? ` 電子の引き寄せは ${elements[r.polarToward].symbol} の方が強いので、ペアはそちらに寄っている（極性）。`
          : ""
      return {
        title: "分け合う（共有結合）",
        body: `${A.symbol} はあと ${needOf(A)} 個、${B.symbol} はあと ${needOf(B)} 個で満員。どちらも電子がほしいので、渡さずに分け合う。間にある電子ペアが両方をつなぐ。できあがりは ${r.formula}。${polar}`,
      }
    }
    case "metallic":
      return {
        title: "海になる（金属結合）",
        body: `${A.symbol} も ${B.symbol} も金属。最外殻の電子は1つの原子にとどまらず、全体を自由に動き回る「電子の海」になる。その海がプラスの原子たちをまとめてくっつける。`,
      }
    default: {
      const noble = isNoble(A) ? A : B
      const other = noble === A ? B : A
      return {
        title: "何もしない",
        body: `${noble.symbol} は最外殻がすでに満員。電子をもらう理由も、あげる理由もないので、${other.symbol} が近づいてもくっつかない。`,
      }
    }
  }
}
