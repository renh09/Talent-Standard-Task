/* Social media JSX */
import React from 'react';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Popup } from 'semantic-ui-react';

export default class SocialMediaLinkedAccount extends React.Component {
    constructor(props) {
        super(props);
        //TODO
       const linkedAccounts = props.linkedAccounts 
        ? Object.assign({}, props.linkedAccounts)
        : {
            linkedIn: "",
            github: ""
        }

        this.state = {
            showEditSection: false,
            newMedia: linkedAccounts
        }

        this.openEdit = this.openEdit.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.saveMedia = this.saveMedia.bind(this);

    }
    
    openEdit() {
        const linkedAccounts = Object.assign({}, this.props.linkedAccounts)
        this.setState({
            newMedia:linkedAccounts,
            showEditSection: true,
            
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }
 
    handleChange(event) {
        const data = Object.assign({}, this.state.newMedia)
        data[event.target.name] = event.target.value
        this.setState({
            newMedia: data
        })
        console.log(this.state.newMedia);
    }

    saveMedia() {
        const data = {}
        data.linkedAccounts = Object.assign({}, this.state.newMedia);
        this.props.saveProfileData(data);
        this.closeEdit()
    }




    componentDidMount() {
        // $('.ui.button.social-media')
        //     .popup();
    }



    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }

    renderEdit() {
        console.log(this.state);

        return (
            <div className='ui sixteen wide column'>
                <ChildSingleInput
                    inputType="text"
                    label="LinkedIn"
                    name="linkedIn"
                    value={this.state.newMedia.linkedIn}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your linkedIn url"
                    errorMessage="Please enter a valid url"
                />
                <ChildSingleInput
                    inputType="text"
                    label="GitHub"
                    name="github"
                    value={this.state.newMedia.github}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter an github url"
                    errorMessage="Please enter a valid url"
                />
                <button type="button" className="ui teal button" onClick={this.saveMedia}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div>
        )
    }

    renderDisplay() {
        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <button className='ui linkedin button'>
                        <i className='linkedin icon'></i>
                            LinkedIn
                    </button>
                    <button className='ui github button'>
                        <i className='github icon'></i>
                            Github
                    </button>   
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }


}