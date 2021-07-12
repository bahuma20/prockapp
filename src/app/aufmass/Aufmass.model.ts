export interface AufmassRow {
  label?: string,
  count?: number,
  type?: 'add' | 'substract',
  dimensions?: string,
}

export interface AufmassPosition {
  rows: AufmassRow[],
}

export interface Aufmass {
  unit: string,
  positions: AufmassPosition[]
}
