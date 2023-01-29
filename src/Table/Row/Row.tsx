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

  const [newRowName, setNewRowName] = useState('')
  const [newSalary, setNewSalary] = useState(0)
  const [newEquipmentCosts, setNewEquipmentCosts] = useState(0)
  const [newOverheads, setNewOverheads] = useState(0)
  const [newEstimatedProfit, setNewEstimatedProfit] = useState(0)

  const handleCreateRow = () => {
    setCreateMode((prevState) => !prevState)
  }

  const handleChangeNewRowName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewRowName(event.target.value)
  }
  const handleChangeNewSalary = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewSalary(parseInt(event.target.value))
  }
  const handleChangeNewEquipmentCosts = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewEquipmentCosts(parseInt(event.target.value))
  }
  const handleChangeNewOverheads = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewOverheads(parseInt(event.target.value))
  }
  const handleChangeNewEstimatedProfit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewEstimatedProfit(parseInt(event.target.value))
  }

  const handleKeyDownCreate= (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
        rowsApi.createRow(
          entity.id, 
          newEquipmentCosts, 
          newEstimatedProfit, 
          newOverheads, 
          newRowName, 
          newSalary,
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
            value={newRowName}
            onChange={handleChangeNewRowName}
            onKeyDown={handleKeyDownCreate}
          />
        </div>
      </div>
      <div className="row-inputs__right-part">
        <div className="row-input-wrapper">
          <input 
            className="row-input row-input-active"
            value={newSalary}
            onChange={handleChangeNewSalary}
            type="number"
            onKeyDown={handleKeyDownCreate}
          />
        </div>
        <div className="row-input-wrapper">
          <input 
            className="row-input row-input-active"
            value={newEquipmentCosts}
            onChange={handleChangeNewEquipmentCosts}
            type="number"
            onKeyDown={handleKeyDownCreate}
          />
        </div>
        <div className="row-input-wrapper">
        <input 
          className="row-input row-input-active"
          value={newOverheads}
          onChange={handleChangeNewOverheads}
          type="number"
          onKeyDown={handleKeyDownCreate}
        />
        </div>
        <div className="row-input-wrapper">
          <input 
            className="row-input row-input-active"
            value={newEstimatedProfit}
            onChange={handleChangeNewEstimatedProfit}
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

