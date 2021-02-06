import React, { Component } from 'react'
import axios from 'axios'


class AddPin extends Component {
  constructor(props) {
    super(props)
console.log('PROPS', props)
    this.state = {
      description: '',
      latitude: null,
      longitude: null,
      picture: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.uploadFormWithData = this.uploadFormWithData.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleFileChange(event) {
    this.setState({picture: event.target.files[0]})
  }
  handleChange(event){
    const name = event.target.name;
    this.setState({
      [name]: event.target.value
    })
  }

  handleClick(e) {
    e.preventDefault()
    this.uploadFormWithData()
  }

 submitForm(data) {
   console.log('line 37, ', data)
   axios.post('http://localhost:3000/create', data)
   .then(res => console.log(res))
    //  .then(() => this.props.handleChangeView('map'))
     .catch(err => console.log('Error', err))
 }

 uploadFormWithData() {
    const formData = new FormData();
   const { description, picture } = this.state
  //  const formData = { description, picture };
  //  formData.longitude = this.props.marker.position.lng;
  //  formData.latitude = this.props.marker.position.lat;
   formData.append('description', description);
   formData.append('picture', picture);
   formData.append('latitude', this.props.marker.position.lat);
   formData.append('longitude', this.props.marker.position.lng)
   console.log(formData, 'line 42')
   this.submitForm(formData)
 }

  render() {
    const { lat, lng } = this.props.marker.position
    console.log('MARKER', this.props.marker)
    return(
      <div>
        {/* <form action="/markers/create" method='POST' enc-type="multipart/form-data"> */}
        <form>
        <input placeholder="Description" onChange={this.handleChange} name='description' />
        <input type="text" readOnly value={lat} onBlur={this.value=this.value=='' ? 'default'
         : this.value} name='latitude'/>
        <input type="text" readOnly value={lng} onBlur={this.value=this.value=='' ? 'default'
         : this.value} name='longitude'/>
         <input type="file" placeholder="insert picture" name='picture' id="imagepath" onChange={this.handleFileChange}/>
        <button type='submit' onClick={this.handleClick}>Add Pin</button>
        </form>
      </div>

    )
  }
}


export default AddPin