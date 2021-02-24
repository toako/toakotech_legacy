import React from "react";
import Axios from "axios";
import { withRouter } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

const server = process.env.REACT_APP_PROJECT_SERVER ? process.env.REACT_APP_PROJECT_SERVER : "";

class PositionsData extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            posID: this.props.match.params.posID,
            position: {},
            users: [],
            usersNA: []
        };

        this.handleAction = this.handleAction.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }

    listColumns (_assigned) {
        return [
            {
                dataField: '_id',
                text: 'User ID',
                sort: true,
                filter: textFilter()
            },
            {
                dataField: 'firstName',
                text: 'First Name',
                sort: true,
                filter: textFilter()
            },
            {
                dataField: 'lastName',
                text: 'Last Name',
                sort: true,
                filter: textFilter()
            },
            {
                dataField: 'username',
                text: 'Username',
                sort: true,
                filter: textFilter()
            },
            {
                dataField: 'actions',
                text: 'Actions',
                isDummyField: true,
                csvExport: false,
                formatter: (cell, row) => <ActionFormat userID={row._id} assigned={_assigned} action={this.handleAction}/>
            }
        ];
    }
    

    componentDidMount() {
        Axios.get(`${server}/s/admin/positions/${this.state.posID}`)
            .then(res => {
                this.setState({
                    position: res.data.position,
                    users: res.data.users,
                    usersNA: res.data.usersNA
                });
            })
            .catch(err => console.log(err));
    }

    handleAction (e) {
        Axios.post(`${server}/s/admin/positions/${this.state.posID}/assign`, {
            id: e.currentTarget.id,
            alreadyAssigned: e.currentTarget.value === "true" ? true : false
        })
        .then(res => {
            this.setState({
                users: res.data.users,
                usersNA: res.data.usersNA
            });
        })
        .catch(err => console.log(err));
    }

    handleBack () {
        this.props.history.push("/s/admin/positions");
    }

    render () {
        return (<div>
            <Row className="p-3">
                <h1 className="mr-auto"><span className="text-info">Modifying <i className="fas fa-pencil-alt fa-sm"></i></span> {this.state.position.title}</h1>
                <Button className="ml-3" variant="outline-warning" onClick={this.handleBack}><i className="fas fa-long-arrow-alt-left"></i> Go back</Button>
            </Row>
            <h4 className="mt-2">Current users in position</h4>
            <BootstrapTable 
                    keyField="id"
                    data = {this.state.users}
                    columns = { this.listColumns(true) }
                    defaultSorted = {[{
                        dataField: 'name',
                        order: 'desc'
                    }]}
                    pagination={ paginationFactory() }
                    filter={ filterFactory() }
                    filterPosition="top"
                />
            <h4 className="mt-4">Add users to position</h4>
            <BootstrapTable 
                    keyField="id"
                    data = {this.state.usersNA}
                    columns = { this.listColumns(false) }
                    defaultSorted = {[{
                        dataField: 'name',
                        order: 'desc'
                    }]}
                    pagination={ paginationFactory() }
                    filter={ filterFactory() }
                    filterPosition="top"
                />
        </div>)
    }
}

export default withRouter(PositionsData);

function ActionFormat (props) {
    
    return (
        <div>
            <Button id={props.userID} value={props.assigned} onClick={props.action} size="sm" variant={props.assigned ? "danger":"info"}> 
                {props.assigned ? (<div>Remove <i className="fas fa-trash fa-sm"></i></div>) : 
                (<div>Add <i className="fas fa-plus fa-sm"></i></div>)}
            </Button>
        </div>
    );
}