import React from 'react';

import {
    DataTable,
    Table,
    TableBatchAction,
    TableBatchActions,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableHeader,
    TableRow,
    TableSelectAll,
    TableSelectRow,
    TableToolbar,
    TableToolbarAction,
    TableToolbarContent,
    TableToolbarSearch,
    TableToolbarMenu,
    Button
} from 'carbon-components-react';

import {
    Delete16 as Delete,
    Save16 as Save,
    Download16 as Download
} from '@carbon/icons-react';

import MockData from './MockData';

const headers = [
    {
        key: 'source',
        header: 'Source',
    },
    {
        key: 'message',
        header: 'Message',
    },
    {
        key: 'date',
        header: 'Date',
    },
    {
        key: 'time',
        header: 'Time',
    },
    {
        key: 'status',
        header: 'Status',
    }
];


const batchActionClick = () => {
    //Todo : Add this handler
}



const SMS = () => {
    return (
        <>
            <div className="dash-header">
                <h2><strong>SMS</strong> Logs</h2>
                <p>Summary overview of SMS app type</p>
            </div>
            <div className="bx--grid bx--grid--narrow">
                <div className="bx--row">
                    <div className="bx--col-lg-16">
                        <DataTable rows={MockData} headers={headers}>
                            {({
                                rows,
                                headers,
                                getHeaderProps,
                                getRowProps,
                                getSelectionProps,
                                getToolbarProps,
                                getBatchActionProps,
                                onInputChange,
                                selectedRows,
                                getTableProps,
                                getTableContainerProps,
                            }) => (
                                    <TableContainer
                                        title="Current Queue"
                                        description="log of todays transactions across modems"
                                        {...getTableContainerProps()}>
                                        <TableToolbar {...getToolbarProps()}>
                                            <TableBatchActions {...getBatchActionProps()}>
                                                <TableBatchAction
                                                    tabIndex={getBatchActionProps().shouldShowBatchActions ? 0 : -1}
                                                    renderIcon={Delete}
                                                    onClick={batchActionClick(selectedRows)}>
                                                    Delete
          </TableBatchAction>
                                                <TableBatchAction
                                                    tabIndex={getBatchActionProps().shouldShowBatchActions ? 0 : -1}
                                                    renderIcon={Save}
                                                    onClick={batchActionClick(selectedRows)}>
                                                    Save
          </TableBatchAction>
                                                <TableBatchAction
                                                    tabIndex={getBatchActionProps().shouldShowBatchActions ? 0 : -1}
                                                    renderIcon={Download}
                                                    onClick={batchActionClick(selectedRows)}>
                                                    Download
          </TableBatchAction>
                                            </TableBatchActions>
                                            <TableToolbarContent>
                                                <TableToolbarSearch
                                                    defaultExpanded
                                                    tabIndex={getBatchActionProps().shouldShowBatchActions ? -1 : 0}
                                                    onChange={onInputChange}
                                                />
                                                <TableToolbarMenu
                                                    tabIndex={getBatchActionProps().shouldShowBatchActions ? -1 : 0}>
                                                    <TableToolbarAction onClick={() => alert('Alert 1')}>
                                                        Action 1
            </TableToolbarAction>
                                                    <TableToolbarAction onClick={() => alert('Alert 2')}>
                                                        Action 2
            </TableToolbarAction>
                                                    <TableToolbarAction onClick={() => alert('Alert 3')}>
                                                        Action 3
            </TableToolbarAction>
                                                </TableToolbarMenu>
                                                <Button
                                                    tabIndex={getBatchActionProps().shouldShowBatchActions ? -1 : 0}
                                                    onClick={() => alert('Add new row')}
                                                    size="small"
                                                    kind="primary">
                                                    Add new
          </Button>
                                            </TableToolbarContent>
                                        </TableToolbar>
                                        <Table {...getTableProps()}>
                                            <TableHead>
                                                <TableRow>
                                                    <TableSelectAll {...getSelectionProps()} />
                                                    {headers.map((header, i) => (
                                                        <TableHeader key={i} {...getHeaderProps({ header })}>
                                                            {header.header}
                                                        </TableHeader>
                                                    ))}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rows.map((row, i) => (
                                                    <TableRow key={i} {...getRowProps({ row })}>
                                                        <TableSelectRow {...getSelectionProps({ row })} />
                                                        {row.cells.map((cell) => (
                                                            <TableCell key={cell.id}>{cell.value}</TableCell>
                                                        ))}
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                )}
                        </DataTable>
                    </div>



                    <div className="bx--col-lg-4">
                        <div className="dash-card">

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default SMS;