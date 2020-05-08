import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { coinbaseAxios } from "../../../axios";
import withErrorModal from "../../../hoc/withErrorModal";
import Spinner from "../../UI/Spinner";
import { compose } from "recompose";

const timespans = {
  "Past Day": [3600, 24],
  "Past Week": [21600, 28],
  "Past Month": [86400, 31],
};

const CoinChart = (props) => {
  const { currentCoin, timespan } = props;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let [granularity, dataPoints] = timespans[timespan];
    setLoading(true);
    coinbaseAxios
      .get(`products/${currentCoin}/candles?granularity=${granularity}`)
      .then((res) => {
        const abridgedResults = res.data.slice(0, dataPoints).reverse();
        const chartData = abridgedResults.map((dataPoint) => {
          let time = new Date(dataPoint[0] * 1000);
          let formattedTime = `${time.getMonth() + 1}/${time.getDate()}
                        ${time.getHours()}:${
            time.getMinutes() < 10 && "0" + time.getMinutes()
          }`;
          let closePrice = dataPoint[4];
          return { Name: formattedTime, Price: closePrice };
        });
        setData(chartData);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [timespan, currentCoin]);

  let content = (
    <div style={{ minHeight: "300px" }}>
      <Spinner />
    </div>
  );
  if (data.length > 0 && !loading) {
    let floor = Math.min(...data.map((d) => d["Price"]));
    let ceiling = Math.max(...data.map((d) => d["Price"]));
    floor -= (ceiling - floor) / 2;
    ceiling += (ceiling - floor) / 2;
    content = (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 20, bottom: 20, right: 5 }}>
          <XAxis dataKey="Name" />
          <YAxis hide domain={[floor, ceiling]} />
          <Tooltip />
          <Line type="monotone" dataKey="Price" stroke="#2BA84A" />
        </LineChart>
      </ResponsiveContainer>
    );
  }
  return content;
};

export default compose(withErrorModal)(CoinChart);
