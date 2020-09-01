import React, {useState, useEffect} from 'react'
import './Search.css';
import SearchIcon from '@material-ui/icons/Search';
import MicIcon from '@material-ui/icons/Mic';
import { Button } from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import { useStateValue } from '../StateProvider'
import {actionTypes} from '../reducer'

function Search({hideButtons = false, className}) {
    const [input, setInput] = useState('');
    const [{term}, dispatch] = useStateValue();

    const history = useHistory();

    useEffect(() => {
        setInput(term);
    }, []);

    const search = (e) =>{
        e.preventDefault();
        if(input){
        dispatch({
            type: actionTypes.SET_SEARCH_TERM,
            term: input
        })
        history.push('/search')
        }
    }

    return (
        <form className ="search">
            <div className ={`search__input${className ? className : ''}`}>
                <SearchIcon className = "search__inputIcon" />
                <input  value = {input} onChange = {(e) => setInput(e.target.value)} />
                <MicIcon />
            </div>
            {!hideButtons ? (
            <div className ="search__button">
                <Button variant = 'outlined' onClick = {search} type = "submit" >Google Search</Button>
                <Button variant = 'outlined'>I'm Feeling Lucky</Button>
            </div>) : (
            <div className ="search__button">
                <Button className ="search__buttonHidden" variant = 'outlined' onClick = {search} type = "submit" >Google Search</Button>
                <Button className ="search__buttonHidden" variant = 'outlined'>I'm Feeling Lucky</Button>
            </div>
            )}
        </form>
    )
}

export default Search
