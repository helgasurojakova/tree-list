import { RowType } from './Row.types'
import './Row.style.sass'
import React, { useState } from 'react'
import { rowsApi } from '../Table.sevice'
import { entity } from '../Table'

export const Row = (props:RowType) => {
  const {
    id,
    rowName,
    salary,
    equipmentCosts,
    overheads,
    estimatedProfit,
    child,
  } = props

  const [isEditable, setIsEditable] = useState(false)

  const [state, setState] = useState({
    rowName,
    salary,
    equipmentCosts,
    overheads,
    estimatedProfit,
    child,
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setState((state) => ({...state, [key]: event.target.value}))
  }

  const handleEdit = () => {
    setIsEditable((prevState) => !prevState)
  }

  const handleKeyDownUpdate= (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
        rowsApi.updateRow(
          entity.id, 
          id, 
          state.equipmentCosts, 
          state.estimatedProfit, 
          state.overheads, 
          state.rowName, 
          state.salary)
        setIsEditable(false)
    }
  }

  // For creating new row
  const [createMode, setCreateMode] = useState(false)

  const [newRowState, setNewRowState] = useState({
    rowName: '',
    salary: 0,
    equipmentCosts: 0,
    overheads: 0,
    estimatedProfit: 0,
  })

  const handleChangeNewRow = (event: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setNewRowState((state) => ({...state, [key]: event.target.value}))
  }

  const handleCreateRow = () => {
    setCreateMode((prevState) => !prevState)
  }

  const handleKeyDownCreate= (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
        rowsApi.createRow(
          entity.id, 
          newRowState.equipmentCosts, 
          newRowState.estimatedProfit, 
          newRowState.overheads, 
          newRowState.rowName, 
          newRowState.salary,
          id,
          )
        setCreateMode(false)
    }
  }

  // Delete row

  const handleKeyDownDelete= () => {
    rowsApi.deleteRow(entity.id, id)
  }


  return (
    <>
      <div className="row" onDoubleClick={handleEdit}>
        <div className="row-icons-wrapper">
          <div className="row-icons">
            <span className="row-icons-add" onClick={handleCreateRow}></span>
            <span className="row-icons-delete" onClick={handleKeyDownDelete}></span>
          </div>
        </div>
        <div className="row-inputs__left-part">
          <div className="row-input-wrapper">
            <input 
              className={`row-input${isEditable ? ' row-input-active' : ''}`} 
              value={state.rowName}
              onChange={(event) => handleChange(event, 'rowName')}
              readOnly={!isEditable}
              onKeyDown={handleKeyDownUpdate}
            />
          </div>
        </div>
        <div className="row-inputs__right-part">
          <div className="row-input-wrapper">
            <input 
              className={`row-input${isEditable ? ' row-input-active' : ''}`} 
              value={state.salary}
              onChange={(event) => handleChange(event, 'salary')}
              readOnly={!isEditable}
              type="number"
              onKeyDown={handleKeyDownUpdate}
            />
          </div>
          <div className="row-input-wrapper">
            <input 
              className={`row-input${isEditable ? ' row-input-active' : ''}`} 
              value={state.equipmentCosts}
              onChange={(event) => handleChange(event, 'equipmentCosts')}
              readOnly={!isEditable}
              type="number"
              onKeyDown={handleKeyDownUpdate}
            />
          </div>
          <div className="row-input-wrapper">
            <input 
              className={`row-input${isEditable ? ' row-input-active' : ''}`} 
              value={state.overheads}
              onChange={(event) => handleChange(event, 'overheads')}
              readOnly={!isEditable}
              type="number"
              onKeyDown={handleKeyDownUpdate}
            />
          </div>
          <div className="row-input-wrapper">
            <input 
              className={`row-input${isEditable ? ' row-input-active' : ''}`} 
              value={state.estimatedProfit}
              onChange={(event) => handleChange(event, 'estimatedProfit')}
              readOnly={!isEditable}
              type="number"
              onKeyDown={handleKeyDownUpdate}
            />
          </div>
        </div>
      </div>
      {createMode && 
      <div className="row" onDoubleClick={handleEdit}>
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
      {child && child.map((el) => {return (<Row
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
          })
      }
    </>
  )
}

