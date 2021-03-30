import React, { useState, useEffect } from "react";

import { getMessages } from "../../services/sms.service";
import DashHeader from '../../components/DashHeader';

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
  Pagination,
  DataTableSkeleton,
  Button
} from "carbon-components-react";

import { Link } from 'react-router-dom';

import {
  TrashCan16 as Delete,
  Chat32 as Send,
  UserMultiple32 as BulkSend,
  EventSchedule32 as Schedule,
  Catalog32 as Contacts,
} from "@carbon/icons-react";

const headers = [
  {
    key: "phonenumber",
    header: "Sender",
  },
  {
    key: "isp",
    header: "ISP",
  },
  {
    key: "type",
    header: "Type",
  },
  {
    key: "text",
    header: "Message",
  },
  {
    key: "date",
    header: "Date",
  },
  {
    key: "claimed_time",
    header: "Time",
  },
  {
    key: "claimed_modem_imei",
    header: "Modem",
  }
];


const SMS = () => {

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);

  const [maxRows, setMaxRows] = useState(10);

  useEffect(() => {
    getMessages()
      .then(items => {
        setMessages(items.messages);
      });
  }, []);

  //props for table pagination
  const paginationProps = () => ({
    page: 1,
    totalItems: messages.length,
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
  });

  const batchDelete = (selectedRows) => {
    selectedRows.forEach(row => {
      console.log(row);
      //find items record in the array
      let obj = messages.find(obj => obj.id === row.id);
      console.log(obj);

      //find the index of items record in the array
      let index = messages.findIndex(obj => obj.id === row.id);
      console.log("index", index, "\n", "messages for reference", messages);

      //remove item from records
      messages.splice(index, 1);
      setLoading(true);
      setMessages(messages);
      //use setimeout so table has time to refresh data
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    })
  };

  const refreshTable = () => {
    setLoading(true);
    getMessages()
      .then(items => {
        setMessages(items.messages);
      });
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }

  return (
    <>
      <div className="bx--grid bx--grid--narrow">
        <div className="bx--row">
          <DashHeader
            title="SMs"
            subtitle="Logs"
            description="Logs of all sent and received messages"
            className="bx--col"
          />
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
            {loading
              ?
              <DataTableSkeleton
                headers={headers}
                rowCount={10}
              />
              :
              <DataTable rows={messages.slice(0, maxRows)} headers={headers}>
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
                      description="Messages from all modems"
                      {...getTableContainerProps()}
                    >
                      <TableToolbar {...getToolbarProps()}>
                        <TableBatchActions {...getBatchActionProps()}>
                          <TableBatchAction
                            tabIndex={getBatchActionProps().shouldShowBatchActions ? 0 : -1}
                            renderIcon={Delete}
                            onClick={() => batchDelete(selectedRows)}
                          >
                            Delete
                        </TableBatchAction>
                        </TableBatchActions>
                        <TableToolbarContent>
                          <TableToolbarSearch
                            expanded={true}
                            tabIndex={getBatchActionProps().shouldShowBatchActions ? -1 : 0}
                            onChange={onInputChange}
                          />
                          <Button onClick={() => refreshTable()}>Refresh</Button>
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
                                  <TableCell key={cell.id}>{cell.value ? cell.value : "------"}</TableCell>
                                ))}
                                <TableSelectRow {...getSelectionProps({ row })} />
                              </TableExpandRow>
                              <TableExpandedRow colSpan={headers.length + 2}>
                                <div className="bx--grid bx--grid--condensed">
                                  <div className="bx--row">
                                    <div className="bx--col-lg-2">
                                      {headers.map((header) => (
                                        <React.Fragment key={header.key}>
                                          <h6>{header.header}</h6>
                                          <br />
                                        </React.Fragment>
                                      ))}
                                    </div>
                                    <div className="bx--col-lg-14">
                                      {row.cells.map((cell) => (
                                        <React.Fragment key={cell.id}>
                                          <h6>{cell.value ? cell.value : "------"}</h6>
                                          <br />
                                        </React.Fragment>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </TableExpandedRow>
                            </React.Fragment>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
              </DataTable>
            }
            <Pagination {...paginationProps()} />
          </div>
        </div>
      </div>
    </>
  );
};
export default SMS;
