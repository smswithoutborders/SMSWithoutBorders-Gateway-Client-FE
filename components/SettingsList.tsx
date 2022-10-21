import { Fragment, useState } from "react";
import { updateSetting, restartAPI } from "../utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setGatewayApiUrl } from "../utils/storage";
import toast from "react-hot-toast";

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
  const { mutateAsync: handleRestart, isLoading: isRestarting } = useMutation(
    restartAPI,
    {
      onSuccess: (_, service) => {
        // https://react-hot-toast.com/docs/toast
        toast.promise(
          new Promise((resolve) => {
            setTimeout(() => resolve(service), 7500);
          }),
          {
            loading: `Waiting for service ${service} to restart`,
            success: () => {
              return `Service ${service} restarted`;
            },
            error: `Failed to restart ${service} service`,
          }
        );
      },
    }
  );

  // update setting value
  const { mutate: handleUpdateSetting, isLoading } = useMutation(
    updateSetting,
    {
      onSuccess: async (_, { label, value }: SettingListItem) => {
        toast.success("Setting updated");
        // restart api
        await handleRestart("outbound");
        // give time for the first service to restart so it doesnt break
        setTimeout(async () => {
          await handleRestart("inbound");
          // update configs
          queryClient.invalidateQueries(["settings"]);
        }, 7500);

        const settings = queryClient.getQueryData(["settings"]) as any;
        const prevHost = settings["API"]["host"];
        const prevPort = settings["API"]["port"];
        let url = "";
        // if port or host update
        if (["port", "host"].includes(label)) {
          if (label === "host") {
            url = `http://${value}:${prevPort}`;
          } else {
            if (label === "port") {
              url = `http://${prevHost}:${value}`;
            }
          }
          setGatewayApiUrl(url);
        }
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
              onClick={() =>
                handleUpdateSetting({
                  label,
                  value: updatedValue,
                  section,
                })
              }
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
