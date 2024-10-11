import React from 'react';
import './Home.css';
import Search from 'antd/es/transfer/search';
import { Button } from 'antd';

const Tools = () => {
    return (
        <div className='myTools'>
            <div className='search'>
            <Search                
                placeholder="Input search text..."
                onSearch={value => console.log(value)} enterButton 
                
            />
            </div>
            <div className='sort'>
                <Button className='sortBtn' type="primary">Sort by Name</Button>
                <Button className='sortBtn' type="primary">Sort by Rating</Button>
                <Button className='sortBtn' type="primary">Sort by Genre</Button>
            </div>
            
        </div>
    );
}

export default Tools;
