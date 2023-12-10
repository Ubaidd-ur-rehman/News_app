import React from "react";

const NewsItems = (props) => {

  const { title, content, ImageUrl, url, author, date, source } = props;
  const titlelimit = 45;
  const truncatedTitle = title.length > titlelimit ? `${title.slice(0, titlelimit)}...` : title;
  return (
    <div className="my-4">
      <div className="card" style={{ width: "22rem", height: '25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', position: "absolute", right: '0' }}>
          <span className="badge rounded-pill bg-info" >{source}</span>
        </div>
        <img style={{ height: "40%" }} src={!ImageUrl ? "https://images.pexels.com/photos/2873479/pexels-photo-2873479.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" : ImageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{truncatedTitle}<span className="badge bg-info mx-2" >New</span></h5>
          <p className="card-text" style={{ fontWeight: "lighter" }}>{content}</p>
          <p className="card-text"><small className="text-body-secondary"></small>By {author} on {new Date(date).toGMTString()}</p>
          <p className="card-text text-info"><small className="text-body-secondary"></small>Published {new Date(date).getMinutes()} min ago</p>
          <a href={url} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">
            REad more
          </a>
        </div>
      </div>
    </div>
  );
}


export default NewsItems;
