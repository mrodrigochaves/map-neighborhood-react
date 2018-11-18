//API to get infomation about location based on LAT and LNG
const CLIENT_ID = "EKGKFETBDEDSONFR1PMYDI1CXKCUMK5G1KZLHHVBSHNUHLN3";
const CLIENT_SECRET = "TPEDQBY5ORYEFAIXGS4NPPBTBOI2OAJRWURYVJGWQ0DEFRH2";
const URL_REQ = "https://api.foursquare.com/v2/venues/search?limit=5&v=20180323&client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&ll=";
export const requestFoursqureApi = (lat, lng) =>
    fetch(URL_REQ + lat + "," + lng, {})
        .then(res => res.json())
        .then(data => data);