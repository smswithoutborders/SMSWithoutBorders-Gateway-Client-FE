import { Fragment, useState } from "react";
import { updateSetting } from "../utils/api";
import {
  useQueryClient,
  useMutation,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

type UpdatedSetting = {
  key: string;
  value: string;
  section: string;
};

type SettingListItem = {
  label: string;
  value: string;
  section: string;
  update: any;
};
const SettingsList = ({ settings }: any) => {
  const queryClient = useQueryClient();

  // send messages
  const { mutate: handleUpdateSetting, isLoading } = useMutation(
    (data: UpdatedSetting) => updateSetting(data),
    {
      onSuccess: () => {
        toast.success("Setting updated");
        queryClient.invalidateQueries(["settings"]);
      },
      onError: () => toast.error("Failed to update setting, please try again"),
    }
  );

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
                update={handleUpdateSetting}
              />
            </div>
          ))}
        </div>
      ))}
    </Fragment>
  );
};

const SettingsListItem = ({
  label,
  value,
  section,
  update,
}: SettingListItem) => {
  const [toggled, setToggled] = useState<boolean>(false);
  const [updatedValue, setUpdatedValue] = useState<string>(value);

  // update setting value
  function handleUpdate() {
    const data = {
      key: label,
      value: updatedValue,
      section,
    };
    update(data);
  }

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
        <div className="flex flex-wrap space-y-4 md:space-y-0 items-center my-4 w-full justify-between md:space-x-4">
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
              onClick={() => handleUpdate()}
              className="flex items-center btn btn-primary"
            >
              Save
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
