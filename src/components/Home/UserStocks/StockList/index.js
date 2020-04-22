import React, {useState} from 'react';
import StockListItem from './StockListItem';



const StockList = props => {
    const { stockList } = props;

    const [hasOptionsActive, setHasOptionsActive] = useState(null);

    return (
        <div style={{width: "100%"}}>
            {stockList.map(ts => (
                <StockListItem 
                    {...ts}
                    key={ts.id} 
                    hasOptionsActive={hasOptionsActive}
                    openOptions={ id => setHasOptionsActive(id) }  />
            ))}
        </div>
    );
}

export default StockList;