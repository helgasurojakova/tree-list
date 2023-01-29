import './Table.style.sass'
import { Row, RowType } from './Row'
import { rowsApi } from './Table.sevice'
import { useEffect, useState } from 'react'

export const entity = {
  id: 33097, 
  rowName: '9b72f240-526b-4172-8c41-f7d893911dd6',
}

export const Table = () => {

  const [rows, setRows] = useState<RowType[]>([])

  useEffect(() => {
    rowsApi.getRows(entity.id, entity.rowName).then((data) => setRows(data))
  }, [])

  return (
    <div className="table">
      <div className="table-header">
        <div className="table-header-title">Item 2</div>
        {rows.map(el => {return (<Row
          key={el.id}
          equipmentCosts={el.equipmentCosts}
          estimatedProfit={el.estimatedProfit}
          id={el.id}
          machineOperatorSalary={el.machineOperatorSalary}
          mainCosts={el.mainCosts}
          materials={el.materials}
          mimExploitation={el.mimExploitation}
          overheads={el.overheads}
          rowName={el.rowName}
          salary={el.salary}
          supportCosts={el.supportCosts}
          total={el.total}
          child={el.child}/>)
          })}
      </div>
    </div>
  )
}
