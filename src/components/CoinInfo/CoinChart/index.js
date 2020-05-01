import React, { useEffect, useState } from 'react';
import {LineChart, Line, XAxis, YAxis, Tooltip} from 'recharts';
import { coinbaseAxios } from '../../../axios';
import withErrorModal from '../../../hoc/withErrorModal';
import Spinner from '../../UI/Spinner';
import {compose} from 'recompose';



const CoinChart = props => {
    
    const { currentCoin, setError, timespan } = props;
    const timespans = {"Past Day": [3600, 24], "Past Week": [21600, 28], "Past Month": [86400, 31]};
    
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {   
        let [granularity, dataPoints] = timespans[timespan];
        setLoading(true);
        coinbaseAxios.get(`products/${props.currentCoin}/candles?granularity=${granularity}`)
            .then(res => {
                console.log("all results: ", res.data);
                const abridgedResults = res.data.slice(0, dataPoints).reverse(); // CHANGE RANGE LATER
                console.log(abridgedResults);
                const chartData = abridgedResults.map(dataPoint => {
                    let time = new Date(dataPoint[0]*1000);
                    let formattedTime = `${time.getMonth() + 1}/${time.getDate()}
                        ${time.getHours()}:${time.getMinutes() < 10 && '0'+time.getMinutes()}`;
                    let closePrice = dataPoint[4];
                    return {Name: formattedTime, Price: closePrice};
                })
                console.log(chartData);
                setData(chartData);
                setLoading(false);
            })
            .catch(err => {setError(err); setLoading(false);});
            
    }, [timespan]);

    let content = <Spinner />;
    if (data.length > 0 && !loading)
        content = (
            <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
                <LineChart width={495} height={250} data={data}
                    margin={{top:20, bottom: 20}}>
                    <XAxis dataKey="Name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="Price" stroke="#2BA84A" />
                </LineChart>
            </div>
        );

    return content;
};

export default compose(
    withErrorModal
)(CoinChart);
