import React, {useState,useEffect} from 'react';
import Search from './Search'
import './SearchPage.css';
import SearchIcon from '@material-ui/icons/Search';
import DescriptionIcon from '@material-ui/icons/Description';
import ImageIcon from '@material-ui/icons/Image';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import RoomIcon from '@material-ui/icons/Room';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useStateValue } from '../StateProvider';
import useGoogleSearch from '../useGoogleSearch';
import {Link} from 'react-router-dom'
import Response from './response'

function SearchPage() {
    const [{ term }, dispatch] = useStateValue();
    const [isSticky, setSticky] = useState(false)
    const ref = React.useRef(null);
    const { data} = useGoogleSearch(term);
    const handleScroll = () => {
        setSticky(ref?.current.getBoundingClientRect().top <= -10);
    }
    useEffect(() => {
       window.addEventListener('scroll', handleScroll , true);
        return () => {
            window.removeEventListener('scroll', handleScroll , true)
        }
    }, [])
    // const data = Response;
    // console.log(data)
    return (
        <div className = "searchPage" ref = {ref}>
            <div className = {!isSticky ? "searchPage__header" : "searchPage__stickyHeader"} >
                <Link to="/">
                <img className = {`searchPage__logo${isSticky ? '__sticky' : ''}`} src = 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png' alt ="google_logo" />
                </Link>
                <div className = "searchPage__headerBody">
                    <Search hideButtons className = {isSticky ? '__stickyinput' : ''} />
                    {!isSticky && <div className = "searchPage__options">
                        <div className = "searchPage__optionsLeft">
                            <div className = "searchPage__option">
                                <SearchIcon />
                                <Link to = "/all">All</Link>
                            </div>
                            <div className = "searchPage__option">
                                <DescriptionIcon />
                                <Link to = "/news">News</Link>
                            </div>
                            <div className = "searchPage__option">
                                <ImageIcon />
                                <Link to = "/images">Images</Link>
                            </div>
                            <div className = "searchPage__option">
                                <LocalOfferIcon />
                                <Link to = "/shopping">shopping</Link>
                            </div>
                            <div className = "searchPage__option">
                                <RoomIcon />
                                <Link to = "/maps">maps</Link>
                            </div>
                            <div className = "searchPage__option">
                                <MoreVertIcon />
                                <Link to = "/more">more</Link>
                            </div>
                        </div>
                        <div className = "searchPage__optionsRight">
                            <div className = "searchPage__option">
                                <Link to = "/settings">Settings</Link>
                            </div>
                            <div className = "searchPage__option">
                                <Link to = "/tools">Tools</Link>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
            {term &&  data?.items ? (
                <div className = "searchPage__results">
                    <p className= "searchPage__resultCount">
                        About {data?.searchInformation.formattedTotalResults} results ({data?.searchInformation.formattedSearchTime} seconds) for {term}
                    </p>
                    {
                        data?.items.map(item =>(
                            <div className ="searchPage__result">
                               <a href={item.link}>
                               {item.pagemap?.cse_image?.length > 0 && item.pagemap?.cse_image[0]?.src && (
                                   <img className = "searchPage__resultImage" src ={item.pagemap?.cse_image?.length > 0 && item.pagemap?.cse_image[0]?.src} alt =""/>
                               )}
                               {item.displayLink}</a>
                               <a className="searchPage__resultTitle" href={item.link}>
                                   <h2>{item.title}</h2>
                                </a>
                                <p className="searchPage__resultSnippet">
                                    {item.snippet}
                                </p>
                            </div>
                        ))
                    }
                </div>
            ): term && data?.error && <p className="searchPage__error">
            OOPS!! You have exhausted your daily search limit.
            </p>}
        </div>
    )
}

export default SearchPage
