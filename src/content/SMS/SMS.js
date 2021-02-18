import React from "react";

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
  TableToolbarContent,
  TableToolbarSearch,
} from "carbon-components-react";

import { Link } from 'react-router-dom';

import {
  Delete16 as Delete,
  Download16 as Download,
  Send32 as Send,
  UserMultiple32 as BulkSend,
  EventSchedule32 as Schedule,
  Catalog32 as Contacts,
} from "@carbon/icons-react";

import MockData from "./MockData";

const headers = [
  {
    key: "source",
    header: "Source",
  },
  {
    key: "message",
    header: "Message",
  },
  {
    key: "date",
    header: "Date",
  },
  {
    key: "time",
    header: "Time",
  },
  {
    key: "status",
    header: "Status",
  },
];

const batchActionClick = () => {
  //Todo : Add this handler
};

const SMS = () => {
  return (
    <>
      <div className="dash-header">
        <h2>
          <strong>SMS</strong> Logs
        </h2>
        <p>Summary overview of SMS app type</p>
      </div>
      <div className="bx--grid bx--grid--narrow">
        <div className="bx--row">
          <Link to="new-sms" className="bx--col bx--col-lg-4">
            <div className="sms-card">
              <Send />
              <p>New SMS</p>
            </div>
          </Link>

          <Link to="#" className="bx--col bx--col-lg-4">
            <div className="sms-card">
              <BulkSend />
              <p>Bulk SMS</p>
            </div>
          </Link>

          <Link to="#" className="bx--col bx--col-lg-4">
            <div className="sms-card">
              <Schedule />
              <p> New Schedule</p>
            </div>
          </Link>

          <Link to="#" className="bx--col bx--col-lg-4">
            <div className="sms-card">
              <Contacts />
              <p>Contacts List</p>
            </div>
          </Link>
        </div>
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
                    {...getTableContainerProps()}
                  >
                    <TableToolbar {...getToolbarProps()}>
                      <TableBatchActions {...getBatchActionProps()}>
                        <TableBatchAction
                          tabIndex={
                            getBatchActionProps().shouldShowBatchActions ? 0 : -1
                          }
                          renderIcon={Delete}
                          onClick={batchActionClick(selectedRows)}
                        >
                          Delete
                      </TableBatchAction>
                        <TableBatchAction
                          tabIndex={
                            getBatchActionProps().shouldShowBatchActions ? 0 : -1
                          }
                          renderIcon={Download}
                          onClick={batchActionClick(selectedRows)}
                        >
                          Download
                      </TableBatchAction>
                      </TableBatchActions>
                      <TableToolbarContent>
                        <TableToolbarSearch
                          expanded={true}
                          tabIndex={
                            getBatchActionProps().shouldShowBatchActions ? -1 : 0
                          }
                          onChange={onInputChange}
                        />
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
        </div>
      </div>
    </>
  );
};
export default SMS;
