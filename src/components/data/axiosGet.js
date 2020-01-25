import Axios from 'axios';

export let runAxiosGet = (accessToken) => {
    Axios.get('https://graph.microsoft.com/v1.0/me/', {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    }).then(response => {
      console.log(response);
      /* if (plannerData === null) {
        updatePlannerData(response.data);
      } */
      
    }).catch(error => {
      console.log(error.response);
    });
  }