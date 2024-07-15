/**
 * 2つの数値の余りを求める関数
 * @param x - 被除数
 * @param n - 除数
 * @returns 余り
 */
export function modulo(x: number, n: number): number {
    // 負の数の場合は+nして正の値にする
    if (x < 0) {
      return (x % n + n) % n;
    }
    return x % n;
  }
