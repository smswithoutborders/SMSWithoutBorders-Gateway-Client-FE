import React from "react";

import {
  GroupedBarChart,
  LineChart,
  GaugeChart,
  DonutChart,
} from "@carbon/charts-react";

const LineData = [
  {
    "group": "MTN",
    "date": "2018-12-31T23:00:00.000Z",
    "value": 5000,
  },
  {
    "group": "MTN",
    "date": "2019-01-04T23:00:00.000Z",
    "value": 6500,
  },
  {
    "group": "MTN",
    "date": "2019-01-07T23:00:00.000Z",
    "value": 4500,
  },
  {
    "group": "MTN",
    "date": "2019-01-12T23:00:00.000Z",
    "value": 4921,
  },
  {
    "group": "MTN",
    "date": "2019-01-16T23:00:00.000Z",
    "value": 5121,
  },
  {
    "group": "Orange",
    "date": "2019-01-01T23:00:00.000Z",
    "value": 5120,
  },
  {
    "group": "Orange",
    "date": "2019-01-05T23:00:00.000Z",
    "value": 5731,
  },
  {
    "group": "Orange",
    "date": "2019-01-07T23:00:00.000Z",
    "value": 2743,
  },
  {
    "group": "Orange",
    "date": "2019-01-14T23:00:00.000Z",
    "value": 7032,
  },
  {
    "group": "Orange",
    "date": "2019-01-18T23:00:00.000Z",
    "value": 2130,
  },
];

const LineOptions = {
  "title": "SMS by Carrier",
  "axes": {
    "bottom": {
      "title": "# Days",
      "mapsTo": "date",
      "scaleType": "time",
    },
    "left": {
      "mapsTo": "value",
      "title": "# sent SMS",
      "scaleType": "linear",
    },
  },
  "curve": "curveMonotoneX",
  "height": "22rem",
};

const gaugeData = [
  {
    "group": "value",
    "value": 42,
  },
  {
    "group": "delta",
    "value": -13.37,
  },
];

const gaugeOptions = {
  "title": "Viral Load",
  "resizable": true,
  "height": "22rem",
  "width": "100%",
  "gauge": {
    "type": "full",
    "status": "success",
    "alignment": "left",
  },
};

const DonutData = [
  {
    "group": "Alcatel",
    "value": 2000,
  },
  {
    "group": "Vodaphone",
    "value": 6500,
  },
  {
    "group": "Huawei",
    "value": 7500,
  },
];

const DonutOptions = {
  "title": "Modems",
  "resizable": true,
  "donut": {
    "center": {
      "label": "SMS / Modem",
    },
    "alignment": "center",
  },
  "height": "22rem",
};

const GroupOptions = {
  "title": "Grouped bar (discrete)",
  "axes": {
    "left": {
      "mapsTo": "value",
    },
    "bottom": {
      "scaleType": "labels",
      "mapsTo": "key",
    },
  },
  "height": "22rem",
};
const GroupData = [
  {
    "group": "MTN",
    "key": "Qty",
    "value": 65000,
  },
  {
    "group": "MTN",
    "key": "More",
    "value": 29123,
  },
  {
    "group": "MTN",
    "key": "Sold",
    "value": 35213,
  },
  {
    "group": "MTN",
    "key": "Restocking",
    "value": 51213,
  },
  {
    "group": "MTN",
    "key": "Misc",
    "value": 16932,
  },
  {
    "group": "Orange",
    "key": "Qty",
    "value": 32423,
  },
  {
    "group": "Orange",
    "key": "More",
    "value": 21313,
  },
  {
    "group": "Orange",
    "key": "Sold",
    "value": 64353,
  },
  {
    "group": "Orange",
    "key": "Restocking",
    "value": 24134,
  },
  {
    "group": "Orange",
    "key": "Misc",
    "value": 24134,
  },
];

const DashBoard = () => {
  return (
    <>
      <div className="bx--grid bx--grid--narrow">

        <div className="bx--row">
          <div className="bx--col dash-header">
            <h1><strong>C | Deck</strong> Metrics</h1>
            <p>Summary overview of Deku systems</p>
          </div>
        </div>
        <div className="bx--row">
          <div className="bx--col-lg-6">
            <div className="dash-card">
              <DonutChart data={DonutData} options={DonutOptions} />
            </div>
          </div>

          <div className="bx--col-lg-10">
            <div className="dash-card">
              <LineChart data={LineData} options={LineOptions} />
            </div>
          </div>
        </div>

        <div className="bx--row">
          <div className="bx--col-lg-6">
            <div className="dash-card">
              <GaugeChart data={gaugeData} options={gaugeOptions} />
            </div>
          </div>

          <div className="bx--col-lg-10">
            <div className="dash-card">
              <GroupedBarChart data={GroupData} options={GroupOptions} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
