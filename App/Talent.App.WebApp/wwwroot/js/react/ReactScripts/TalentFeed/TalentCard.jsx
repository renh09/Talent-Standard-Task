
import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types'
import { Popup, Icon } from 'semantic-ui-react'

export default class TalentCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: 'profile'
        }
        this.showProfileData = this.showProfileData.bind(this)
        this.showVideoData = this.showVideoData.bind(this)
    };

    showProfileData() {
        this.setState({ view: 'profile' })
    }
    showVideoData() {
        this.setState({ view: 'video' })
    }

    render() {
        const { talent } = this.props
        const skillsList = talent.skills
            ? talent.skills.map(skill => <label key={skill} className="ui basic blue label">{skill}</label>)
            : null
        const photoId = talent.photoId ? talent.photoId : "http://localhost:60290/images/matthew.png"
        const middleContent = this.state.view === 'video'
            ? (
                <video width="100%" height="255.75" controls>
                </video>
            )
            : (
                <div className="content" style={{ padding: "0"}}>
                    <div className="ui grid">
                        <div className="eight wide column">
                            <div className="image">
                                <img src={photoId} width="100%" height="100%" />
                            </div>
                        </div>
                        <div className="eight wide column">
                            <div className="ui basic segment">
                                <h3 className="ui header">Talent snapshot</h3>
                                <h5 className="ui header">CURRENT EMPLOYER
                                        <div className="sub header">
                                        {talent.currentEmployment}
                                    </div>
                                </h5>
                                <h5 className="ui header">VISA STATUS
                                        <div className="sub header">
                                        {talent.visa}
                                    </div>
                                </h5>
                                <h5 className="ui header">POSITION
                                        <div className="sub header">
                                        {talent.position}
                                    </div>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            )
        return (
            <div className="ui fluid card" key={talent.id}>
                <div className="content">
                    <div className="left floated header">{talent.name}</div>
                    <i className="right floated big star icon" />
                </div>
                {middleContent}
                <div className="content">
                    <div className="ui grid">
                        <div className="four column row">
                            <div className="center aligned column">
                                {this.state.view === 'video'
                                    ? <i className="large user link icon" onClick={this.showProfileData} />
                                    : <i className="large video link icon" onClick={this.showVideoData} />
                                }
                            </div>
                            <div className="center aligned column"><i className="large file pdf outline link icon" /></div>
                            <div className="center aligned column"><i className="large linkedin link icon" /></div>
                            <div className="center aligned column"><i className="large github link icon" /></div>
                        </div>
                    </div>
                </div>
                <div className="extra content">
                    {skillsList}
                </div>
            </div>
        )
    }
}