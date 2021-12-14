import React, {useContext, useState} from "react";
import { Paper } from "@material-ui/core";
import AppContext from "../hooks/context";
import { Link } from 'react-router-dom';
import axios from 'axios';


function JobAvailableCard({data}) {
  const user = useContext(AppContext).user;
  const [accepted, setAccepted] = useState(false);

  // console.log(user);

  async function acceptJob() {
    await axios.put('/api/jobs', {contractor_id: user.id, id: data.id})
    .then(result => {
      setAccepted(true);
    })
    .catch(err => console.log(err));
  }

  return (
    <Paper>
      <p style={{fontSize:'12px'}}>{data?.date}</p>
      <h3 > {data?.title} ${data?.rate}/hr</h3>
      <h5> {data?.client.firstname} {data?.client.lastname[0]}.</h5>
      <p>Category(s): {data?.specialties.map((category, i) => <span key={i}>{category}{i===data?.specialties?.length - 1 ? '' : ', '}</span>)}</p>
      <div>
        {data?.description}
      </div>
      <div>
        {accepted ? null : <button style={{float:'right'}} onClick={acceptJob}>Accept</button>}
        <Link to={`/profile/${data.client.client_id}`}>
          <button style={{float:'right'}}>Contact</button>
        </Link>
      </div>
      <div>
        {accepted ? <span id ="jobacceptedbttn" style={{textAlign: 'center'}}>Job accepted!</span> : null}
      </div>
    </Paper>
  );
}

export default JobAvailableCard;