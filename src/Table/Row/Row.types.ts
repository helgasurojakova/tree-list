export type RowDataType = {
  equipmentCosts: number
  estimatedProfit: number
  id: number
  machineOperatorSalary: number
  mainCosts: number
  materials: number
  mimExploitation: number
  overheads: number
  rowName: string
  salary: number
  supportCosts:  number
  total: number
  child: RowDataType[]
}

export type RowType = {
  row: RowDataType
  parentId: null | number
  level: number
}
