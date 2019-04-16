import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie'
import TalentCard from '../TalentFeed/TalentCard.jsx';
import { Loader, Icon, Pagination } from 'semantic-ui-react';
import CompanyProfile from '../TalentFeed/CompanyProfile.jsx';
import FollowingSuggestion from '../TalentFeed/FollowingSuggestion.jsx';
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx';

export default class TalentFeed extends React.Component {
    constructor(props) {
        super(props);

        let loader = loaderData
        loader.allowedUsers.push("Employer")
        loader.allowedUsers.push("Recruiter")

        this.state = {
            loadNumber: 5,
            loadPosition: 0,
            feedData: [],
            watchlist: [],
            loaderData: loader,
            loadingFeedData: false,
            companyDetails: null,
            talentDetails: null,
            totalPages: 0,
            activePage: 1
        }

        this.init = this.init.bind(this);
        this.loadEmployerData = this.loadEmployerData.bind(this);
        this.loadTalentData = this.loadTalentData.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
    };

    init() {
        let loaderData = TalentUtil.deepCopy(this.state.loaderData)
        loaderData.isLoading = false;
        this.setState({ loaderData });//comment this
    }

    componentDidMount() {
        //window.addEventListener('scroll', this.handleScroll);
        this.loadEmployerData()
        this.loadTalentData()
        this.init()
    };

    loadEmployerData() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/getEmployerProfile',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            contenttype: "application/json",
            dataType: "json",
            success: function (res) {
                let companyDetails = null
                if (res.employer) {
                    companyDetails = res.employer.companyContact
                }
                this.setState({ companyDetails })
            }.bind(this),
            error: function (res) {
                console.log(res.status)
            }
        })
    }

    loadTalentData() {
        const { loadPosition, loadNumber } = this.state
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: `http://localhost:60290/profile/profile/getTalent?Position=${loadPosition}&Number=${loadNumber}`,
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            contenttype: "application/json",
            dataType: "json",
            success: function (res) {
                if (res.success) {
                    const talentDetails = res.data
                    this.setState({ talentDetails, totalPages: Math.ceil(res.sum / loadNumber) })
                }
            }.bind(this),
            error: function (res) {
                console.log(res)
            }
        })
    }

    handlePageChange(e, { activePage }) {
        const loadPosition = (activePage - 1) * this.state.loadNumber
        this.setState({ activePage, loadPosition }, () => this.loadTalentData())
    }

    render() {
        const talentList = this.state.talentDetails
            ? (
                <div className="ui eight wide column" style={{ height: "430px", overflowY: "scroll" }}>
                    {this.state.talentDetails.map(talent => <TalentCard talent={talent} key={talent.id} />)}
                </div>
            )
            : (
                <div className="ui eight wide column">
                    <div className="ui basic segment">
                        <div className="ui centered header">There are no talents found for your recruitment company</div>
                    </div>
                </div>
            )
        return (
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                <div className="ui container" style={{ minHeight: "600px" }}>
                    <div className="ui grid">
                        <div className="ui four wide column">
                            <div className="ui card">
                                <CompanyProfile company={this.state.companyDetails} />
                            </div>
                        </div>
                        {talentList}
                        <div className="ui four wide column">
                            <div className="ui card">
                                <FollowingSuggestion />
                            </div>
                        </div>
                        {
                            this.state.talentDetails ?
                                <div className="centered row">
                                    <Pagination
                                        ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
                                        firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                                        lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                                        prevItem={{ content: <Icon name='angle left' />, icon: true }}
                                        nextItem={{ content: <Icon name='angle right' />, icon: true }}
                                        totalPages={this.state.totalPages}
                                        activePage={this.state.activePage}
                                        onPageChange={this.handlePageChange}
                                    />
                                </div>
                                : null
                        }
                    </div>
                </div>
            </BodyWrapper>
        )
    }
}