import React, {useState, useContext, useEffect} from 'react';
import StockListItem from './StockListItem';
import {StockInfoContext} from '../../../../contexts/StockInfoContext';



const StockList = props => {
    const { stockList } = props;

    const stockInfoContext = useContext(StockInfoContext);

    const [hasOptionsActive, setHasOptionsActive] = useState(null);

    const formattedStocklist = stockList.map((ts, index) => {
        return (
            <StockListItem 
                {...ts}
                key={ts.id} 
                
                hasOptionsActive={hasOptionsActive}
                openOptions={ id => setHasOptionsActive(id) }  />
        )
    })

    const setFirstItemActive = () => stockInfoContext.setTag(formattedStocklist[0].props.tag);

    useEffect(setFirstItemActive, []);

    return (
        <div style={{width: "100%", flexGrow: "1", overflow: "auto"}}>
            {formattedStocklist}
        </div>
    );
}

export default StockList;