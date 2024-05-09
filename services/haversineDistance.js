export const haversine = (location1, location2) => {
    //clone the location object to avoid modification
    location1 = { ...location1 };
    location2 = { ...location2 };
    // distance between latitudes and longitudes
    let dLat = (location2.latitude - location1.latitude) * Math.PI / 180.0;
    let dLon = (location2.longitude - location1.longitude) * Math.PI / 180.0;

    // convert to radians
    location1.latitude = (location1.latitude) * Math.PI / 180.0;
    location2.latitude = (location2.latitude) * Math.PI / 180.0;

    // apply formulae
    let a = Math.pow(Math.sin(dLat / 2), 2) +
        Math.pow(Math.sin(dLon / 2), 2) *
        Math.cos(location1.latitude) *
        Math.cos(location2.latitude);
    let rad = 6371;
    let c = 2 * Math.asin(Math.sqrt(a));
    return rad * c;
}