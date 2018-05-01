import AppConfig from './AppConfig'
import Node from './Node';

// Gets the latitude and longitude
export function getLocation()
{
	var lat = 0;
	var long = 0;

	console.log('Getting Users position')
	navigator.geolocation.getCurrentPosition(
			position => {
				console.log('POSITION NETWORK OKAY', position) //success getting position
				lat = position.coords.latitude;
				long = position.coords.longitude;

				console.log(lat, long);

			},
			error => {
				console.log('ERROR') //Error getting position
				console.log(error)
			},
			{
				enableHighAccuracy: false,
				timeout: 10000,
				maxAge: 0
			}
	)
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
