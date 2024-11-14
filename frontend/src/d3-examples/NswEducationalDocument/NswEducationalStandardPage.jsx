import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PageTitle from "../../Layout/AppMain/PageTitle";
import NswEducationalDocumentService from "../../_services/edu-docs.service";

const theme = {
    scheme: 'monokai',
    author: 'wimer hazenberg (http://www.monokai.nl)',
    base00: '#272822',
    base01: '#383830',
    base02: '#49483e',
    base03: '#75715e',
    base04: '#a59f85',
    base05: '#f8f8f2',
    base06: '#f5f4f1',
    base07: '#f9f8f5',
    base08: '#f92672',
    base09: '#fd971f',
    base0A: '#f4bf75',
    base0B: '#a6e22e',
    base0C: '#a1efe4',
    base0D: '#66d9ef',
    base0E: '#ae81ff',
    base0F: '#cc6633'
};

class NswEducationalStandardPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sbcm: {},
            showSuccessMessage: false
        }

        this.refreshFiles = this.refreshFiles.bind(this)
    }

    componentDidMount() {
        this.refreshFiles();
    }

    refreshFiles() {
        NswEducationalDocumentService.getStandards()
            .then(
                response => {
                    console.log(response);
                    this.setState({standards: response});
                }
            )
    }

    render() {
        const {standards} = this.state;

        return (
            <Fragment>
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <PageTitle
                        heading="NSW Educational Standards"
                        subheading=""
                        icon="pe-7s-graph icon-gradient bg-ripe-malin"/>

                    <div>
                        {/*<div className="container">*/}
                        {/*    {*/}
                        {/*        <JSONTree data={standards} theme={theme} invertTheme={true}/>*/}
                        {/*    }*/}
                        {/*</div>*/}
                    </div>
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

const connectedLearningActionMonitorPage = connect(mapStateToProps)(NswEducationalStandardPage);
export {connectedLearningActionMonitorPage as NswEducationalStandardPage};