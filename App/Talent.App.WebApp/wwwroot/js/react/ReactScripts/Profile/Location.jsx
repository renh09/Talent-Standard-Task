import React from 'react'
import Cookies from 'js-cookie'
import { default as Countries } from '../../../../util/jsonFiles/countries.json';
import { ChildSingleInput } from '../Form/SingleInput.jsx';


export class Address extends React.Component {
    constructor(props) {
        super(props)
      

        this.state = {
            showEditSection: false,
           
        }
        this.openEdit = this.openEdit.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.saveData = this.saveData.bind(this);

    }
    
    openEdit() {
        const address = Object.assign({}, this.props.address)
        this.setState({
            newAddress:address,
            showEditSection: true,
            
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }
 
    saveData() {
        const address = Object.assign({}, this.props.addressData);
        this.props.saveProfileData({ address: address });
        this.closeEdit();
        //const found = Object.values(address).find(value => value.toString().trim() === "")
        // if (found === undefined) { 
        // } 
        // else {
        //     TalentUtil.notification.show("Please enter correct address", "error")
        // }
    }

    handleChange(event) {
        const data = Object.assign({}, this.props.addressData)
        data[event.target.name] = event.target.value
        this.props.updateProfileData({ address: data })
    }


   
    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
       
    }



    renderEdit() {
        let countriesOptions = [];
        let cityOptions = [];
        const { addressData } = this.props;
        const selectedCountry = addressData.country;

        countriesOptions = Object.keys(Countries).map(x => <option key={x} value={x}>{x}</option>)
        if (selectedCountry != "" && selectedCountry != null) {
            cityOptions = Countries[selectedCountry].map(x => <option key={x} value={x}>{x}</option>)
        }



        return (
            <div className='ui sixteen wide column'>
                <div className="ui grid">
                    <div className="row">
                        <div className="four wide column">
                            <ChildSingleInput
                                inputType="text"
                                label="Number"
                                name="number"
                                value={addressData.number}
                                controlFunc={this.handleChange}
                                maxLength={80}
                                placeholder="Street number"
                                errorMessage="Please enter a valid streer number"
                            />    
                        </div>
                        <div className="eight wide column">
                            <ChildSingleInput
                                inputType="text"
                                label="Street"
                                name="street"
                                value={addressData.street}
                                controlFunc={this.handleChange}
                                maxLength={80}
                                placeholder="Street name"
                                errorMessage="Please enter a valid streer name"
                            />    
                        </div>
                        <div className="four wide column">
                            <ChildSingleInput
                                inputType="text"
                                label="Suburb"
                                name="suburb"
                                value={addressData.suburb}
                                controlFunc={this.handleChange}
                                maxLength={80}
                                placeholder="suburb number"
                                errorMessage="Please enter a valid suburb number"
                            />    
                        </div>
                    </div>

                    <div className="row">
                        <div className="six wide column">
                            <strong>Country</strong>
                            <select
                                
                                className="ui right labeled dropdown"
                                value={addressData.country}
                                onChange={this.handleChange}
                                name="country">
                                    <option value="">Select a country</option>
                                {countriesOptions}
                            </select>
                        </div>
                        <div className="six wide column">
                            <strong>City</strong>
                            <select className="ui right labeled dropdown"
                                placeholder="City"
                               
                                value={addressData.city}
                                onChange={this.handleChange}
                                name="city">
                                <option value="0">Select a town or city</option>
                                {cityOptions}
                            </select>
                        </div>
                        <div className="four wide column">
                            <ChildSingleInput
                                inputType="text"
                                label="Post Code"
                                name="postCode"
                                value={addressData.postCode}
                                controlFunc={this.handleChange}
                                maxLength={80}
                                placeholder="Enter your post code"
                                errorMessage="Please enter a valid post code"
                            />
                        </div>
                    </div>
                </div>
               
                <button type="button" className="ui teal button"  onClick={this.saveData}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div>
        )
    }

    renderDisplay() {
        const { addressData } = this.props;
        let address = addressData ? `${addressData.number}, ${addressData.street}, ${addressData.suburb}, ${addressData.postCode}`: ""
        let city = addressData ? addressData.city : ""
        let country = addressData ? addressData.country : ""


        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <p>Address:{address}</p>
                        <p>City:{city}</p>
                        <p>Country:{country}</p>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }

}

export class Nationality extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
       
    }

    handleChange(event) {
        if (event.target.value === "") {
            TalentUtil.notification.show("Please select a nationality", "error")
        } else {
            this.props.saveProfileData({ nationality: event.target.value })
        }
    }

    
    render() {
        const nationalityOptions = Object.keys(Countries).map(x => <option key={x} value={x}>{x}</option>)

        return (
            <div className="six wide column">
                <select className="ui right labeled dropdown"
                    placeholder="Select your nationality"
                    value={this.props.nationalityData}
                    onChange={this.handleChange}
                    name="country">
                    <option value="">Select your nationality</option>
                    {nationalityOptions}
                </select>
            </div>
        )


        
    }
}