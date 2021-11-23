import React, { useState, useEffect } from "react";
import { getMessages } from "../services/api.service";
import { DashHeader } from '../components';
import { useParams, useNavigate } from "react-router-dom";

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

import { TrashCan16 as Delete, } from "@carbon/icons-react";
import toast from "react-hot-toast";

const tableHeaders = [
  {
    key: "index",
    header: "Index",
  },
  {
    key: "number",
    header: "Sender",
  },
  {
    key: "text",
    header: "Text",
  },
  {
    key: "timestamp",
    header: "Timestamp",
  },
];

const SMS = () => {

  const [messages, setMessages] = useState([]);
  const [maxRows, setMaxRows] = useState(10);
  const [loading, setLoading] = useState(false);

  const { index } = useParams();
  const navigate = useNavigate();

  if (!index) {
    toast.error("No modem selected");
    navigate(-1);
  }


  useEffect(() => {
    handleGetMessages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleGetMessages() {
    setLoading(true)
    getMessages(index)
      .then(response => {
        let orderedMsgs = structureMessages(response.data);
        setMessages(orderedMsgs);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          toast.error("Could not fetch connected modems, check your Gateway connection");
        } else {
          toast.error("Your Gateway may be disconnected");
        }
        setLoading(false);
      });
  }

  function structureMessages(messages) {
    let ordered = []
    messages.forEach(message => {
      ordered.push({
        id: message.index,
        index: message.index,
        number: message.number,
        text: message.text,
        timestamp: new Date(message.timestamp).toLocaleString()
      })
    })
    return ordered;
  }


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

  return (
    <div className="bx--grid bx--grid--narrow">
      <div className="bx--row">
        <DashHeader
          title="SMS"
          subtitle="Logs"
          description="Logs of all sent and received messages"
          className="bx--col"
        />
      </div>
      <div className="bx--row">
        <div className="bx--col-lg-16">
          {loading
            ?
            <DataTableSkeleton
              headers={tableHeaders}
              rowCount={10}
            />
            :
            <DataTable
              rows={messages.slice(0, maxRows)}
              headers={tableHeaders}
            >
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
                  title="Messages"
                  description="SMS inbox, all received messages"
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
                      <Button onClick={() => handleGetMessages()}>Refresh</Button>
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
                                    <React.Fragment key={cell.index}>
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
  );
};
export default SMS;
