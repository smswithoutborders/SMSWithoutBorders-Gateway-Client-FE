import React from 'react';

import { LineChart, GaugeChart, DonutChart } from '@carbon/charts-react';

const LineData = [
    {
        "group": "MTN",
        "date": "2018-12-31T23:00:00.000Z",
        "value": 5000
    },
    {
        "group": "MTN",
        "date": "2019-01-04T23:00:00.000Z",
        "value": 6500
    },
    {
        "group": "MTN",
        "date": "2019-01-07T23:00:00.000Z",
        "value": 4500
    },
    {
        "group": "MTN",
        "date": "2019-01-12T23:00:00.000Z",
        "value": 4921
    },
    {
        "group": "MTN",
        "date": "2019-01-16T23:00:00.000Z",
        "value": 5121
    },
    {
        "group": "Orange",
        "date": "2019-01-01T23:00:00.000Z",
        "value": 5120
    },
    {
        "group": "Orange",
        "date": "2019-01-05T23:00:00.000Z",
        "value": 5731
    },
    {
        "group": "Orange",
        "date": "2019-01-07T23:00:00.000Z",
        "value": 2743
    },
    {
        "group": "Orange",
        "date": "2019-01-14T23:00:00.000Z",
        "value": 7032
    },
    {
        "group": "Orange",
        "date": "2019-01-18T23:00:00.000Z",
        "value": 2130
    }
];

const LineOptions = {
    "title": "SMS by Carrier",
    "axes": {
        "bottom": {
            "title": "# Days",
            "mapsTo": "date",
            "scaleType": "time"
        },
        "left": {
            "mapsTo": "value",
            "title": "# sent SMS",
            "scaleType": "linear"
        }
    },
    "curve": "curveMonotoneX",
    "height": "350px"
};

const gaugeData = [
    {
        "group": "value",
        "value": 42
    },
    {
        "group": "delta",
        "value": -13.37
    }
];

const gaugeOptions = {
    "title": "Viral Load",
    "resizable": true,
    "height": "350px",
    "width": "100%",
    "gauge": {
        "type": "full",
        "status": "danger"
    }
}

const DonutData = [
    {
        "group": "Alcatel",
        "value": 20000
    },
    {
        "group": "Vodaphone",
        "value": 65000
    },
    {
        "group": "Huawei",
        "value": 75000
    },
    {
        "group": "TP-Link",
        "value": 1200
    }
];

const DonutOptions = {
    "title": "Modems",
    "resizable": true,
    "donut": {
        "center": {
            "label": "Modems"
        }
    },
    "height": "350px"
}

const DashBoard = () => {

    return (
        <>
            <div className="dash-header">
                <h1><strong>C | Deck</strong> Metrics</h1>
                <p>Summary overview of Deku systems</p>
            </div>
            <div className="bx--grid bx--grid--narrow">
                <div className="bx--row">
                    <div className="bx--col-lg-8">
                        <div className="dash-card">
                            <LineChart
                                data={LineData}
                                options={LineOptions}
                            />
                        </div>
                    </div>
                    <div className="bx--col-lg-4">
                        <div className="dash-card">
                            <GaugeChart
                                data={gaugeData}
                                options={gaugeOptions}
                            />
                        </div>
                    </div>
                    <div className="bx--col-lg-4">
                        <div className="dash-card">
                            <DonutChart
                                data={DonutData}
                                options={DonutOptions}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DashBoard;