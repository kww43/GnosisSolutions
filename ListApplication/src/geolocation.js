import AppConfig from './AppConfig'
import Node from './Node';


// Grab the current latitude from the user's phone
export function getLatitude(instance)
{
		navigator.geolocation.getCurrentPosition(
			(position) => {
				instance.setState({
					latitude: position.coords.latitude,
					error: null,
				});
		  },
		  (error) => instance.setState({ error: error.message }),
		  { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
		);

    return instance.state.latitude;
}

// Grab the current longitude from the user's phone
export function getLongitude(instance)
{
	navigator.geolocation.getCurrentPosition(
		(position) => {
			instance.setState({
				latitude: position.coords.longitude,
				error: null,
			});
		},
		(error) => instance.setState({ error: error.message }),
		{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
	);

	return instance.state.longitude;
}

// Get the distance between two points (in KM) using the Haversine formula
export function getDistance(lat1, lon1, lat2, lon2)
{
  var radius = 6371; //Radius of the earth in KM

  var degreeLat = degreeToradian(lat2-lat1);  // degreeToradian below
  var degreeLon = degreeToradian(lon2-lon1);

  var calc =
    Math.sin(degreeLat/2) * Math.sin(degreeLat/2) +
    Math.cos(degreeToradian(lat1)) * Math.cos(degreeToradian(lat2)) *
    Math.sin(degreeLon/2) * Math.sin(degreeLon/2);

  var circumfrence = 2 * Math.atan2(Math.sqrt(calc), Math.sqrt(1-calc));
	
  var distance = radius * circumfrence; // Distance in km

  return distance;
}

// Converts degrees to radians
export function degreeToradian(degree) {
  return degree * (Math.PI/180)
}
