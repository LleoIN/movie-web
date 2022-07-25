export default function List(props){
    return(
        <div className="col-md-4 col-5 text" >
            <div>
                <div className="text-widget poster_cover" style={{margin:"300px 0 0 0"}}>
                    
                    
                    <ul className="list_bottom" style={{color:"black", margin:"0 0 180px -65px",fontSize:"24px"}}>
                    {props.movieinfo.image?<img id="labPoster" style={{width:"250px",height:"350px",margin:"0 0 -350px 270px"}} src={require(`../../movie_image/${props.movieinfo.image}`)} alt="" />:<img style={{width:"250px",height:"350px",margin:"0 0 -350px 270px"}} id="labPoster" src=""alt="" />}
                        <h3 className="distance_2" style={{width:"50%"}}>({props.categorysName}) {props.movieName}</h3>
                        <h5 style={{width:"50%"}}>{props.movieinfo.name_EN}</h5>
                        <li>
                            <dd>首映日期:</dd>
                            <dd>{props.movieinfo.listing_date}</dd>
                        </li>
                        <li>
                            <dd>版&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本:</dd>
                            <dd>{props.categorysName}</dd>
                        </li>
                        <li>
                            <dd>片&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;長:</dd>
                            <dd>{props.movieinfo.duration}</dd>
                        </li>
                        <li>
                            <dd>類&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;別:</dd>
                            <dd>{props.movieinfo.type}</dd>
                        </li>
                    </ul>
                    <ul style={{color:"black", margin:"-100px 0 0 70px",fontSize:"24px"}}>
                        <span>上映廳院:</span>
                        <li>
                          
                            <dd>{props.cinema}/{props.theater}</dd>
                        </li>
                        <span>上映場次:</span>
                        <li>
                            
                            <dd>{props.date} - {props.time}</dd>
                        </li>
                        <li>
                            <span>票種張數:</span>
                            <dd>{props.number?props.number:0}</dd>
                        </li>
                        <span>座位位置:</span>
                        <li >
                            <dd style={{width:"95%",wordWrap:'break-word'}}>{props.seat?`${ props.seat }`:""}</dd>
                        </li>
                        <li>
                            <span>餐點:</span>
                            <dd>{props.foodName?`${ props.foodName }`:""}</dd>
                        </li>
                        <li>
                            <span>金額:</span>
                            {props.price && !props.foodPrice?<dd>{props.price}</dd>:""}
                            {props.price && props.foodPrice ?<dd>{props.price*1+props.foodPrice*1}</dd>:""}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}