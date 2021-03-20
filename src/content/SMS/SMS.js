import React, { useState } from "react";

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
  TableExpandRow,
  TableExpandedRow,
  TableExpandHeader,
  TableSelectAll,
  TableSelectRow,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  Pagination
} from "carbon-components-react";

import { Link } from 'react-router-dom';

import {
  TrashCan16 as Delete,
  Download16 as Download,
  Chat32 as Send,
  UserMultiple32 as BulkSend,
  EventSchedule32 as Schedule,
  Catalog32 as Contacts,
} from "@carbon/icons-react";

import MockData from "./MockData";

const headers = [
  {
    key: "sender",
    header: "Sender",
  },
  {
    key: "isp",
    header: "ISP",
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
    key: "modem",
    header: "Modem",
  }
];

const batchActionClick = () => {
  //Todo : Add this handler
};


const SMS = () => {

  const [maxRows, setMaxRows] = useState(10);

  const tableRows = MockData.slice(0, maxRows);

  const paginationProps = {
    page: 1,
    totalItems: MockData.length,
    itemText: (e) => {
      console.log(e);
    },
    pageSize: 10,
    pageSizes: [10, 20, 30, 40, 50, 100],
    onChange: (e) => {
      if (e.pageSize !== maxRows) {
        setMaxRows(e.pageSize);
      }
    },
  };

  return (
    <>
      <div className="bx--grid bx--grid--narrow">
        <div className="bx--row">
          <div className="bx--col dash-header">
            <h2><strong>SMS</strong> Logs</h2>
            <p>Summary overview of SMS app type</p>
          </div>
        </div>
        <div className="bx--row">
          <Link to="new-sms" className="bx--col bx--col-lg-4">
            <div className="sms-card">
              <Send />
              <p>New SMS</p>
            </div>
          </Link>

          <Link to="bulk-sms" className="bx--col bx--col-lg-4">
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
            <DataTable rows={tableRows} headers={headers}>
              {({
                rows,
                headers,
                getHeaderProps,
                getRowProps,
                getSelectionProps,
                getToolbarProps,
                getBatchActionProps,
                getExpandHeaderProps,
                onInputChange,
                selectedRows,
                getTableProps,
                getTableContainerProps,
              }) => (
                  <TableContainer
                    title="Message Inbox"
                    description="log of todays messages from all modems"
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
                          <TableExpandHeader
                            enableExpando={true}
                            {...getExpandHeaderProps()}
                          />
                          {headers.map((header, i) => (
                            <TableHeader key={i} {...getHeaderProps({ header })}>
                              {header.header}
                            </TableHeader>
                          ))}
                          <TableSelectAll {...getSelectionProps()} />
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row, i) => (
                          <React.Fragment key={row.id}>
                            <TableExpandRow key={i} {...getRowProps({ row })}>
                              {row.cells.map((cell) => (
                                <TableCell key={cell.id}>{cell.value}</TableCell>
                              ))}
                              <TableSelectRow {...getSelectionProps({ row })} />
                            </TableExpandRow>
                            <TableExpandedRow colSpan={headers.length + 2}>
                              <h6>Message meta data goes here</h6>
                              <div>Description here</div>
                            </TableExpandedRow>
                          </React.Fragment>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
            </DataTable>

            <Pagination {...paginationProps} />
          </div>
        </div>
      </div>
    </>
  );
};
export default SMS;
