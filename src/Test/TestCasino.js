function getWinningMultiplier() {
  const probabilities = {
    '0x': 0.2,
    '0.25x': 0.25,
    '0.5x': 0.2,
    '0.75x': 0.15,
    '1x': 0.1,
    '1.5x': 0.05,
    '2x': 0.03,
    '5x': 0.02
  }

  const randomValue = Math.random()

  let cumulativeProbability = 0
  for (const multiplier in probabilities) {
    cumulativeProbability += probabilities[multiplier]
    if (randomValue <= cumulativeProbability) {
      return multiplier
    }
  }
}

const _obj = {
  '0x': [],
  '0.25x': [],
  '0.5x': [],
  '0.75x': [],
  '1x': [],
  '1.5x': [],
  '2x': [],
  '5x': []
}

for (let i = 0; i < 1000; i++) {
  const resp = getWinningMultiplier()
  _obj[resp].push(resp)
}

for (let key in _obj) {
  // console.log(key, _obj[key].length)
}

const x = 1.5
console.log(`${x}x`)
