const axios = require('axios');
var array =[];


const get_Con = async () => {
  try {
    return await axios.get('http://localhost:3000/dbcon');
  } catch (error) {
    console.error(error);
  }
};

const retrun_Data = async () => {
  const arr_data = await get_Con();
  //console.log(breeds.data);
  array=arr_data.data;
  return arr_data.data;
};

module.exports ={
  retrun_Data : retrun_Data
}