import React, {useState} from 'react';
import PodcastGrid from '../components/PodcastGrid';

function PodcastGridScreen() {
    const [inputFeedUrl, setInputFeedUrl] = useState("https://feeds.simplecast.com/tOjNXec5");
    const [rssFeed, setRssFeed] = useState("");
    const [quickFilter, setQuickFilter] = useState("");
    const [feedUrls, setFeedUrls] = useState(
              [
                {name: "UNAM", url: "https://feed.podbean.com/culturaunam/feed.xml"},
                {name: "Música Perú", url: "https://anchor.fm/s/35f908f0/podcast/rss"},                
                
              ]
    );
  
    const handleLoadFeedClick = ()=>{
      const inputRssFeed = document.getElementById("rssFeedUrl").value;
      setRssFeed(inputRssFeed);
    }
  
    const handleFilterChange = (event)=>{
      setQuickFilter(event.target.value);
    }
  
  
    return (
      <div className="App section1 container">
        <h1 style={{ fontFamily: 'rm_typerighter'}}>Podcast Player</h1>
        <div>
          <label htmlFor="podcasts">Escoge un podcast: </label>
          <select name="podcasts" id="podcasts" value={inputFeedUrl}
                onChange={(event)=>setInputFeedUrl(event.target.value)}>
                {feedUrls.map((feed) =>
                  <option value={feed.url} key={feed.url}
                  >{feed.name}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="rssFeedUrl">RSS Feed URL:</label>
          <input type="text" id="rssFeedUrl" name="rssFeedUrl"  style={{width:"50%"}} 
                  value={inputFeedUrl}
                  onChange={(event)=>setInputFeedUrl(event.target.value)}/>
          <button onClick={handleLoadFeedClick}>Load Feed</button>
        </div>
        <div>
        <label htmlFor="quickfilter">Quick Filter:</label>
          <input type="text" id="quickfilter" name="quickfilter" style={{width:"30%"}} value={quickFilter}
                onChange={handleFilterChange}/>        
        </div>
        <div>
          <PodcastGrid rssfeed = {rssFeed}
                       height="500px" width="100%"     
                       quickFilter = {quickFilter}   
        ></PodcastGrid>
        </div>
      </div>
    );
}

export default PodcastGridScreen