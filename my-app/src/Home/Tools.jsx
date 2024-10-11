import React from 'react';
import './Home.css';
import { Input, Button } from 'antd'; 
const { Search } = Input;

const Tools = ({ onSortChange, onSearchChange }) => {
    return (
        <div className='myTools'>
            <div className='search'>
                <Search                
                    placeholder="Input search text..."
                    onSearch={onSearchChange} 
                    enterButton 
                    onChange={e => onSearchChange(e.target.value)} 
                    
                />
            </div>
            <div className='sort'>
                <Button className='sortBtn' type="primary" onClick={() => onSortChange('name')}>Sort by Name</Button>
                <Button className='sortBtn' type="primary" onClick={() => onSortChange('rating')}>Sort by Rating</Button>
                <Button className='sortBtn' type="primary" onClick={() => onSortChange('genre')}>Sort by Genre</Button>
            </div>
        </div>
    );
}

export default Tools;
