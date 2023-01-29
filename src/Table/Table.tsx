import './Table.style.sass'
import { Row, RowDataType } from './Row'
import { rowsApi } from './Table.sevice'
import { useEffect, useState } from 'react'

export const entity = {
  id: 33097, 
  rowName: '9b72f240-526b-4172-8c41-f7d893911dd6',
}

export const Table = () => {

  const [rows, setRows] = useState<RowDataType[]>([])

  useEffect(() => {
    rowsApi.getRows(entity.id, entity.rowName).then((data) => setRows(data))
  }, [])

  return (
    <div className="table">
      <div className="table-header">
        <div className="table-header-title">Item 2</div>
        {rows.map(el => {return (<Row row={el} parentId={null} key={el.id} level={1}/>)})}
      </div>
    </div>
  )
}
