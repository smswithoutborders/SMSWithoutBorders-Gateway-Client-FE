import { Fragment, useState } from "react";
import { updateSetting, restartAPI } from "../utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setGatewayApiUrl } from "../utils/storage";
import toast from "react-hot-toast";
import Spinner from "./Spinner";
import ErrorAlert from "./ErrorAlert";

type SettingListItem = {
  label: string;
  value: string;
  section: string;
};

const SettingsList = ({ settings }: any) => {
  return (
    <Fragment>
      {Object.keys(settings).map((item: string, idx: number) => (
        <div
          key={idx}
          className="max-w-full p-4 mx-auto mb-4 prose border rounded-lg shadow md:p-8"
        >
          <h2>{item}</h2>
          {Object.keys(settings[item]).map((label: string, idx: number) => (
            <div key={idx} className="">
              <h3 className="my-0 capitalize">
                {label.includes("_") ? label.split("_").join(" ") : label}
              </h3>
              <SettingsListItem
                label={label}
                value={settings[item][label]}
                section={item}
              />
            </div>
          ))}
        </div>
      ))}
    </Fragment>
  );
};

const SettingsListItem = ({ label, value, section }: SettingListItem) => {
  const queryClient = useQueryClient();
  const [toggled, setToggled] = useState<boolean>(false);
  const [updatedValue, setUpdatedValue] = useState<string>(value);

  // restart API after setting update
  const {
    mutate: handleRestart,
    isLoading: isRestarting,
    isError,
  } = useMutation(restartAPI, {
    onSuccess: () => {
      toast.success("Gateway restarted");
      queryClient.invalidateQueries(["settings"]);
      setToggled(false);
    },
  });

  // update setting value
  const { mutate: handleUpdateSetting, isLoading } = useMutation(
    () =>
      updateSetting({
        label,
        value: updatedValue,
        section,
      }),
    {
      onSuccess: ({ label, value }: { label: string; value: string }) => {
        let url = "";
        toast.success("Setting updated");
        const settings = queryClient.getQueryData(["settings"]) as any;
        const prevHost = settings["API"]["host"];
        const prevPort = settings["API"]["port"];
        // if port or host update
        if (["port", "host"].includes(label)) {
          if (label === "host") {
            console.log(prevHost, value);
            url = `http://${value}:${prevPort}`;
          } else {
            if (label === "port") {
              console.log(prevPort, value);
              url = `http://${prevHost}:${value}`;
            }
          }
          setGatewayApiUrl(url);
        }

        queryClient.invalidateQueries(["settings"]);
        // restart api
        handleRestart("inbound");
        handleRestart("outbound");
        // toggle view
        setToggled(false);
      },
      onError: () => toast.error("Failed to update setting, please try again"),
    }
  );

  return (
    <Fragment>
      {!toggled ? (
        <div className="flex items-center justify-between">
          <p className="my-0">{value}</p>
          <button className="btn btn-ghost" onClick={() => setToggled(true)}>
            Change
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap items-center justify-between w-full my-4 space-y-4 md:space-y-0 md:space-x-4">
          <input
            type="text"
            name="value"
            value={updatedValue}
            aria-label="setting option"
            onChange={(evt) => setUpdatedValue(evt.target.value)}
            className="flex-1 input input-bordered"
          />
          <div className="flex space-x-2">
            <button
              onClick={() => handleUpdateSetting()}
              className={`flex items-center btn btn-primary ${
                isLoading || (isRestarting && "loading")
              }`}
            >
              {isLoading ? "Saving" : "Save"}
            </button>
            <button className="btn btn-ghost" onClick={() => setToggled(false)}>
              cancel
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
};
export default SettingsList;
