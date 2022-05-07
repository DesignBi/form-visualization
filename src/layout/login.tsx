import React from "react";
import { withRouter } from "react-router-dom";

function Login() {
  return (
      <div>
        { [ 'ss', 'daf' ].map(v => (<h1 key={ v }>{ v }</h1>)) }
      </div>
  )
}

export default withRouter(Login);
