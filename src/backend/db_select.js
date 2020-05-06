const axios = require('axios');

const get_Con_dust = async (dust_size) => {
  try {
    return await axios.get('http://localhost:3000/dust_'+dust_size); //dust_size에 따른 url 변경
  } catch (error) {
    console.error(error);
  }
};


module.exports ={
   get_Con_dust
}