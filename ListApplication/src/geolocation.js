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
