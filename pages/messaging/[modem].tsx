import { FormEvent, Fragment, SyntheticEvent, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMessages, sendMessage, deleteMessage } from "../../utils/api";
import Spinner from "../../components/Spinner";
import ErrorAlert from "../../components/ErrorAlert";
import { BiMessageX } from "react-icons/bi";
import toast from "react-hot-toast";

type InboxMessage = {
  id: number;
  date_stored: string;
  number: string;
  text: string;
  timestamp: string;
  type: string;
};

const Messaging: NextPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  // modem is the modem index passed in
  const { modem } = router.query;
  const [open, setOpen] = useState<boolean>(false);

  // fetch sms inbox
  const {
    data: messages = [],
    isLoading,
    isError,
    refetch,
    remove,
  } = useQuery(["messages", modem], () => getMessages(modem));

  // send messages
  const { mutate: handleSendMessage, isLoading: sending } = useMutation(
    (evt: any) => {
      evt.preventDefault();
      const formData = new FormData(evt.target);
      const data = Object.fromEntries(formData) as NewSMS;
      return sendMessage(modem, data);
    },
    {
      onSuccess: () => {
        toast.success("Message sent successfully");
        queryClient.invalidateQueries(["messages", modem]);
      },
      onError: () => toast.error("Failed to send message, please try again"),
    }
  );

  // delete messages
  const { mutate: handleDeleteMessage, isLoading: deleting } = useMutation(
    (id: number) => {
      return deleteMessage(modem, id);
    },
    {
      onSuccess: () => {
        toast.success("Message deleted successfully");
        queryClient.invalidateQueries(["messages", modem]);
      },
      onError: () => toast.error("Failed to delete message, please try again"),
    }
  );

  // refresh messages
  function handleRefresh() {
    remove();
    refetch();
  }

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorAlert callBack={refetch} />;

  return (
    <Fragment>
      <Head>
        <title>Messaging</title>
      </Head>

      <section className="container max-w-full prose">
        <div className="flex  items-center md:justify-between flex-wrap space-y-8 md:space-y-0">
          <h1 className="my-0">Messaging</h1>

          <div className="flex items-center space-x-2">
            <button
              className="btn btn-ghost btn-active modal-button"
              onClick={() => handleRefresh()}
            >
              refresh
            </button>
            <button
              className="btn btn-primary modal-button"
              onClick={() => setOpen(true)}
            >
              New message
            </button>
          </div>
        </div>

        {/* Got no new messages */}
        {!messages.length && (
          <div className="mx-auto prose text-center border rounded-md py-8">
            <BiMessageX className="inline" size={56} />
            <p>SMS inbox empty, no new messages</p>
            <button className="btn btn-primary" onClick={() => refetch()}>
              refresh
            </button>
          </div>
        )}

        {/* Got messages , lets see them */}
        {!open && messages.length && (
          <div className="overflow-x-auto">
            <table className="table-auto">
              <thead className="bg-base-300">
                <tr>
                  <th className="p-4">#</th>
                  <th className="p-4">Number</th>
                  <th className="p-4">Text</th>
                  <th className="p-4">Timestamp</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((message: InboxMessage, idx: number) => (
                  <tr key={idx} className="hover:bg-base">
                    <td className="p-4">{idx + 1}</td>
                    <td className="p-4">{message.number}</td>
                    <td className="p-4">{message.text}</td>
                    <td className="p-4">{message.timestamp}</td>
                    <td className="p-4">{message.type}</td>
                    <td className="p-4">
                      <button
                        className="btn btn-ghost text-red-500 btn-sm"
                        onClick={() => handleDeleteMessage(message.id)}
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* want to send a new message, lets compose it */}
        {open && (
          <div className="max-w-screen-md p-8 mx-auto prose">
            <form onSubmit={(evt) => handleSendMessage(evt)}>
              <legend className="text-2xl font-bold">New message</legend>
              <div className="my-4 form-control">
                <label className="font-semibold label">Phone number</label>
                <input
                  required
                  name="number"
                  type="text"
                  placeholder="phone number"
                  className="input input-bordered"
                />
              </div>
              <div className="my-4 form-control">
                <label htmlFor="message" className="font-semibold label">
                  Message
                </label>
                <textarea
                  required
                  name="text"
                  rows={15}
                  placeholder="your message here"
                  className="input input-bordered"
                ></textarea>
              </div>
              <div className="flex space-x-2">
                <button
                  className="btn btn-ghost btn-active"
                  type="button"
                  onClick={() => setOpen(false)}
                >
                  back
                </button>
                <button
                  type="submit"
                  className="btn btn-primary flex items-center"
                >
                  {sending && <Spinner inline />}
                  <span>{sending ? "Sending" : "Send message"} </span>
                </button>
              </div>
            </form>
          </div>
        )}
      </section>
    </Fragment>
  );
};

export default Messaging;
