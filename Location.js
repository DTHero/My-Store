import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import GoogleMapReact from 'google-map-react';


class Location extends Component {

  constructor(props){
    super(props);
    this.state = {
      coors: {
        latitude: 0,
        longitude: 0
      },
      marker:{},
    };
  }

  renderMarkers = (map, maps) => {
    let newCoor ={};
    var newMarker = new maps.Marker({
      position: {lat:10.826567, lng: 106.716425},
      map,
      draggable: true,
      animation: maps.Animation.DROP,
      title: 'Hello World!'
    });

    newMarker.addListener('dragend', () => {
      newCoor = { latitude: newMarker.getPosition().lat(),longitude: newMarker.getPosition().lng() };
      this.setState({coors: newCoor})
      console.log(this.state.coors)
      this.props.onUpdate('location',newCoor);
    });

    this.setState({marker: newMarker});

  }

  _onClick = ({x, y, lat, lng, event}) =>{
    
    console.log(this.state.marker)
    console.log(x, y, lat, lng, event)
  } 

  render(){
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Select location that event happens
      </Typography>
      <div style={{ height: '35vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyA1tPN0OmyIXVWw-MZAD5Ax-jMkGxI1UeA' }}
          defaultZoom={12}
          defaultCenter={{lat:10.826567, lng:106.716425}}
          onGoogleApiLoaded={({map, maps}) => this.renderMarkers(map, maps)}
          onClick={this._onClick} 
        >
        </GoogleMapReact>
      </div>
      <Grid container spacing={16}>
          <TextField
              fullWidth
              disabled
              id="filled-disabled"
              defaultValue="Location view here"
              margin="normal"
              variant="filled"
          />
      </Grid>
    </React.Fragment>
  );
  }
}

export default Location;
