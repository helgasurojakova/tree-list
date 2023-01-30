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

  const [newRowState, setNewRowState] = useState({
    rowName: '',
    salary: 0,
    equipmentCosts: 0,
    overheads: 0,
    estimatedProfit: 0,
  })

  function handleChangeNewRow(event: React.ChangeEvent<HTMLInputElement>, key: string) {
    setNewRowState((v) => ({...v, [key]: event.target.value}))
  }

  function handleKeyDownCreate(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
        rowsApi.createRow(
          entity.id, 
          newRowState.equipmentCosts, 
          newRowState.estimatedProfit, 
          newRowState.overheads, 
          newRowState.rowName, 
          newRowState.salary,
          null,
          ).then((data) => {
            setRows([data.current])
          })
    }
  }

  function handleDelete() {
    setRows([])
  }

  return (
    <div className="table">
      <div className="table-header">
        <div className="table-header-title">Item 2</div>
        {rows.length ? rows.map(el => {return (<Row row={el} parentId={null} key={el.id} level={1} onDelete={handleDelete}/>)})
        :
        <div className="row">
          <div className="row-icons-wrapper">
          </div>
          <div className="row-inputs__left-part">
            <div className="row-input-wrapper">
              <input 
                className="row-input row-input-active"
                value={newRowState.rowName}
                onChange={(event) => handleChangeNewRow(event, 'rowName')}
                onKeyDown={handleKeyDownCreate}
              />
            </div>
          </div>
          <div className="row-inputs__right-part">
            <div className="row-input-wrapper">
              <input 
                className="row-input row-input-active"
                value={newRowState.salary}
                onChange={(event) => handleChangeNewRow(event, 'salary')}
                type="number"
                onKeyDown={handleKeyDownCreate}
              />
            </div>
            <div className="row-input-wrapper">
              <input 
                className="row-input row-input-active"
                value={newRowState.equipmentCosts}
                onChange={(event) => handleChangeNewRow(event, 'equipmentCosts')}
                type="number"
                onKeyDown={handleKeyDownCreate}
              />
            </div>
            <div className="row-input-wrapper">
            <input 
              className="row-input row-input-active"
              value={newRowState.overheads}
              onChange={(event) => handleChangeNewRow(event, 'overheads')}
              type="number"
              onKeyDown={handleKeyDownCreate}
            />
            </div>
            <div className="row-input-wrapper">
              <input 
                className="row-input row-input-active"
                value={newRowState.estimatedProfit}
                onChange={(event) => handleChangeNewRow(event, 'estimatedProfit')}
                type="number"
                onKeyDown={handleKeyDownCreate}
              />
            </div>
          </div>
        </div>
        }
      </div>
    </div>
  )
}
