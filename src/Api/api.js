const API_KEY='88424d688780150ced3508854cf56281';
/**
 * 
* Description [Access Shutterstock search endpoint for short videos]
* @params { String } searchQuery
* @return { Array } 
*/
export const getCurrencyData = async (searchQuery) => {
    const CURREX_API_ENDPOINT = 'https://api.exchangeratesapi.io/latest?base=USD';
    //Make request
    const res = await axios.get(CURREX_API_ENDPOINT);
    console.log(res);
};