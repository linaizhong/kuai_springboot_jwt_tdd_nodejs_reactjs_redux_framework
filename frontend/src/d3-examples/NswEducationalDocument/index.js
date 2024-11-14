import React, {Component, Fragment} from 'react';
import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';

import * as PropTypes from "prop-types";

import {NswEducationalStandardPage} from "./NswEducationalStandardPage";
import {SBCMPage} from "./SBCMPage";
import {IMFPage} from "./IMFPage";
import {APSTPage} from "./APSTPage";
import {SEFSDSCPage} from "./SEFSDSCPage";
import {CurriculumPage} from "./CurriculumPage";
import {VisualViewTestPage} from "./VisualViewTestPage";
import {LiteracyLearningProgressionsPage} from "./LiteracyLearningProgressionsPage";
import {NumeracyLearningProgressionsPage} from "./NumeracyLearningProgressionsPage";
import {EnglishK10SyllabusPage} from "./EnglishK10SyllabusPage";
import {MusicK10SyllabusPage} from "./MusicK10SyllabusPage";
import {MathematicsK10SyllabusPage} from "./MathematicsK10SyllabusPage";
import {ChemistryK10SyllabusPage} from "./ChemistryK10SyllabusPage";
import {GeographyK10SyllabusPage} from "./GeographyK10SyllabusPage";
import {DocSearchResults} from "./DocSearchResults";
import {LearningResourcesPage} from "./LearningResourcesPage";
import {PrivateRoute} from "../../_components";
import apst from './data/apst.json'
import sbcm from './data/sbcm.json'
import imf from './data/imf.json'
import acf10v10 from './data/acf10v10.json'
import englishk10 from './data/englishk10.json'
import mathematicsk10 from './data/mathematics.json'
import chemistryk10 from './data/chemistry.json'
import geographyk10 from './data/geography.json'
import NswEducationalDocumentService from "../../_services/edu-docs.service";

const dictionary = [];

class NswEducationalDocument extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dic: dictionary,
        }

        // this.refreshFiles = this.refreshFiles.bind(this);
        this.addAPSTToDictionary = this.addAPSTToDictionary.bind(this);
        this.addSBCMToDictionary = this.addSBCMToDictionary.bind(this);
        this.addIMFToDictionary = this.addIMFToDictionary.bind(this);
        this.addACF10V10ToDictionary = this.addACF10V10ToDictionary.bind(this);
        this.addEnglishK10ToDictionary = this.addEnglishK10ToDictionary.bind(this);
        this.addMore = this.addMore.bind(this);
    }

    componentWillMount() {
        if(dictionary.length < 1) {
            this.addAPSTToDictionary();
            this.addSBCMToDictionary();
            this.addIMFToDictionary();
            this.addACF10V10ToDictionary();
            this.addEnglishK10ToDictionary();
        }

        NswEducationalDocumentService.getAllTerminologies()
            .then(
                response => {
                    let terms = [];
                    if(response !== null && response !== undefined && response.length > 0) {
                        response.map(
                            res => {
                                terms[res.terminology] = res;
                            }
                        )
                    }

                    console.log("Terms:")
                    console.log(terms)

                    this.setState({terms: terms});
                }
            )
    }

    addAPSTToDictionary() {
        apst.professionalXs.map(
            px => {
                px.standards.map(
                    standard => {
                        standard.items.map(
                            item => {
                                item.cells.map(
                                    cell => {
                                        dictionary[cell.label] = {
                                            label: cell.label,
                                            headline: cell.title,
                                            elaboration: [
                                                cell.description
                                            ]
                                        }
                                    }
                                )
                            }
                        )
                    }
                )
            }
        )
    }

    addSBCMToDictionary() {
        sbcm.objectives.map(
            obj => {
                obj.items.map(
                    item => {
                        item.cells.map(
                            cell => {
                                dictionary[cell.label] = {
                                    label: cell.label,
                                    headline: cell.description,
                                    elaboration: ""
                                }
                            }
                        )
                    }
                )
            }
        )
    }

    addIMFToDictionary() {
        imf.types.map(
            type =>
            {
                type.items.map(
                    item =>
                        item.cells.map(
                            cell => {
                                dictionary[cell.label] = {
                                    label: cell.label,
                                    headline: cell.title,
                                    elaboration: cell.descriptions
                                }
                            }
                        )
                )
            }
        )
    }

    addMore(objects) {
        if(objects != null && objects.length > 0) {
            objects.map(
                obj => {
                    if(obj.type == "CdCode") {
                        dictionary[obj.title] = {
                            label: obj.title,
                            headline: obj.objects[0].title,
                            elaboration: obj.objects[0].stringList
                        }
                    } else {
                        this.addMore(obj.objects);
                    }
                }
            )
        }
    }

    addACF10V10ToDictionary() {
        let objects = acf10v10.objects;

        objects.map(
            obj => {
                this.addMore(obj.objects);
            }
        )
    }

    addEnglishK10ToDictionary() {
        englishk10.objects.map(
            eng => {
                if(eng.stage != "") {
                    dictionary[eng.outcomes.outcomes[0].code] = {
                        label: eng.outcomes.outcomes[0].code,
                        headline: eng.outcomes.outcomes[0].description,
                        elaboration: [eng.content]
                    }
                }
            }
        )
    }

    render() {
        let {match} = this.props;
        let {terms} = this.state;

        return (
            <Fragment>
                <AppHeader/>
                <div className="app-main">
                    <AppSidebar/>
                    <div className="app-main__outer">
                        <div id="doc_main" className="app-main__inner">
                            <PrivateRoute exact path={`${match.url}/standards`} component={NswEducationalStandardPage}/>
                            <PrivateRoute exact path={`${match.url}/standard/sbcm`} component={SBCMPage} dictionary={dictionary} terms={terms}/>
                            <PrivateRoute exact path={`${match.url}/standard/imf`} component={IMFPage} dictionary={dictionary} terms={terms}/>
                            <PrivateRoute exact path={`${match.url}/doc/search`} component={DocSearchResults} dictionary={dictionary} terms={terms}/>
                            <PrivateRoute exact path={`${match.url}/standard/apst`} component={APSTPage} dictionary={dictionary} terms={terms}/>
                            <PrivateRoute exact path={`${match.url}/standard/sef-sdsc`} component={SEFSDSCPage} dictionary={dictionary} terms={terms}/>
                            <PrivateRoute exact path={`${match.url}/curriculum`} component={CurriculumPage} dictionary={dictionary} terms={terms}/>
                            <PrivateRoute exact path={`${match.url}/test`} component={VisualViewTestPage} dictionary={dictionary} terms={terms}/>
                            <PrivateRoute exact path={`${match.url}/nllps`} component={LiteracyLearningProgressionsPage} dictionary={dictionary} terms={terms}/>
                            <PrivateRoute exact path={`${match.url}/nnlps`} component={NumeracyLearningProgressionsPage} dictionary={dictionary} terms={terms}/>
                            <PrivateRoute exact path={`${match.url}/lrs`} component={LearningResourcesPage} dictionary={dictionary} terms={terms}/>
                            <PrivateRoute exact path={`${match.url}/syllabus/k10/english`} component={EnglishK10SyllabusPage} dictionary={dictionary} terms={terms}/>
                            <PrivateRoute exact path={`${match.url}/syllabus/k10/music`} component={MusicK10SyllabusPage} dictionary={dictionary} terms={terms}/>
                            <PrivateRoute exact path={`${match.url}/syllabus/k10/mathematics`} component={MathematicsK10SyllabusPage} dictionary={dictionary} terms={terms}/>
                            <PrivateRoute exact path={`${match.url}/syllabus/k10/chemistry`} component={ChemistryK10SyllabusPage} dictionary={dictionary} terms={terms}/>
                            <PrivateRoute exact path={`${match.url}/syllabus/k10/geography`} component={GeographyK10SyllabusPage} dictionary={dictionary} terms={terms}/>
                        </div>
                        {/* <AppFooter/> */}
                    </div>
                </div>
            </Fragment>
        );
    }
}

NswEducationalDocument.propTypes = {match: PropTypes.any};

export default NswEducationalDocument;