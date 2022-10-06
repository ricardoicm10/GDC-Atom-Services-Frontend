import React, {useMemo} from "react"
import { Button } from "react-bootstrap"
import {useTable} from 'react-table'
import "./Table.css"

function Table ({columns,data,addColumnButton,handleEdit}) {

    const COLUMNS = useMemo(() => columns,[columns])
    const DATA = useMemo(() => data,[data])

    const tableInstance = useTable({
        columns:COLUMNS,
        data:DATA
    })


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
        
    } = tableInstance

    return(
        <table {...getTableProps()}>
            <thead>
                {
                   headerGroups.map((headerGroup) =>(
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                               headerGroup.headers.map((column) =>(
                                    <th {...column.getHeaderProps()}>
                                        {column.render('Header')}
                                    </th>
                               )) 
                            }
                            {addColumnButton && 
                            <th>

                            </th>}
                        </tr>
                   ))
                }
            </thead>
            <tbody {...getTableBodyProps()}>
                {
                    rows.map((row) =>{
                        prepareRow(row)
                        return(
                            <tr {...row.getRowProps()}>
                                {
                                    row.cells.map((cell)=>{
                                        return (
                                            <td {...cell.getCellProps()}>
                                                {cell.render("Cell")}
                                            </td>
                                        )
                                    })
                                }
                                {addColumnButton &&
                                <td>
                                    <Button onClick={(e)=>handleEdit(e,row.original)} variant="warning">Edit</Button>
                                </td>}
                            </tr>
                        )
                    })
                }
                
            </tbody>
        </table>
    )

}
export default Table

