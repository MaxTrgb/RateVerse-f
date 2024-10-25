import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { Input, Button } from 'antd';
import { Link } from 'react-router-dom';
const { Search } = Input;

const Tools = ({ onSortChange, onSearchChange, activeSort }) => {    

    return (
        <div className='myTools'>
            <div>
                <Link to='/' className='logo'>RateVerse</Link>
            </div>

            
            <div className='search'>
                <Search
                    placeholder="Input search text..."
                    onSearch={onSearchChange}
                    enterButton
                    onChange={e => onSearchChange(e.target.value)}
                />
            </div>
            <div className='sort'>
                <Button
                    className={`sortBtn ${activeSort === 'date' ? 'active' : ''}`}
                    type="primary"

                    onClick={() => onSortChange('date')}>
                    Sort by Date
                </Button>
                <Button
                    className={`sortBtn ${activeSort === 'rating' ? 'active' : ''}`}
                    type="primary"
                    onClick={() => onSortChange('rating')}>
                    Sort by Rating
                </Button>
                <Button
                    className={`sortBtn ${activeSort === 'genre' ? 'active' : ''}`}
                    type="primary"
                    onClick={() => onSortChange('genre')}>
                    Sort by Genre
                </Button>
                <Button
                    className={`sortBtn ${activeSort === 'name' ? 'active' : ''}`}
                    type="primary"
                    onClick={() => onSortChange('name')}>
                    Sort by Name
                </Button>
            </div>
        </div>
    );
}

export default Tools;
