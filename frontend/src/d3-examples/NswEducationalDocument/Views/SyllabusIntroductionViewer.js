import React, { Component } from "react";
import {Tabs, Tab, Row, Col, Nav} from 'react-bootstrap';
import HighlightCellRender from "./HighlightCellRender";

export default class SyllabusIntroductionViewer extends Component {
  constructor(props) {
    super(props);
  }

  render(props) {
    console.log(this.props)

    return (
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={3} style={{backgroundColor: '#f1f4f6'}}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item style={{borderBottom: '2px solid black'}}>
              <Nav.Link eventKey="first"><b>Introduction</b></Nav.Link>
            </Nav.Item>
            <Nav.Item style={{borderBottom: '2px solid black'}}>
              <Nav.Link eventKey="second"><b>English Key</b></Nav.Link>
            </Nav.Item>
            <Nav.Item style={{borderBottom: '2px solid black'}}>
              <Nav.Link eventKey="third"><b>Rationale</b></Nav.Link>
            </Nav.Item>
            <Nav.Item style={{borderBottom: '2px solid black'}}>
              <Nav.Link eventKey="fourth"><b>The place of the English K–10 Syllabus in the K–12 curriculum</b></Nav.Link>
            </Nav.Item>
            <Nav.Item style={{borderBottom: '2px solid black'}}>
              <Nav.Link eventKey="fifth"><b>Aim</b></Nav.Link>
            </Nav.Item>
            <Nav.Item style={{borderBottom: '2px solid black'}}>
              <Nav.Link eventKey="sixth"><b>Objectives</b></Nav.Link>
            </Nav.Item>
            <Nav.Item style={{borderBottom: '2px solid black'}}>
              <Nav.Link eventKey="sixth1"><b>Outcomes</b></Nav.Link>
            </Nav.Item>
            <Nav.Item style={{borderBottom: '2px solid black'}}>
              <Nav.Link eventKey="seventh"><b>Stage statements</b></Nav.Link>
            </Nav.Item>
            <Nav.Item style={{borderBottom: '2px solid black'}}>
              <Nav.Link eventKey="eighth"><b>Organisation of content</b></Nav.Link>
            </Nav.Item>
            <Nav.Item style={{borderBottom: '2px solid black'}}>
              <Nav.Link eventKey="nineth"><b>Years 7–10 Life Skills outcomes and content</b></Nav.Link>
            </Nav.Item>
            <Nav.Item style={{borderBottom: '2px solid black'}}>
              <Nav.Link eventKey="tenth"><b>Assessment</b></Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9} style={{width: '100%', backgroundColor: '#f1f4f6'}}>
          <Tab.Content>
            <Tab.Pane eventKey="first">
              <div style={{width: '100%', backgroundColor: '#fff'}}>
                  <div style={{height: '40px', fontSize: '24px', textAlign: 'center', verticalAlign: 'middle', backgroundColor: '#444', color: 'white'}}>
                    INTRODUCTION
                  </div>

                  <p style={{height: '32px', fontSize: '20px', fontWeight: 'bold', textAlign: 'left', color: '#448'}}>
                    <HighlightCellRender terms={this.props.terms} text={'NSW SYLLABUS ENGLISH K-10'}/>
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'The NSW Education Standards Authority (NESA) syllabuses are developed with respect to some overarching views about education. These include the NESA K–10 Curriculum Framework and Statement of Equity Principles and the Melbourne Declaration on Educational Goals for Young Australians (December 2008).'}/>
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'NESA syllabuses include agreed Australian Curriculum content and content that clarifies the scope, breadth and depth of learning. The Australian Curriculum achievement standards underpin the syllabus outcomes and the Stage statements for Early Stage 1 to Stage 5.'}/>
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'In accordance with the K–10 Curriculum Framework and the Statement of Equity Principles, the syllabus takes into account the diverse needs of all students. It identifies essential knowledge, understanding, skills, values and attitudes. It outlines clear standards of what students are expected to know and be able to do in K–10. It provides structures and processes by which teachers can provide continuity of study for all students. '}/>
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'The framework also provides a set of broad learning outcomes that summarise the knowledge, understanding, skills, values and attitudes essential for all students in all learning areas to succeed in and beyond their schooling. '}/>
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'The continued relevance of the K–10 Curriculum Framework is consistent with the intent of the Melbourne Declaration on Educational Goals for Young Australians (December 2008), which sets the direction for Australian schooling for the next 10 years. There are two broad goals:'}/>
                      <li>Goal 1: Australian schooling promotes equity and excellence</li>
                      <li>Goal 2: All young Australians become successful learners, confident and creative individuals, and active and informed citizens.</li>
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'The way in which learning in the English K–10 Syllabus contributes to the curriculum, and to students’ achievement of the broad learning outcomes, is outlined in the syllabus rationale.'}/>
                  </p>
                  <hr/>

                  <p style={{height: '32px', fontSize: '20px', fontWeight: 'bold', textAlign: 'left', color: '#448'}}>
                    <HighlightCellRender terms={this.props.terms} text={'DIVERSITY OF LEARNERS'}/>
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'NSW syllabuses are inclusive of the learning needs of all students. Syllabuses accommodate teaching approaches that support student diversity, including students with disability, gifted and talented students, and students learning English as an additional language or dialect (EAL/D). Students may have more than one learning need.'}/>
                  </p>
                  <hr/>

                  <p style={{height: '32px', fontSize: '20px', fontWeight: 'bold', textAlign: 'left', color: '#448'}}>
                    <HighlightCellRender terms={this.props.terms} text={'STUDENTS WITH DISABILITY'}/>
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'All students are entitled to participate in and progress through the curriculum. Under the Disability Standards for Education 2005, schools are required to provide additional support or adjustments to teaching, learning and assessment activities for some students with disability. Adjustments are measures or actions taken in relation to teaching, learning and assessment that enable a student with disability to access syllabus outcomes and content and demonstrate achievement of outcomes.'}/>
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'Students with disability can access outcomes and content from K–10 syllabuses in a range of ways. Students may engage with:'}/>
                    <li>syllabus outcomes and content from their age-appropriate stage with adjustments to teaching, learning and/or assessment activities; or</li>
                    <li>selected syllabus outcomes and content from their age-appropriate stage, relevant to their learning needs; or</li>
                    <li>syllabus outcomes from an earlier Stage, using age-appropriate content; or</li>
                    <li>selected Years 7–10 Life Skills outcomes and content from one or more syllabuses for students in Stages 4 and 5.</li>
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'Decisions regarding curriculum options, including adjustments, should be made in the context of collaborative curriculum planning with the student, parent/carer and other significant individuals to ensure that syllabus outcomes and content reflect the learning needs and priorities of individual students.'}/>
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'Further information can be found in support materials for:'}/>
                    <li>English</li>
                    <li>Special education</li>
                    <li>Life Skills</li>
                  </p>
                  <hr/>

                  <p style={{height: '32px', fontSize: '20px', fontWeight: 'bold', textAlign: 'left', color: '#448'}}>
                    <HighlightCellRender terms={this.props.terms} text={'GIFTED AND TALENTED STUDENTS'}/>
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'Gifted and talented students have specific learning needs that may require adjustments to the pace, level and content of the curriculum. Differentiated educational opportunities will assist in meeting the needs of gifted and talented students.'}/>
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'Generally, gifted and talented students demonstrate the following characteristics:'}/>
                    <li>the capacity to learn at faster rates</li>
                    <li>the capacity to find and solve problems</li>
                    <li>the capacity to make connections and manipulate abstract ideas.</li>
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'There are different kinds and levels of giftedness and talent. Gifted and talented students may also have learning disabilities and/or English as an additional language or dialect. These needs should be addressed when planning appropriate teaching, learning and assessment activities.'}/>
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'Curriculum strategies for gifted and talented students may include:'}/>
                    <li>differentiation: modifying the pace, level and content of teaching, learning and assessment activities</li>
                    <li>acceleration: promoting a student to a level of study beyond their age group</li>
                    <li>curriculum compacting: assessing a student’s current level of learning and addressing aspects of the curriculum that have not yet been mastered.</li>
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'School decisions about appropriate strategies are generally collaborative and involve teachers, parents/carers and students, with reference to documents and advice available from NESA and the education sectors.'}/>
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'Gifted and talented students may also benefit from individual planning to determine the curriculum options, as well as teaching, learning and assessment strategies, most suited to their needs and abilities.'}/>
                  </p>
                  <hr/>

                  <p style={{height: '32px', fontSize: '20px', fontWeight: 'bold', textAlign: 'left', color: '#448'}}>
                    <HighlightCellRender terms={this.props.terms} text={'STUDENTS LEARNING ENGLISH AS AN ADDITIONAL LANGUAGE OR DIALECT (EAL/D)'}/>
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'Many students in Australian schools are learning English as an additional language or dialect (EAL/D). EAL/D students are those whose first language is a language or dialect other than Standard Australian English and who require additional support to assist them to develop English language proficiency.'}/>
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'EAL/D students come from diverse backgrounds and may include:'}/>
                    <li>overseas and Australian-born children whose first language is a language other than English, including creoles and related varieties</li>
                    <li>Aboriginal and Torres Strait Islander students whose first language is Aboriginal English, including Kriol and related varieties.</li>
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'EAL/D students enter Australian schools at different ages and stages of schooling and at different stages of English language learning. They have diverse talents and capabilities and a range of prior learning experiences and levels of literacy in their first language and in Standard Australian English. EAL/D students represent a significant and growing percentage of learners in NSW schools. For some, school is the only place they use Standard Australian English.'}/>
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'EAL/D students are simultaneously learning a new language and the knowledge, understanding and skills of a syllabus through that new language. They require additional time and support, along with informed teaching that explicitly addresses their language needs, and assessments that take into account their developing language proficiency.'}/>
                  </p>

                  <p style={{height: '32px', fontSize: '18px', fontWeight: 'bold', textAlign: 'left', color: '#000'}}>
                    <HighlightCellRender terms={this.props.terms} text={'Using the ESL scales with EAL learners'}/>
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'The ESL scales provide a detailed description of English language progression for EAL/D students. In the NSW English K–10 Syllabus, the subject content has been mapped to the ESL scales to support teachers of EAL/D students. Teachers should use the ESL scales in conjunction with the syllabus to address the needs of EAL/D students and to assist them to access English curriculum outcomes and content.'}/>
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'The ESL scales provide a description of English language learning progression typical of EAL/D students. This progression is organised into strands of Oral Interaction, Reading and Responding, and Writing. Each of these strands is organised into level statements. The level statements range from Levels 1 to 7 for Reading and Responding and Writing and from Levels 1 to 8 for Oral Interaction. There are also beginner levels in Reading and Responding and Writing for students who are not literate in any language when they begin learning English.'}/>
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'EAL/D students may be at any stage in the development of their English language skills and therefore any level on the ESL scales. Teachers can address the needs of EAL/D students by determining their level of language on the ESL scales and then considering the ESL scales outcomes mapped to the English content.'}/>
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'The ESL scales outcomes mapped to the content have been selected to show the level of English EAL/D students need in order to achieve the English outcomes. Teachers can use the outcomes and the relevant performance indicators in the ESL scales to plan and program for the language needs of EAL/D students. This should be done in conjunction with development of the knowledge, understanding and skills of the English syllabus content.'}/>
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'EAL/D, English as a Second Language (ESL) and English for Speakers of Other Languages (ESOL) frameworks such as the ESL scales, the English as an Additional Language or Dialect: Teacher Resource and related materials can provide detailed information about the English language development phases of EAL/D students. These resources can be used by teachers to address the specific needs of EAL/D students in their classes and to assist students to access syllabus outcomes and content.'}/>
                  </p>
                  <hr/>

                  <p style={{height: '32px', fontSize: '20px', fontWeight: 'bold', textAlign: 'left', color: '#448'}}>
                    <HighlightCellRender terms={this.props.terms} text={'NATIONAL LITERACY AND NUMERACY LEARNING PROGRESSIONS'}/>
                    
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'The National Literacy and Numeracy Learning Progressions can assist in strengthening teacher knowledge and facilitating a shared professional understanding of literacy and numeracy development.'}/>
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'The progressions can be used to identify the literacy and numeracy development of students and the development that should follow. This assists teachers to differentiate teaching and learning experiences and to provide feedback to students about next steps in learning. The progressions are used in conjunction with the syllabuses, which remain the focus for planning, programming, teaching, learning and assessment.'}/>
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'The progressions are organised into elements and sub-elements that describe common developmental pathways as students become increasingly adept in particular aspects of literacy and numeracy. Each sub-element is clarified by descriptions of observable student behaviours known as indicators. The indicators within each sub-element are grouped together to form developmental levels.'}/>
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'The National Literacy Learning Progression has been mapped to the NSW English K–10 syllabus and the National Numeracy Learning Progression has been mapped to the NSW Mathematics K–10 syllabus to demonstrate the range and level of literacy and numeracy skills required to access the outcomes and content.'}/>
                  </p>
                </div>
              </Tab.Pane>
            <Tab.Pane eventKey="second">
              <div style={{width: '100%', backgroundColor: '#fff'}}>
                  <div style={{height: '40px', fontSize: '24px', textAlign: 'center', verticalAlign: 'middle', backgroundColor: '#444', color: 'white'}}>
                    ENGLISH KEY
                  </div>
                  <p>
                    The following codes and icons are used in the English K–10 Syllabus.
                  </p>

                  <p style={{height: '32px', fontSize: '20px', fontWeight: 'bold', textAlign: 'left', color: '#448'}}>
                    OUTCOME CODING
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'Syllabus outcomes have been coded in a consistent way. The code identifies the subject, stage, outcome number and the way content is organised.'}/> 
                  </p>
                  <p>
                    The stages are represented by the following codes:
                  </p>
                  <table width="400px" border="1">
                    <tr>
                      <th>Stage</th>
                      <th>Code</th>
                    </tr>
                    <tr>
                      <td>Early Stage 1</td>
                      <td>e</td>
                    </tr>
                    <tr>
                      <td>Stage 1</td>
                      <td>1</td>
                    </tr>
                    <tr>
                      <td>Stage 2</td>
                      <td>2</td>
                    </tr>
                    <tr>
                      <td>Stage 3</td>
                      <td>3</td>
                    </tr>
                    <tr>
                      <td>Stage 4</td>
                      <td>4</td>
                    </tr>
                    <tr>
                      <td>Stage 5</td>
                      <td>5</td>
                    </tr>
                  </table>
                  <br/>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'In the English syllabus, the outcome codes indicate the subject, stage, outcome number and objective. For example:'}/>
                  </p>
                  <img width="50%" height="50%" src="http://localhost:3000/static/images/syllabus/english/image_001.png" />
                  <br/><br/>
                  <table width="400px" border="1">
                    <tr>
                      <th>Outcome code</th>
                      <th>Interpretation</th>
                    </tr>
                    <tr>
                      <td>ENe-6B</td>
                      <td>English, Early Stage 1 - Outcome 6, Objective B</td>
                    </tr>
                    <tr>
                      <td>EN5-8D</td>
                      <td>English, Stage 5 - Outcome 8, Objective D</td>
                    </tr>
                    <tr>
                      <td>ENLS-17E</td>
                      <td>English, Life Skills - Outcome 17, Objective E</td>
                    </tr>
                  </table>
                  <br/>

                  <p style={{height: '32px', fontSize: '20px', fontWeight: 'bold', textAlign: 'left', color: '#448'}}>
                    CODING OF THE AUSTRALIAN CURRICULUM CONTENT
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'The syllabus includes all the Australian Curriculum content descriptions for English. The content descriptions are identified by an Australian Curriculum code which appears in brackets at the end of each content description, for example:'}/>
                    <li>evaluate the social, moral and ethical positions represented in texts (ACELT1812).</li>
                    <img width="50%" height="50%" src="http://localhost:3000/static/images/syllabus/english/image_002.png" />
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'Where a number of content descriptions are jointly represented, both description codes are included, for example (ACELT1619, ACELT1626).'}/>                    
                  </p>
                  <p>
                    The Australian Curriculum English codes are:
                  </p>
                  <table width="400px" border="1">
                    <tr>
                      <th>Code</th>
                      <th>Interpretation </th>
                    </tr>
                    <tr>
                      <td>ACELA</td>
                      <td>Australian Curriculum, English, Language</td>
                    </tr>
                    <tr>
                      <td>ACELT</td>
                      <td>Australian Curriculum, English, Literature</td>
                    </tr>
                    <tr>
                      <td>ACELY</td>
                      <td>Australian Curriculum, English, Literacy</td>
                    </tr>
                  </table>
                  <br/>

                  <p style={{height: '32px', fontSize: '20px', fontWeight: 'bold', textAlign: 'left', color: '#448'}}>
                    LEARNING ACROSS THE CURRICULUM ICONS
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'Learning across the curriculum content, including cross-curriculum priorities, general capabilities and other areas identified as important learning for all students, is incorporated and identified by icons in the English K–10 Syllabus.'}/>
                  </p>

                  <table width="400px" border="1">
                    <tr>
                      <th>Cross-curriculum priorities</th>
                    </tr>
                    <tr>
                      <td><img width="20px" height="20px" src="http://localhost:3000/image4.png" />&nbsp;Aboriginal and Torres Strait Islander histories and cultures</td>
                    </tr>
                    <tr>
                      <td><img width="20px" height="20px" src="http://localhost:3000/image5.png" />&nbsp;Asia and Australia’s engagement with Asia</td>
                    </tr>
                    <tr>
                      <td><img width="20px" height="20px" src="http://localhost:3000/image6.png" />&nbsp;Sustainability</td>
                    </tr>
                    <tr>
                      <th>General capabilities</th>
                    </tr>
                    <tr>
                      <td><img width="20px" height="20px" src="http://localhost:3000/image7.png" />&nbsp;Critical and creative thinking</td>
                    </tr>
                    <tr>
                      <td><img width="20px" height="20px" src="http://localhost:3000/image8.png" />&nbsp;Ethical understanding</td>
                    </tr>
                    <tr>
                      <td><img width="20px" height="20px" src="http://localhost:3000/image9.png" />&nbsp;Information and communication technology capability</td>
                    </tr>
                    <tr>
                      <td><img width="20px" height="20px" src="http://localhost:3000/image10.png" />&nbsp;Intercultural understanding</td>
                    </tr>
                    <tr>
                      <td><img width="20px" height="20px" src="http://localhost:3000/image11.png" />&nbsp;Literacy*</td>
                    </tr>
                    <tr>
                      <td><img width="20px" height="20px" src="http://localhost:3000/image12.png" />&nbsp;Numeracy</td>
                    </tr>
                    <tr>
                      <td><img width="20px" height="20px" src="http://localhost:3000/image13.png" />&nbsp;Personal and social capability</td>
                    </tr>
                    <tr>
                      <th>Other learning across the curriculum areas</th>
                    </tr>
                    <tr>
                      <td><img width="20px" height="20px" src="http://localhost:3000/image14.png" />&nbsp;Civics and citizenship</td>
                    </tr>
                    <tr>
                      <td><img width="20px" height="20px" src="http://localhost:3000/image15.png" />&nbsp;Difference and diversity</td>
                    </tr>
                    <tr>
                      <td><img width="20px" height="20px" src="http://localhost:3000/image16.png" />&nbsp;Work and enterprise</td>
                    </tr>
                  </table>
                  <br/>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'* Literacy is embedded throughout the English K–10 Syllabus. It relates to a high proportion of the content descriptions across K–10. Consequently, this particular general capability is not tagged in this syllabus.'}/>
                  </p>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="third">
              <div style={{width: '100%', backgroundColor: '#fff'}}>
                  <div style={{height: '40px', fontSize: '24px', textAlign: 'center', verticalAlign: 'middle', backgroundColor: '#444', color: 'white'}}>
                    RATIONALE
                  </div>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'Language shapes our understanding of ourselves and our world. It is the primary means by which we relate to others and is central to the intellectual, social and emotional development of all students. In the years of schooling from Kindergarten to Year 10, English is the study and use of the English language in its various textual forms. These encompass spoken, written and visual texts of varying complexity through which meaning is shaped, conveyed, interpreted and reflected.'}/>
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'In acknowledgement of its role as the national language, English is the mandatory subject from Kindergarten to Year 12 in the NSW curriculum. Knowledge, understanding, skills, values and attitudes acquired in English are central to the learning and development of students in NSW. Developing proficiency in English enables students to take their place as confident communicators, critical and imaginative thinkers, lifelong learners and informed, active participants in Australian society. It supports the development and expression of a system of personal values, based on students’ understanding of moral and ethical matters, and gives expression to their hopes and ideals.'}/>
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'The study of English from Kindergarten to Year 10 should develop a love of literature and learning and be challenging and enjoyable. It develops skills to enable students to experiment with ideas and expression, to become active, independent and lifelong learners, to work with each other and to reflect on their learning.'}/>
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'Through responding to and composing texts from Kindergarten to Year 10, students learn about the power, value and art of the English language for communication, knowledge and enjoyment. They engage with and explore texts that include widely acknowledged quality literature of past and contemporary societies and engage with the literature and literary heritage of Aboriginal and Torres Strait Islander peoples. By composing and responding with imagination, feeling, logic and conviction, students develop understanding of themselves and of human experience and culture. They develop clear and precise skills in speaking, listening, reading, writing, viewing and representing, and knowledge and understanding of language forms and features and structures of texts.'}/>
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'The study of English in this syllabus is founded on the belief that language learning is recursive and develops through ever-widening contexts. Students learn English through explicit teaching of language and through their engagement with a diverse range of purposeful and increasingly demanding language experiences. The English K–10 Syllabus enables teachers to draw on the methods of different theoretical perspectives and models for teaching English to assist their students to achieve the syllabus outcomes at the highest levels. The syllabus is linked to the purpose statement and broad learning outcomes of the K–10 Curriculum Framework.'}/>
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'In their study of English, students continue to develop their critical and imaginative faculties and broaden their capacity for cultural understanding. They examine the contexts of language usage to understand how meaning is shaped by a variety of social factors. As students’ command of English grows, they are able to question, assess, challenge and reformulate information and use creative and analytical language to identify and clarify issues and solve problems. They become imaginative and confident users of a range of electronic and digital technologies and understand and reflect on the ongoing impact of these technologies on society. These skills and understandings allow them to develop their control of language in ways that will help them in lifelong learning, in their careers and in life.'}/>
                  </p>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="fourth">
              <div style={{width: '100%', backgroundColor: '#fff'}}>
                  <div style={{height: '40px', fontSize: '24px', textAlign: 'center', verticalAlign: 'middle', backgroundColor: '#444', color: 'white'}}>
                    THE PLACE OF THE ENGLISH K–10 SYLLABUS IN THE K–12 CURRICULUM
                  </div>
                  <p>
                    <img width="75%" height="75%" src="http://localhost:3000/static/images/syllabus/english/image_003.png" />
                  </p>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="fifth">
              <div style={{width: '100%', backgroundColor: '#fff'}}>
                  <div style={{height: '40px', fontSize: '24px', textAlign: 'center', verticalAlign: 'middle', backgroundColor: '#444', color: 'white'}}>
                    AIM
                  </div>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'The aim of English in Years K–10 is to enable students to understand and use language effectively, appreciate, reflect on and enjoy the English language and to make meaning in ways that are imaginative, creative, interpretive, critical and powerful.'}/>
                  </p>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="sixth">
              <div style={{width: '100%', backgroundColor: '#fff'}}>
                  <div style={{height: '40px', fontSize: '24px', textAlign: 'center', verticalAlign: 'middle', backgroundColor: '#444', color: 'white'}}>
                    OBJECTIVES  
                  </div>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'Objectives provide specific statements of the intention of a syllabus. They amplify the aim and provide direction to teachers on the teaching and learning process emerging from the syllabus. They define, in broad terms, the knowledge, understanding, skills, values and attitudes to be developed through study in the subject. They act as organisers for the intended outcomes.'}/>  
                  </p>

                  <p style={{height: '32px', fontSize: '20px', fontWeight: 'bold', textAlign: 'left', color: '#448'}}>
                    KNOWLEDGE, UNDERSTANDING AND SKILLS
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'Through responding to and composing a wide range of texts and through the close study of texts, students develop knowledge, understanding and skills in order to:'}/>
                    <li>communicate through speaking, listening, reading, writing, viewing and representing</li>
                    <li>use language to shape and make meaning according to purpose, audience and context</li>
                    <li>think in ways that are imaginative, creative, interpretive and critical</li>
                    <li>express themselves and their relationships with others and their world</li>
                    <li>learn and reflect on their learning through their study of English.</li>
                  </p>

                  <p style={{height: '32px', fontSize: '20px', fontWeight: 'bold', textAlign: 'left', color: '#448'}}>
                    VALUES AND ATTITUDES
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'Students value and appreciate:'}/>
                    <li>the importance of the English language as a key to learning</li>
                    <li>the personal enrichment to be gained from a love of English, literature and learning </li>
                    <li>the power of language to explore and express views of themselves as well as the social, cultural, ethical, moral, spiritual and aesthetic dimensions of human experiences</li>
                    <li>the power of effective communication using the language modes of speaking, listening, reading, writing, viewing and representing</li>
                    <li>the role of language in developing positive interaction and cooperation with others</li>
                    <li>the diversity and aesthetics of language through literary and other texts</li>
                    <li>the independence gained from thinking imaginatively, creatively, interpretively and critically.</li>
                  </p>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="sixth1">
              <div style={{width: '100%', backgroundColor: '#fff'}}>
                  <div style={{height: '40px', fontSize: '24px', textAlign: 'center', verticalAlign: 'middle', backgroundColor: '#444', color: 'white'}}>
                    OUTCOMES  
                  </div>

                  <p style={{height: '32px', fontSize: '20px', fontWeight: 'bold', textAlign: 'left', color: '#448'}}>
                    TABLE OF OBJECTIVES AND OUTCOMES – CONTINUUM OF LEARNING
                  </p>

                  <table border="1" width="100%">
                    <tr>
                      <td rowspan="2" width="300px"><b>Objectives:</b> <HighlightCellRender terms={this.props.terms} text={'Through responding to and composing a wide range of texts and through the close study of texts, students will develop knowledge, understanding and skills in order to:'}/></td>
                      <th>Early Stage 1 outcomes</th>
                      <th>Stage 1 outcomes</th>
                      <th>Stage 2 outcomes</th>
                    </tr>
                    <tr>
                      <th>A Student:</th>
                      <th>A Student:</th>
                      <th>A Student:</th>
                    </tr>
                    <tr>
                      <td rowspan="5"><b>A</b> <HighlightCellRender terms={this.props.terms} text={'communicate through speaking, listening, reading, writing, viewing and representing*'}/></td>
                      <td><b>ENe-1A</b> <HighlightCellRender terms={this.props.terms} text={'communicates with peers and known adults in informal and guided activities demonstrating emerging skills of group interaction'}/></td>
                      <td><b>EN1-1A</b> <HighlightCellRender terms={this.props.terms} text={'communicates with a range of people in informal and guided activities demonstrating interaction skills and considers how own communication is adjusted in different situations'}/></td>
                      <td><b>EN2-1A</b> <HighlightCellRender terms={this.props.terms} text={'communicates in a range of informal and formal contexts by adopting a range of roles in group, classroom, school and community contexts'}/></td>
                    </tr>
                    <tr>
                      <td><b>ENe-2A</b> <HighlightCellRender terms={this.props.terms} text={'composes simple texts to convey an idea or message'}/></td>
                      <td><b>EN1-2A</b> <HighlightCellRender terms={this.props.terms} text={'plans, composes and reviews a small range of simple texts for a variety of purposes on familiar topics for known readers and viewers'}/></td>
                      <td><b>EN2-2A</b> <HighlightCellRender terms={this.props.terms} text={'plans, composes and reviews a range of texts that are more demanding in terms of topic, audience and language'}/></td>
                    </tr>
                    <tr>
                      <td><b>ENe-3A</b> <HighlightCellRender terms={this.props.terms} text={'produces most lower case and upper case letters and uses digital technologies to construct texts'}/></td>
                      <td><b>EN1-3A</b> <HighlightCellRender terms={this.props.terms} text={'composes texts using letters of consistent size and slope and uses digital technologies'}/></td>
                      <td><b>EN2-3A</b> <HighlightCellRender terms={this.props.terms} text={'uses effective handwriting and publishes texts using digital technologies'}/></td>
                    </tr>
                    <tr>
                      <td><b>ENe-4A</b> <HighlightCellRender terms={this.props.terms} text={'demonstrates developing skills and strategies to read, view and comprehend short, predictable texts on familiar topics in different media and technologies'}/></td>
                      <td><b>EN1-4A</b> <HighlightCellRender terms={this.props.terms} text={'draws on an increasing range of skills and strategies to fluently read, view and comprehend a range of texts on less familiar topics in different media and technologies'}/></td>
                      <td><b>EN2-4A</b> <HighlightCellRender terms={this.props.terms} text={'uses an increasing range of skills, strategies and knowledge to fluently read, view and comprehend a range of texts on increasingly challenging topics in different media and technologies'}/></td>
                    </tr>
                    <tr>
                      <td><b>ENe-5A</b> <HighlightCellRender terms={this.props.terms} text={'demonstrates developing skills in using letters, simple sound blends and some sight words to represent known words when spelling'}/></td>
                      <td><b>EN1-5A</b> <HighlightCellRender terms={this.props.terms} text={'uses a variety of strategies, including knowledge of sight words and letter–sound correspondences, to spell familiar words'}/></td>
                      <td><b>EN2-5A</b> <HighlightCellRender terms={this.props.terms} text={'uses a range of strategies, including knowledge of letter–sound correspondences and common letter patterns, to spell familiar and some unfamiliar words'}/></td>
                    </tr>
                    <tr>
                      <td rowspan="4"><b>B</b> <HighlightCellRender terms={this.props.terms} text={'use language to shape and make meaning according to purpose, audience and context'}/></td>
                      <td><b>ENe-6B</b> <HighlightCellRender terms={this.props.terms} text={'recognises that there are different kinds of spoken texts with specific language features and shows an emerging awareness of some purposes for spoken language'}/></td>
                      <td><b>EN1-6B</b> <HighlightCellRender terms={this.props.terms} text={'recognises a range of purposes and audiences for spoken language and recognises organisational patterns and features of predictable spoken texts'}/></td>
                      <td><b>EN2-6B</b> <HighlightCellRender terms={this.props.terms} text={'identifies the effect of purpose and audience on spoken texts, distinguishes between different forms of English and identifies organisational patterns and features'}/></td>
                    </tr>
                    <tr>
                      <td><b>ENe-7B</b> <HighlightCellRender terms={this.props.terms} text={'recognises some different purposes for writing and that own texts differ in various ways'}/></td>
                      <td><b>EN1-7B</b> <HighlightCellRender terms={this.props.terms} text={'identifies how language use in their own writing differs according to their purpose, audience and subject matter'}/></td>
                      <td><b>EN2-7B</b> <HighlightCellRender terms={this.props.terms} text={'identifies and uses language forms and features in their own writing appropriate to a range of purposes, audiences and contexts'}/></td>
                    </tr>
                    <tr>
                      <td><b>ENe-8B</b> <HighlightCellRender terms={this.props.terms} text={'demonstrates emerging skills and knowledge of texts to read and view, and shows developing awareness of purpose, audience and subject matter'}/></td>
                      <td><b>EN1-8B</b> <HighlightCellRender terms={this.props.terms} text={'recognises that there are different kinds of texts when reading and viewing and shows an awareness of purpose, audience and subject matter'}/></td>
                      <td><b>EN2-8B</b> <HighlightCellRender terms={this.props.terms} text={'identifies and compares different kinds of texts when reading and viewing and shows an understanding of purpose, audience and subject matter'}/></td>
                    </tr>
                    <tr>
                      <td><b>ENe-9B</b> <HighlightCellRender terms={this.props.terms} text={'demonstrates developing skills and knowledge in grammar, punctuation and vocabulary when responding to and composing texts'}/></td>
                      <td><b>EN1-9B</b> <HighlightCellRender terms={this.props.terms} text={'uses basic grammatical features, punctuation conventions and vocabulary appropriate to the type of text when responding to and composing texts'}/></td>
                      <td><b>EN2-9B</b> <HighlightCellRender terms={this.props.terms} text={'uses effective and accurate sentence structure, grammatical features, punctuation conventions and vocabulary relevant to the type of text when responding to and composing texts'}/></td>
                    </tr>
                    <tr>
                      <td><b>C</b> <HighlightCellRender terms={this.props.terms} text={'think in ways that are imaginative, creative, interpretive and critical'}/></td>
                      <td><b>ENe-10C</b> <HighlightCellRender terms={this.props.terms} text={'thinks imaginatively and creatively about familiar topics, simple ideas and the basic features of texts when responding to and composing texts'}/></td>
                      <td><b>EN1-10C</b> <HighlightCellRender terms={this.props.terms} text={'thinks imaginatively and creatively about familiar topics, ideas and texts when responding to and composing texts'}/></td>
                      <td><b>EN2-10C</b> <HighlightCellRender terms={this.props.terms} text={'thinks imaginatively, creatively and interpretively about information, ideas and texts when responding to and composing texts'}/></td>
                    </tr>
                    <tr>
                      <td><b>D</b> <HighlightCellRender terms={this.props.terms} text={'express themselves and their relationships with others and their world'}/></td>
                      <td><b>ENe-11D</b> <HighlightCellRender terms={this.props.terms} text={'responds to and composes simple texts about familiar aspects of the world and their own experiences'}/></td>
                      <td><b>EN1-11D</b> <HighlightCellRender terms={this.props.terms} text={'responds to and composes a range of texts about familiar aspects of the world and their own experiences'}/></td>
                      <td><b>EN2-11D</b> <HighlightCellRender terms={this.props.terms} text={'responds to and composes a range of texts that express viewpoints of the world similar to and different from their own'}/></td>
                    </tr>
                    <tr>
                      <td><b>E</b> <HighlightCellRender terms={this.props.terms} text={'learn and reflect on their learning through their study of English'}/></td>
                      <td><b>ENe-12E</b> <HighlightCellRender terms={this.props.terms} text={'demonstrates awareness of how to reflect on aspects of their own and others’ learning'}/></td>
                      <td><b>EN1-12E</b> <HighlightCellRender terms={this.props.terms} text={'identifies and discusses aspects of their own and others’ learning'}/></td>
                      <td><b>EN2-12E</b> <HighlightCellRender terms={this.props.terms} text={'recognises and uses an increasing range of strategies to reflect on their own and others’ learning'}/></td>
                    </tr>
                  </table>

                  <br/><br/>

                  <table border="1" width="100%">
                    <tr>
                      <td rowspan="2" width="300px"><b>Objectives:</b> <HighlightCellRender terms={this.props.terms} text={'Through responding to and composing a wide range of texts and through the close study of texts, students will develop knowledge, understanding and skills in order to:'}/></td>
                      <th>Stage 3 outcomes</th>
                      <th>Stage 4 outcomes</th>
                      <th>Stage 5 outcomes</th>
                    </tr>
                    <tr>
                      <th>A Student:</th>
                      <th>A Student:</th>
                      <th>A Student:</th>
                    </tr>
                    <tr>
                      <td rowspan="4"><b>A</b> <HighlightCellRender terms={this.props.terms} text={'communicate through speaking, listening, reading, writing, viewing and representing*'}/></td>
                      <td><b>EN3-1A</b> <HighlightCellRender terms={this.props.terms} text={'communicates effectively for a variety of audiences and purposes using increasingly challenging topics, ideas, issues and language forms and features'}/></td>
                      <td><b>EN4-1A</b> <HighlightCellRender terms={this.props.terms} text={'responds to and composes texts for understanding, interpretation, critical analysis, imaginative expression and pleasure'}/></td>
                      <td><b>EN5-1A</b> <HighlightCellRender terms={this.props.terms} text={'responds to and composes increasingly sophisticated and sustained texts for understanding, interpretation, critical analysis, imaginative expression and pleasure'}/></td>
                    </tr>
                    <tr>
                      <td><b>EN3-2A</b> <HighlightCellRender terms={this.props.terms} text={'composes, edits and presents well-structured and coherent texts'}/></td>
                      <td rowspan="2"><b>EN4-2A</b> <HighlightCellRender terms={this.props.terms} text={'effectively uses a widening range of processes, skills, strategies and knowledge for responding to and composing texts in different media and technologies'}/></td>
                      <td rowspan="2"><b>EN5-2A</b> <HighlightCellRender terms={this.props.terms} text={'effectively uses and critically assesses a wide range of processes, skills, strategies and knowledge for responding to and composing a wide range of texts in different media and technologies'}/></td>
                    </tr>
                    <tr>
                      <td><b>EN3-3A</b> <HighlightCellRender terms={this.props.terms} text={'uses an integrated range of skills, strategies and knowledge to read, view and comprehend a wide range of texts in different media and technologies'}/></td>
                    </tr>
                    <tr>
                      <td><b>EN3-4A</b> <HighlightCellRender terms={this.props.terms} text={'draws on appropriate strategies to accurately spell familiar and unfamiliar words when composing texts'}/></td>
                    </tr>
                    <tr>
                      <td rowspan="2"><b>B</b> <HighlightCellRender terms={this.props.terms} text={'use language to shape and make meaning according to purpose, audience and context'}/></td>
                      <td><b>EN3-5B</b> <HighlightCellRender terms={this.props.terms} text={'discusses how language is used to achieve a widening range of purposes for a widening range of audiences and contexts'}/></td>
                      <td><b>EN4-3B</b> <HighlightCellRender terms={this.props.terms} text={'uses and describes language forms, features and structures of texts appropriate to a range of purposes, audiences and contexts'}/></td>
                      <td><b>EN5-3B</b> <HighlightCellRender terms={this.props.terms} text={'selects and uses language forms, features and structures of texts appropriate to a range of purposes, audiences and contexts, describing and explaining their effects on meaning'}/></td>
                    </tr>
                    <tr>
                      <td><b>EN3-6B</b> <HighlightCellRender terms={this.props.terms} text={'uses knowledge of sentence structure, grammar, punctuation and vocabulary to respond to and compose clear and cohesive texts in different media and technologies'}/></td>
                      <td><b>EN4-4B</b> <HighlightCellRender terms={this.props.terms} text={'makes effective language choices to creatively shape meaning with accuracy, clarity and coherence'}/></td>
                      <td><b>EN5-4B</b> <HighlightCellRender terms={this.props.terms} text={'effectively transfers knowledge, skills and understanding of language concepts into new and different contexts'}/></td>
                    </tr>
                    <tr>
                      <td rowspan="2"><b>C</b> <HighlightCellRender terms={this.props.terms} text={'think in ways that are imaginative, creative, interpretive and critical'}/></td>
                      <td rowspan="2"><b>EN3-7C</b> <HighlightCellRender terms={this.props.terms} text={'thinks imaginatively, creatively, interpretively and critically about information and ideas and identifies connections between texts when responding to and composing texts'}/></td>
                      <td><b>EN4-5C</b> <HighlightCellRender terms={this.props.terms} text={'thinks imaginatively, creatively, interpretively and critically about information, ideas and arguments to respond to and compose texts'}/></td>
                      <td><b>EN5-5C</b> <HighlightCellRender terms={this.props.terms} text={'thinks imaginatively, creatively, interpretively and critically about information and increasingly complex ideas and arguments to respond to and compose texts in a range of contexts'}/></td>
                    </tr>
                    <tr>
                      <td><b>EN4-6C</b> <HighlightCellRender terms={this.props.terms} text={'identifies and explains connections between and among texts'}/></td>
                      <td><b>EN5-6C</b> <HighlightCellRender terms={this.props.terms} text={'investigates the relationships between and among texts'}/></td>
                    </tr>
                    <tr>
                      <td rowspan="2"><b>D</b> <HighlightCellRender terms={this.props.terms} text={'express themselves and their relationships with others and their world'}/></td>
                      <td rowspan="2"><b>EN3-8D</b> <HighlightCellRender terms={this.props.terms} text={'identifies and considers how different viewpoints of their world, including aspects of culture, are represented in texts'}/></td>
                      <td><b>EN4-7D</b> <HighlightCellRender terms={this.props.terms} text={'demonstrates understanding of how texts can express aspects of their broadening world and their relationships within it'}/></td>
                      <td><b>EN5-7D</b> <HighlightCellRender terms={this.props.terms} text={'understands and evaluates the diverse ways texts can represent personal and public worlds'}/></td>
                    </tr>
                    <tr>
                      <td><b>EN4-8D</b> <HighlightCellRender terms={this.props.terms} text={'identifies, considers and appreciates cultural expression in texts'}/></td>
                      <td><b>EN5-8D</b> <HighlightCellRender terms={this.props.terms} text={'questions, challenges and evaluates cultural assumptions in texts and their effects on meaning'}/></td>
                    </tr>
                    <tr>
                      <td><b>E</b> <HighlightCellRender terms={this.props.terms} text={'learn and reflect on their learning through their study of English'}/></td>
                      <td><b>EN3-9E</b> <HighlightCellRender terms={this.props.terms} text={'recognises, reflects on and assesses their strengths as a learner'}/></td>
                      <td><b>EN4-9E</b> <HighlightCellRender terms={this.props.terms} text={'uses, reflects on and assesses their individual and collaborative skills for learning'}/></td>
                      <td><b>EN5-9E</b> <HighlightCellRender terms={this.props.terms} text={'purposefully reflects on, assesses and adapts their individual and collaborative skills with increasing independence and effectiveness'}/></td>
                    </tr>
                  </table>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'* Some students with disability communicate through a variety of verbal or non-verbal communication systems or techniques. It is important to take account of the individual communication strategies used by these students within the context of the English K–10 Syllabus.'}/>
                  </p>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="seventh">
              <div style={{width: '100%', backgroundColor: '#fff'}}>
                  <div style={{height: '40px', fontSize: '24px', textAlign: 'center', verticalAlign: 'middle', backgroundColor: '#444', color: 'white'}}>
                    STAGE STATEMENTS
                  </div>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'Stage statements are summaries of the knowledge, understanding, skills, values and attitudes that have been developed by students as a result of achieving the outcomes for each stage of learning.'}/>
                  </p>
                  <hr/>

                  <p style={{height: '32px', fontSize: '20px', fontWeight: 'bold', textAlign: 'left', color: '#448'}}>
                    KNOWLEDGE, UNDERSTANDING AND SKILLS
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'Students bring to school a range of knowledge, understanding and skills developed in home and prior-to-school settings. The movement into Early Stage 1 should be seen as a continuum of learning and planned for appropriately.'}/>
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'The Early Years Learning Framework for Australia describes a range of opportunities for students to learn and develop a foundation for future success in learning. '}/>
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'The Early Years Learning Framework for Australia has five learning outcomes that reflect contemporary theories and research evidence about children’s learning. The outcomes are used to guide planning and to assist all children to make progress. '}/>
                  </p>
                  <p>
                    The outcomes are:
                    <ol>
                        <li>Children have a strong sense of identity.</li>
                        <li>Children are connected with and contribute to their world.</li>
                        <li>Children have a strong sense of wellbeing.</li>
                        <li>Children are confident and involved learners.</li>
                        <li>Children are effective communicators.</li>
                    </ol>
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'In addition, teachers need to acknowledge the learning that children bring to school, and plan appropriate learning experiences that make connections with existing language and literacy development, including language used at home.'}/>
                  </p>
                  <hr/>

                  <p style={{height: '32px', fontSize: '20px', fontWeight: 'bold', textAlign: 'left', color: '#448'}}>
                    EARLY STAGE 1
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'By the end of Early Stage 1 students respond to a range of spoken, written and multimodal texts from familiar contexts. They demonstrate active listening behaviours to follow simple instructions and ask relevant questions. Students mix and communicate informally with peers, teachers and known adults in informal and structured classroom settings. They communicate clearly and purposefully when engaging in pair, group and class discussions. Students demonstrate an emerging awareness of how people use spoken language for different purposes. They deliver short presentations using familiar and learned vocabulary. Students explore the way familiar spoken texts are constructed and the features of these texts. '}/>
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'Students develop reading, viewing and comprehension skills and strategies using context, grammar, word usage and phonics to make meaning from short, predictable printed texts on familiar topics. They interpret and provide relevant explanations of characters and main events in imaginative texts, and key ideas and visual features in short informative texts, making connections to personal experience. Students recognise, discuss and respond to the different kinds and purposes of various written, visual and digital texts from a variety of cultures. They read with some fluency and accuracy, drawing support from concepts of print and their developing sound and letter knowledge. Students explore and identify some features of texts, including the use of rhyme, letter patterns and sounds in words in written and spoken texts.'}/>
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'Students engage in writing with an increasing awareness of the nature, purpose and conventions of written language. They create simple texts and recreate familiar imaginative texts by drawing on personal experience and through performance, drawing and images. Students retell events and experiences for known audiences that demonstrate an awareness of the text structure, basic grammar and punctuation needed. Students begin to apply simple editing techniques to their written work. They know and use letters and sounds of the alphabet to attempt to spell known words. Students write most lower and upper case letters appropriately, using the NSW Foundation Style as appropriate. They explore the use of digital technologies to construct a variety of multimodal texts. Students become aware of how to reflect on and assess their own and others’ learning.'}/>
                  </p>
                  <hr/>

                  <p style={{height: '32px', fontSize: '20px', fontWeight: 'bold', textAlign: 'left', color: '#448'}}>
                    STAGE 1
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'By the end of Stage 1 students communicate with a wide range of audiences on familiar and introduced topics to achieve a variety of purposes. They interact effectively, adopting new communication skills and select vocabulary to enhance meaning in order to give confident presentations. Students attend to instructions, share ideas and engage effectively in group and class discussions. They recognise that spoken language has a range of purposes and audiences and use this knowledge when attempting to communicate effectively with others. They investigate the different types and organisational patterns of common spoken texts and recognise features within them. Students create imaginative, informative and persuasive spoken texts drawing on their own experiences, their imagination, and ideas they have learned.'}/>
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'Students read and view imaginative, informative and persuasive texts. They use an increasing variety of skills and strategies, including knowledge of text structure, context, grammar, punctuation, word usage and phonics, to make connections between texts and between their own experiences and information in texts. Students read with developing fluency and intonation short texts with some unfamiliar vocabulary, simple sentences and images. Students read, interpret and discuss texts from a variety of cultures, including visual and multimodal texts, using a range of skills and strategies. They locate literal information in written texts and refer to features of language and images to make inferences about characters’ actions and motivations. Students explore and identify ways in which texts differ according to purpose, audience and subject.'}/>
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'Students create imaginative, informative and persuasive texts on familiar topics for known readers by planning, proofreading and editing their own writing. They write using basic grammatical features and conventions of punctuation, showing an awareness of different purposes, audiences and subject matter. Students use knowledge of letter–sound correspondence, sight words and regular spelling patterns to accurately spell known words and an increasing number of irregularly spelt words. They write consistently and clearly using NSW Foundation Style as appropriate and use digital technologies to produce texts, recognising simple conventions, language and functions. Students reflect on and assess their own and others’ learning.'}/>
                  </p>
                  <hr/>

                  <p style={{height: '32px', fontSize: '20px', fontWeight: 'bold', textAlign: 'left', color: '#448'}}>
                    STAGE 2
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'By the end of Stage 2 students communicate expressively and clearly with growing proficiency about ideas and information in classroom, school and social situations for a range of purposes. They explore a variety of roles when interacting in pairs and groups, attending to different views and responding appropriately. Students use various listening behaviours to gather general ideas and key points from conversations, reports or spoken presentations. They identify the effect of purpose, audience and culture on spoken texts and shape and present ideas accordingly. Students identify common organisational patterns and language features of predictable spoken texts.'}/>
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'Students independently read, view and respond to familiar and challenging texts and justify interpretations of ideas, information and events using a range of skills and strategies. They integrate a range of skills and strategies efficiently when reading, interpreting, analysing and evaluating texts and visual images. Students identify literal information in texts and make inferences, integrating and linking ideas and asking questions to clarify understandings. They recognise the representation of characters, settings and events in imaginative texts and start to evaluate point of view. They explain some ways in which authors and illustrators engage the interests of audiences and achieve a range of purposes. Students explore the structural and grammatical features and purposes for a range of written, visual and multimodal texts.'}/>
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'Students create well-structured imaginative, informative and persuasive texts in terms of topic, purpose, audience and language by drafting, proofreading and editing for familiar and unfamiliar audiences. They use simple and complex sentences, paragraphing, punctuation and grammatical features characteristic of the various texts to support meaning. Students spell familiar and unfamiliar words using knowledge of letter–sound correspondence, regular and irregular spelling patterns, spelling rules and a range of other strategies. They use increasing fluency when writing, applying NSW Foundation Style as appropriate, and develop digital publishing skills. Students explain and reflect on how they structure their writing to achieve intended purposes.'}/>
                  </p>
                  <hr/>

                  <p style={{height: '32px', fontSize: '20px', fontWeight: 'bold', textAlign: 'left', color: '#448'}}>
                    STAGE 3
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'By the end of Stage 3 students communicate effectively, using considered language to entertain, inform and persuade audiences for an increasing range of purposes. They work productively and independently in pairs or groups to deliver effective presentations using various skills and strategies. Students collaborate with others to share and evaluate ideas and opinions and to develop different points of view. They express well-developed and well-organised ideas about literary texts and respond constructively to different opinions. They demonstrate active listening behaviours in order to gather specific information and ideas, recognising and exploring how spoken and written language differ and how spoken language varies according to context. Students evaluate characteristic language features and organisational patterns of challenging spoken texts.'}/>
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'Students independently read and view an extensive range of complex texts and visual images using a comprehensive range of skills and strategies. They respond to themes and issues within texts, recognise point of view and justify interpretations by referring to their own knowledge, values and experiences. They identify, critically analyse and respond to techniques, literary devices and language features used by writers to influence readers. Students compare and accurately summarise information on a particular topic from different texts and make well-supported generalisations about the topic. Students identify text structure of a range of complex texts and explore how grammatical features work to influence an audience’s understanding of written, visual, media and multimodal texts.'}/>
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'Students create well-structured and well-presented written and multimodal imaginative, informative and persuasive texts for a wide range of purposes and audiences. They deal with complex topics, issues and language features. Students select information and ideas from personal, literary and researched resources, and adapt imaginative ideas and situations from literature. They make considered choices in written texts from an expanding vocabulary and from growing knowledge of grammatical patterns, complex sentence structures, cohesive links and literary devices. Students write well-structured sentences and paragraphs on particular aspects of the topic, clarifying and explaining how choices of language and literary features were designed to influence the meaning communicated in their texts. They spell most common words accurately and use a variety of strategies to spell less common words. They develop a fluent writing style and employ digital technology to present written texts effectively in a variety of ways for different purposes and audiences. Students evaluate the effectiveness of their writing by drafting, proofreading, editing, reviewing and publishing, focusing on grammatical features and the conventions of writing. '}/>
                  </p>
                  <hr/>

                  <p style={{height: '32px', fontSize: '20px', fontWeight: 'bold', textAlign: 'left', color: '#448'}}>
                    STAGE 4
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'By the end of Stage 4 students respond to a variety of texts critically, imaginatively and interpretively and compose accurate, clear and coherent texts. They use English in personal, social and learning contexts with increasing control and understanding of the form and features of language and structures of texts, and with increasing awareness of purpose, audience and context. Students make connections between texts, they recognise the main ideas and points of view, and the ways in which texts seek to position responders. They make decisions about whether content and language are appropriate to purpose, audience and context. '}/>
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'In speaking, writing and representing, students shape meaning through the thoughtful selection and ordering of appropriate content and by drawing on a widening repertoire of language choices. They can express a personal point of view, give words and images to their imaginings and compose logical argument. They experiment with form and language in different modes and technologies to produce various types of texts for specific purposes. As appropriate, they plan, draft and edit to produce polished texts. '}/>
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'Students apply their knowledge of textual features and conventions to their texts. They constructively analyse and evaluate their own and others’ compositions and they articulate their response to texts and to the process and experience of composing. Students reflect on their learning, becoming aware of how they learn and identifying what they have learned, effective ways to learn and what they need to learn next. '}/>
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'Students who have achieved Stage 4 respond to literary and other texts for enjoyment and to expand their perspectives on their own lives. They engage with images of their real and imagined worlds and explore the relationship between them. They explore texts critically, evaluating content, differentiating between fact and opinion, challenging points of view and identifying, considering and appreciating cultural expressions. They respond to imagery and symbolism in verbal and visual forms. They engage with print, film and digital texts with an informed awareness of the language forms and features and structures of those texts. Students develop personal preferences in what they hear, read and view, and are able to articulate their preference in personal and critical responses.'}/>
                  </p>
                  <hr/>

                  <p style={{height: '32px', fontSize: '20px', fontWeight: 'bold', textAlign: 'left', color: '#448'}}>
                    STAGE 5
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'By the end of Stage 5 students respond to and compose a comprehensive range of imaginative, factual and critical texts using different modes and technologies. They enjoy, reflect on, critically assess and articulate processes of response and composition. They respond to and compose a wide range of simple and complex texts for pleasure, critical analysis and information-gathering, varying their approach according to a text’s purpose, audience and context. They focus on details of texts to analyse meaning, perspective, cultural assumptions, ideologies and language.'}/>
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'Students use varying technologies to compose texts. They apply their knowledge of the elements that shape meaning in texts. They use a range of strategies to shape their texts to address purpose and audience in different contexts. They conform to or challenge an audience’s preconceptions and expectations about content and form, and they evaluate the effectiveness of each approach. Students display a developing personal style in their personal, imaginative, critical and analytical compositions. They work through the composing process, including planning, researching, drafting, conferencing, editing and publishing. Students reflect on their composing process and how it has affected the final version of their text. '}/>
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'Students respond to texts from different cultures that offer a range of perspectives. In considering possible meanings, they develop sustained interpretations supported by evidence and think creatively beyond the text. They infer and interpret, and investigate the similarities and differences between and among texts. Through close and wide engagement with texts students extend their imaginations and engage with images of their real and imagined worlds. They respond imaginatively and critically to verbal and visual imagery and iconography, considering how these and other features reflect the cultural context of the text. By critically evaluating texts, students identify strengths and weaknesses and are able to articulate coherent responses. From their responses to individual texts they generalise about views of the world and strategies that are used to communicate and sustain such views. '}/>
                  </p>
                  <p>
                    <HighlightCellRender terms={this.props.terms} text={'Students reflect on their own and others’ learning, assessing learning strategies and purposes to adapt their knowledge, understanding and skills to new contexts.'}/>
                  </p>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="eighth">
              <div style={{width: '100%', backgroundColor: '#fff'}}>
                  <div style={{height: '40px', fontSize: '24px', textAlign: 'center', verticalAlign: 'middle', backgroundColor: '#444', color: 'white'}}>
                    ORGANISATION OF CONTENT
                  </div>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'For Kindergarten to Year 10, courses of study and educational programs are based on the outcomes of syllabuses. The content describes in more detail how the outcomes are to be interpreted and used, and the intended learning appropriate for the stage. In considering the intended learning, teachers will make decisions about the sequence, the emphasis to be given to particular areas of content, and any adjustments required based on the needs, interests and abilities of their students.'}/>
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'The knowledge, understanding and skills described in the outcomes and content provide a sound basis for students to successfully move to the next stage of learning.'}/>
                  </p>
                  <img width="75%" height="75%" src="http://localhost:3000/static/images/syllabus/english/image_004.png" />
                  <br/><br/>

                  <p style={{height: '32px', fontSize: '20px', fontWeight: 'bold', textAlign: 'left', color: '#448'}}>
                    CONTENT AND THE USE OF TERMINOLOGY 
                  </p>
                  <p style={{height: '32px', fontSize: '16px', fontWeight: 'bold', textAlign: 'left', color: '#000'}}>
                    Responding and composing
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'In the English K–10 Syllabus, the study of English is an active pursuit where students use language to learn about language. The key processes of responding to and composing texts are central to students using language purposefully and meaningfully and engaging with a wide range of texts.'}/> 
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'‘Responding’ is the activity that occurs as students read, listen to or view texts. It encompasses the personal and intellectual connection a student makes with texts. It also recognises that students and the texts to which they respond reflect social contexts. Responding typically involves:'}/>
                    <li>shaping and arranging textual elements to explore and express ideas, emotions and values</li>
                    <li>identifying, comprehending, selecting, articulating, imagining, critically analysing and evaluating.</li>
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'In this syllabus, ‘composing’ is the activity that occurs as students produce written, spoken or visual texts. Composing typically involves:'}/>
                    <li>shaping, making and arranging textual elements to explore and express ideas, emotions and values</li>
                    <li>processes of imagining, drafting, appraising, reflecting and refining</li>
                    <li>knowledge, understanding and use of the language forms, features and structures of texts.</li>
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'As students undertake the key processes of responding to and composing texts in their study of English, they undertake a number of other integrated and concurrent processes which also highlight the importance of students as active users and learners of language. The processes in this syllabus are intended to emphasise student agency through students developing and applying knowledge and understanding of context and language forms and features, and reflecting on their learning. In addition to the key processes of responding and composing, these processes include:'}/>
                    <li>engaging personally with texts</li>
                    <li>developing and applying contextual knowledge</li>
                    <li>understanding and applying knowledge of language forms and features.</li>
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'The key processes also help to organise and emphasise content in this syllabus within and across stages of learning.'}/>                     
                  </p>
                  <p style={{height: '32px', fontSize: '16px', fontWeight: 'bold', textAlign: 'left', color: '#000'}}>
                    Use of terminology
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'The generic terms ‘composer’ and ‘compose’ can be used in preference to ‘author’ and ‘create’ as used in the Australian Curriculum. The use of the terms ‘composer’ and ‘compose’ does not preclude use of specific nomenclature such as ‘poet’, ‘writer’, ‘novelist’ or ‘playwright’ by teachers and students where appropriate.'}/> 
                  </p>

                  <p style={{height: '32px', fontSize: '20px', fontWeight: 'bold', textAlign: 'left', color: '#448'}}>
                    CONTENT AND TEXT REQUIREMENTS FOR EARLY STAGE 1 TO  STAGE 3
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'In this syllabus, the study of a wide range of texts is central to the study of English. This includes the study of texts which are widely regarded as quality literature, providing students with the opportunity for aesthetic experience and to develop an appreciation of the artistic expression found in texts.'}/>
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'In the primary years of schooling, the study of text types, as part of a broader study of texts, is intended to facilitate student literacy skills and help to establish knowledge about the purpose and audience, structures and language features of a broader range of texts. In the categorisation of texts into ‘text types’, it is important to note that any such classification is to some extent arbitrary and that there is always likely to be overlap between ways of grouping and defining texts.'}/>
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'While delivering courses that reflect the outcomes and content, the following text requirements should be addressed. '}/>
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'Students in K–6 must read, listen to and view a variety of texts that are appropriate to their needs, interests and abilities. These texts become increasingly sophisticated as students move from Kindergarten to Year 6. '}/>
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'In each Year students must study examples of:'}/>
                    <li>spoken texts</li>
                    <li>print texts</li>
                    <li>visual texts</li>
                    <li>media, multimedia and digital texts.</li>
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'Across a stage of learning, the selection of texts must give students experience of:'}/>
                    <li>texts which are widely regarded as quality literature</li>
                    <li>a widely defined Australian literature, including texts that give insights into Aboriginal experiences in Australia</li>
                    <li>a wide range of literary texts from other countries and times, including poetry, drama scripts, prose fiction and picture books</li>
                    <li>texts written about intercultural experiences </li>
                    <li>texts that provide insights about the peoples and cultures of Asia</li>
                    <li>everyday and community texts</li>
                    <li>a wide range of factual texts that present information, issues and ideas</li>
                    <li>texts that include aspects of environmental and social sustainability</li>
                    <li>an appropriate range of digital texts, including film, media and multimedia.</li>
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'In selecting specific texts for study in English, teachers should consider the needs, interests and abilities of their students and the ethos of the school and its local community.'}/>
                  </p>
                  <p>
                    <b>Note:</b> students with disability may not be able to use all or some of the language modes. Some students with disability communicate through a variety of verbal or non-verbal communication systems or techniques. It is important to take account of the individual communication strategies used by these students and make appropriate curriculum adjustments.
                  </p>

                  <p style={{height: '32px', fontSize: '20px', fontWeight: 'bold', textAlign: 'left', color: '#448'}}>
                    CONTENT AND TEXT REQUIREMENTS FOR STAGE 4
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'Over Stage 4, students <b>must</b> read, listen to and view a variety of texts that are appropriate to their needs, interests and abilities. These texts become <b>increasingly sophisticated</b> as students move from Stage 3 to Stage 4 and from Stage 4 to Stage 5.'}/> 
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'Students undertake the essential content and work towards course outcomes through close reading of, listening to or viewing the following:'}/>
                  </p>
                  <table border="1">
                    <tr>
                      <th colspan="2" style={{textAlign: 'center'}}>Stage 4</th>
                    </tr>
                    <tr>
                      <td>Fiction</td>
                      <td>at least two works</td>
                    </tr>
                    <tr>
                      <td>Poetry</td>
                      <td>a wide range of types of poems</td>
                    </tr>
                    <tr>
                      <td>Film </td>
                      <td>at least two works</td>
                    </tr>
                    <tr>
                      <td>Nonfiction</td>
                      <td>at least two works</td>
                    </tr>
                    <tr>
                      <td>Drama</td>
                      <td>at least two works</td>
                    </tr>
                  </table>
                  <br/>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'The following specifications may be fulfilled through the required types of texts outlined above and/or through other texts.'}/>
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'In each Year of Stage 4 students must study examples of:'}/>
                    <li>spoken texts</li>
                    <li>print texts </li>
                    <li>visual texts</li>
                    <li>media, multimedia and digital texts.</li>
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'Across the stage, the selection of texts must give students experience of:'}/>
                    <li>texts which are widely regarded as quality literature</li>
                    <li>a widely defined Australian literature, including texts that give insights into Aboriginal experiences in Australia</li>
                    <li>a wide range of literary texts from other countries and times, including poetry, drama scripts, prose fiction and picture books</li>
                    <li>texts written about intercultural experiences</li>
                    <li>texts that provide insights about the peoples and cultures of Asia</li>
                    <li>everyday and workplace texts</li>
                    <li>a wide range of cultural, social and gender perspectives, popular and youth cultures</li>
                    <li>texts that include aspects of environmental and social sustainability</li>
                    <li>nonfiction, picture books, graphic novels</li>
                    <li>an appropriate range of digital texts, including film, media and multimedia.</li>
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'In selecting specific texts for study in English, teachers should consider the needs, interests and abilities of their students and the ethos of the school and its local community.'}/>
                  </p>
                  <p>
                    <b>Note:</b> students with disability may not be able to use all or some of the language modes. Some students with disability communicate through a variety of verbal or non-verbal communication systems or techniques. It is important to take account of the individual communication strategies used by these students and make appropriate curriculum adjustments. 
                  </p>

                  <p style={{height: '32px', fontSize: '20px', fontWeight: 'bold', textAlign: 'left', color: '#448'}}>
                    CONTENT AND TEXT REQUIREMENTS FOR STAGE 5
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'Over Stage 5, students <b>must</b> read, listen to and view a variety of texts that are appropriate to their needs, interests and abilities. These texts become <b>increasingly sophisticated</b> as students move from Stage 4 to Stage 5.'}/>
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'Students undertake the essential content and work towards course outcomes through close reading of, listening to or viewing the following:'}/>
                  </p>
                  <table border="1">
                    <tr>
                      <th colspan="2" style={{textAlign: 'center'}}>Stage 5</th>
                    </tr>
                    <tr>
                      <td>Fiction</td>
                      <td>at least two works</td>
                    </tr>
                    <tr>
                      <td>Poetry</td>
                      <td>a variety drawn from different anthologies and/or study of one or two poets</td>
                    </tr>
                    <tr>
                      <td>Film </td>
                      <td>at least two works</td>
                    </tr>
                    <tr>
                      <td>Nonfiction</td>
                      <td>at least two works</td>
                    </tr>
                    <tr>
                      <td>Drama</td>
                      <td>at least two works</td>
                    </tr>
                  </table>
                  <br/>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'The following specifications may be fulfilled through the required types of texts outlined above and/or through other texts.'}/>
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'In each Year of Stage 5 students must study examples of:'}/>
                    <li>spoken texts</li>
                    <li>print texts </li>
                    <li>visual texts</li>
                    <li>media, multimedia and digital texts.</li>
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'Across the stage, the selection of texts <b>must</b> give students experience of:'}/>
                    <li>texts which are widely regarded as quality literature</li>
                    <li>a widely defined Australian literature, including texts that give insights into Aboriginal experiences in Australia</li>
                    <li>a wide range of literary texts from other countries and times, including poetry, drama scripts, prose fiction and picture books</li>
                    <li>texts written about intercultural experiences </li>
                    <li>texts that provide insights about the peoples and cultures of Asia</li>
                    <li>Shakespearean drama</li>
                    <li>everyday and workplace texts</li>
                    <li>a wide range of cultural, social and gender perspectives, popular and youth cultures</li>
                    <li>texts that include aspects of environmental and social sustainability</li>
                    <li>nonfiction, picture books, graphic novels</li>
                    <li>an appropriate range of digital texts, including film, media and multimedia.</li>
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'In selecting specific texts for study in English, teachers should consider the needs, interests and abilities of their students and the ethos of the school and its local community.'}/>
                  </p>
                  <p>
                    <b>Note:</b> students with disability may not be able to use all or some of the language modes. Some students with disability communicate through a variety of verbal or non-verbal communication systems or techniques. It is important to take account of the individual communication strategies used by these students and make appropriate curriculum adjustments.
                  </p>

                  <p style={{height: '32px', fontSize: '20px', fontWeight: 'bold', textAlign: 'left', color: '#448'}}>
                    LEARNING ACROSS THE CURRICULUM
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'Learning across the curriculum content, including the cross-curriculum priorities and general capabilities, assists students to achieve the broad learning outcomes defined in the NESA K–10 Curriculum Framework and Statement of Equity Principles, and in the Melbourne Declaration on Educational Goals for Young Australians (December 2008).'}/>
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'Cross-curriculum priorities enable students to develop understanding about and address the contemporary issues they face.'}/>
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={''}/>The cross-curriculum priorities are:
                    <li>Aboriginal and Torres Strait Islander histories and cultures <img width="20px" height="20px" src="http://localhost:3000/image4.png"/></li>
                    <li>Asia and Australia’s engagement with Asia <img width="20px" height="20px" src="http://localhost:3000/image5.png"/></li>
                    <li>Sustainability <img width="20px" height="20px" src="http://localhost:3000/image6.png"/></li>
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'General capabilities encompass the knowledge, skills, attitudes and behaviours to assist students to live and work successfully in the 21st century.'}/> 
                  </p>
                  <p>
                    The general capabilities are:
                    <li>Critical and creative thinking <img width="20px" height="20px" src="http://localhost:3000/image7.png"/></li>
                    <li>Ethical understanding <img width="20px" height="20px" src="http://localhost:3000/image8.png"/></li>
                    <li>Information and communication technology capability <img width="20px" height="20px" src="http://localhost:3000/image9.png"/></li>
                    <li>Intercultural understanding <img width="20px" height="20px" src="http://localhost:3000/image10.png"/></li>
                    <li>Literacy <img width="20px" height="20px" src="http://localhost:3000/image11.png"/></li>
                    <li>Numeracy <img width="20px" height="20px" src="http://localhost:3000/image12.png"/></li>
                    <li>Personal and social capability <img width="20px" height="20px" src="http://localhost:3000/image13.png"/></li>
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'The NESA syllabuses include other areas identified as important learning for all students:'}/>
                    <li>Civics and citizenship <img width="20px" height="20px" src="http://localhost:3000/image14.png"/></li>
                    <li>Difference and diversity <img width="20px" height="20px" src="http://localhost:3000/image15.png"/></li>
                    <li>Work and enterprise <img width="20px" height="20px" src="http://localhost:3000/image16.png"/></li>
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'Learning across the curriculum content is incorporated, and identified by icons, in the content of the English K–10 Syllabus in the following ways:'}/>
                  </p>
                  <p style={{height: '32px', fontSize: '18px', fontWeight: 'bold', textAlign: 'left', color: '#000'}}>
                    Aboriginal and Torres Strait Islander histories and cultures <img width="20px" height="20px" src="http://localhost:3000/image4.png"/>
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'The Aboriginal and Torres Strait Islander histories and cultures cross-curriculum area encompasses the concepts of Country and Place, People, Culture and Identity. In their study of English, students have the opportunity to engage with texts that give them experience of the beliefs and value systems of Aboriginal and Torres Strait Islander peoples. Students develop knowledge and understanding of Aboriginal and Torres Strait Islander history and culture in Australia. In their study of English, students explore a range of experiences and achievements of Aboriginal peoples in historical and social contexts and the links between cultural expression, language and spirituality.'}/>
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'When planning and programming content relating to Aboriginal and Torres Strait Islander histories and cultures, teachers are encouraged to:'}/>
                    <li>involve local Aboriginal communities and/or appropriate knowledge holders in determining suitable resources, or to use Aboriginal or Torres Strait Islander authored or endorsed publications</li>
                    <li>read the Principles and Protocols relating to teaching and learning about Aboriginal and Torres Strait Islander histories and cultures and the involvement of local Aboriginal communities.</li>
                  </p>
                  <p style={{height: '32px', fontSize: '18px', fontWeight: 'bold', textAlign: 'left', color: '#000'}}>
                    Asia and Australia’s engagement with Asia <img width="20px" height="20px" src="http://localhost:3000/image5.png"/>
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'The study of English provides learning opportunities for students to explore and appreciate the rich tradition of texts from and about the peoples and countries of Asia, including texts written by Asian authors. They develop an understanding of the many languages and diverse Asian cultures and how they have influenced Australian culture. Through their study, students develop an appreciation of the role Australia has played in Asia and the ongoing relationship Australia has developed with the countries that make up the Asian region.'}/>
                  </p>
                  <p style={{height: '32px', fontSize: '18px', fontWeight: 'bold', textAlign: 'left', color: '#000'}}>
                    Sustainability <img width="20px" height="20px" src="http://localhost:3000/image6.png"/>
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'The study of English provides students with the skill required to investigate and understand issues of environmental and social sustainability, to communicate information about sustainability, and to advocate action to improve sustainability.'}/>
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'If people now and into the future are to be treated fairly, action to improve sustainability needs to be informed by a worldview of people, places and communities. Both literature and literacy are key elements in the development of each student’s worldview. More sustainable patterns of living are largely shaped by people’s behaviours. English provides an important means of influencing behaviours, facilitating interaction and expressing viewpoints through the creation of texts for a range of purposes, audiences and contexts, including multimodal texts and the use of visual language.                    '}/>
                  </p>
                  <p style={{height: '32px', fontSize: '18px', fontWeight: 'bold', textAlign: 'left', color: '#000'}}>
                    Critical and creative thinking <img width="20px" height="20px" src="http://localhost:3000/image7.png"/>
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'Students develop critical and creative thinking by seeking new pathways or solutions when they evaluate knowledge, ideas and possibilities. English provides students with opportunities to think in ways that are critical and creative using information and ideas and arguments to respond to and compose texts, evaluate their own work and the work of others, and plan for future learning. These skills are integral to activities that require reason, logic, imagination and innovation. In learning to think broadly and deeply students use reason and imagination to direct their thinking for different purposes.'}/>
                  </p>
                  <p style={{height: '32px', fontSize: '18px', fontWeight: 'bold', textAlign: 'left', color: '#000'}}>
                    Ethical understanding <img width="20px" height="20px" src="http://localhost:3000/image8.png"/>
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'The study of English provides students with opportunities to strengthen their capacity for ethical understanding and commitment to ethical behaviour for occasions when they face uncertainty and conflicting claims in a range of contexts.'}/>
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'Opportunities arise for students to engage with situations or circumstances from the real or virtual worlds, or the imaginative worlds of texts that involve ethical or moral issues, dilemmas or decisions as they respond to and compose texts. Ethical issues are integral to many of the texts that students encounter in English.'}/>                     
                  </p>
                  <p style={{height: '32px', fontSize: '18px', fontWeight: 'bold', textAlign: 'left', color: '#000'}}>
                    Information and communication technology capability <img width="20px" height="20px" src="http://localhost:3000/image9.png"/>
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'The study of English enables students to develop and apply knowledge, understanding and skills of ICT in their composing, responding and presenting, and as part of the imaginative and critical thinking they undertake in English.'}/>
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'Students have the opportunity to become competent, discriminating and creative users of ICT as they learn to use ICT effectively and appropriately when investigating, creating and communicating ideas and information. Students learn about the ethics of information communication through technology.'}/>                     
                  </p>
                  <p style={{height: '32px', fontSize: '18px', fontWeight: 'bold', textAlign: 'left', color: '#000'}}>
                    Intercultural understanding <img width="20px" height="20px" src="http://localhost:3000/image10.png"/>
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'Students develop intercultural understanding as they learn to understand their own identity in relation to others from different cultures and backgrounds.'}/>
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'The study of English offers rich opportunities for intercultural understanding and exchange. Students experience a range of literature from different cultures, including the inscriptional and oral narrative traditions of Aboriginal people and Torres Strait Islander people, as well as the contemporary literature of these two cultural groups. They also read classic and contemporary world literature, including texts from and about Asia.'}/>
                  </p>
                  <p style={{height: '32px', fontSize: '18px', fontWeight: 'bold', textAlign: 'left', color: '#000'}}>
                    Literacy <img width="20px" height="20px" src="http://localhost:3000/image11.png"/>
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'[Literacy is embedded throughout the English K–10 Syllabus. It relates to a high proportion of the content descriptions across K–10. Consequently, this particular general capability is not tagged in this syllabus.]'}/>
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'Literacy is the ability to use a repertoire of knowledge and skills to communicate and comprehend effectively in a wide variety of contexts, modes and media. Literacy knowledge and skills provide students with the foundations for current and future learning and for participation in the workplace and wider society. The knowledge and skills also provide opportunities for personal enrichment through social interaction, further education, training and skilled employment and a range of cultural pursuits, including engagement with literature and the arts. Literacy knowledge and skills also enable students to better understand and negotiate the world in which they live and to contribute to a democratic society through becoming ethical and informed citizens.'}/>
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'Being \'literate\' is more than the acquisition of technical skills: it includes the ability to identify, understand, interpret, create and communicate purposefully using written, visual and digital forms of expression and communication for a number of purposes in different contexts. The English learning area has a particular role in developing literacy because of its inherent focus on language and meaning. However, all curriculum areas have a responsibility for the general literacy requirements of students as they construct meaning for themselves and others.                    '}/>
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'The established functions of speaking and listening, reading and writing, and viewing and representing remain central to being literate together with literacy demands related to a range of visual and multimodal texts, as well as those that have evolved from the growth of digital technologies. Students today need the knowledge and skills required for judicious use of these technologies and to question, challenge and evaluate the role of these technologies and the wider implications of their use for contemporary society.                    '}/>
                  </p>
                  <p style={{height: '32px', fontSize: '18px', fontWeight: 'bold', textAlign: 'left', color: '#000'}}>
                    Numeracy <img width="20px" height="20px" src="http://localhost:3000/image12.png"/>
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'The study of English provides opportunities for students to develop their skills in numeracy by identifying and using numerical, measurement, spatial, graphical and statistical concepts and skills. Students strengthen their understanding of how issues and points of view that are based on data are represented in texts by developing their skills to identify, analyse and synthesise numerical information as they respond to the reliability of sources and methodology.                    '}/>
                  </p>
                  <p style={{height: '32px', fontSize: '18px', fontWeight: 'bold', textAlign: 'left', color: '#000'}}>
                    Personal and social capability <img width="20px" height="20px" src="http://localhost:3000/image13.png"/>
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'Students develop personal and social capability as they learn to understand and manage themselves, their relationships, lives, work and learning more effectively. There are many opportunities for students to develop personal and social capability in English. The study of English helps them to identify and express their own opinions, beliefs and responses and to interact confidently and appropriately in a range of social contexts. English provides students with opportunities to reflect on their own and others’ learning and to assess and adapt their individual and collaborative skills for learning with increasing independence and effectiveness.                    '}/>
                  </p>
                  <p style={{height: '32px', fontSize: '18px', fontWeight: 'bold', textAlign: 'left', color: '#000'}}>
                    Civics and citizenship <img width="20px" height="20px" src="http://localhost:3000/image14.png"/>
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'Civics and citizenship content involves knowledge and understanding of how our Australian society operates. In their study of English, students demonstrate their active participation by considering how civic issues are represented in the public arena, the socially responsible construction and use of media, and the representation of Australian images and significant Australians.                   '}/>
                  </p>
                  <p style={{height: '32px', fontSize: '18px', fontWeight: 'bold', textAlign: 'left', color: '#000'}}>
                    Difference and diversity <img width="20px" height="20px" src="http://localhost:3000/image15.png"/>
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'Students experience and value difference and diversity in their everyday lives. Age, beliefs, gender, ability, language and race are some of the factors that comprise difference and diversity. English provides students with opportunities to deal with difference and diversity in a positive and informed manner, showing awareness, understanding and acceptance. It assists them to develop and express their sense of self, to connect with other people and communities and to understand the features of a fair and just society that values diversity. Through the study of texts from a range of perspectives, countries and times, English develops students’ understanding of others and builds empathy for individual differences. '}/>
                  </p>
                  <p style={{height: '32px', fontSize: '18px', fontWeight: 'bold', textAlign: 'left', color: '#000'}}>
                    Work and enterprise <img width="20px" height="20px" src="http://localhost:3000/image16.png"/>
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'English provides opportunities for students to develop knowledge, understanding and skills required in the workplace and to develop values and attitudes about work. English develops many of the key skills required for effective participation in work environments, including literacy, working in groups and skills in acquiring, processing, assessing and communicating information, both orally and in a variety of written forms. Through the study of English, students also develop an understanding of the ways in which language is used for particular audiences, purposes and contexts. Additionally, the study of texts with workplace contexts expands students’ understanding of the world of work. The communication skills developed through the study of English provide a platform for students to undertake future vocational education and training.'}/>
                  </p>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="nineth">
              <div style={{width: '100%', backgroundColor: '#fff'}}>
                  <div style={{height: '40px', fontSize: '24px', textAlign: 'center', backgroundColor: '#444', color: 'white'}}>
                    YEARS 7–10 LIFE SKILLS OUTCOMES AND CONTENT
                  </div>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'The Years 7–10 Life Skills outcomes and content are developed from the objectives of the English K–10 Syllabus.'}/>
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'Before deciding that a student should undertake a course based on Life Skills outcomes and content, consideration should be given to other ways of assisting the student to engage with the regular course outcomes. This assistance may include a range of adjustments to teaching, learning and assessment activities.'}/>
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'If the adjustments do not provide a student with sufficient access to some or all of the Stage 4 and Stage 5 outcomes, a decision can be explored for the student to undertake Life Skills outcomes and content. This decision should be made through the collaborative curriculum planning process involving the student and parent/carer and other significant individuals. School principals are responsible for the management of the collaborative curriculum planning process.'}/>
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'The following points need to be taken into consideration:'}/>
                    <li>students are required to demonstrate achievement of one or more Life Skills outcomes</li>
                    <li>specific Life Skills outcomes should be selected based on the needs, strengths, goals, interests and prior learning of each student</li>
                    <li>achievement of an outcome may be demonstrated through selected Life Skills content</li>
                    <li>outcomes may be demonstrated independently or with support.</li>
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'Further information in relation to planning, implementing and assessing Life Skills outcomes and content can be found in support materials for:'}/>
                    <li>English</li>
                    <li>Special education</li>
                    <li>Life Skills.</li>
                  </p>
                  <p style={{height: '32px', fontSize: '20px', fontWeight: 'bold', textAlign: 'left', color: '#448'}}>
                    YEARS 7–10 LIFE SKILLS OUTCOMES
                  </p>
                  <p style={{height: '32px', fontSize: '18px', fontWeight: 'bold', textAlign: 'left', color: '#448'}}>
                    TABLE OF OBJECTIVES AND OUTCOMES
                  </p>
                  <table border="1">
                    <tr>
                      <td>
                        <b>Objective A</b>
                        <br/>
                        <HighlightCellRender terms={this.props.terms} text={'Through responding to and composing a wide range of texts and through the close study of texts, students develop knowledge, understanding and skills in order to communicate through speaking, listening, reading, writing, viewing and representing*'} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>Life Skills outcomes</b>
                        <br/>
                        A student:
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>ENLS-1A</b><br/> 
                        listens and responds in familiar contexts<br/><br/> 
                        <b>ENLS-2A</b><br/> 
                        communicates for a variety of purposes, audiences and contexts<br/><br/>
                        <b>ENLS-3A</b><br/> 
                        selects and uses language to communicate according to purpose, audience and context<br/><br/>
                        <b>ENLS-4A</b><br/> 
                        views and responds to a range of visual texts, media and multimedia<br/><br/> 
                        <b>ENLS-5A</b><br/> 
                        recognises and uses visual texts, media and multimedia for a variety of purposes, audiences and contexts<br/><br/>
                        <b>ENLS-6A</b><br/>
                        reads and responds to a range of written texts in familiar contexts<br/><br/>
                        <b>ENLS-7A</b><br/>
                        uses strategies to obtain meaning from and interpret a range of texts<br/><br/>
                        <b>ENLS-8A</b><br/>
                        writes short texts for everyday purposes<br/><br/>
                        <b>ENLS-9A</b><br/>
                        composes texts for a variety of purposes and audiences
                      </td>
                    </tr>
                  </table>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'*Some students with disability communicate through a variety of verbal or non-verbal communication systems or techniques. It is important to take account of the individual communication strategies used by these students within the context of the English K–10 Syllabus.'}/>
                  </p>
                  <table border="1">
                    <tr>
                      <td>
                        <b>Objective B</b>
                        <br/>
                        <HighlightCellRender terms={this.props.terms} text={'Through responding to and composing a wide range of texts and through the close study of texts, students develop knowledge, understanding and skills in order to use language to shape and make meaning according to purpose, audience and context'} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>Life Skills outcomes</b>
                        <br/>
                        A student:
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>ENLS-10A</b><br/> 
                        explores the ways in which language forms, features and structures of texts vary according to purpose, audience and context<br/><br/> 
                        <b>ENLS-11A</b><br/> 
                        composes, publishes and presents texts appropriate to purpose and audience in a range of contexts
                      </td>
                    </tr>
                  </table>
                  <br/><br/>
                  <table border="1">
                    <tr>
                      <td>
                        <b>Objective C</b>
                        <br/>
                        <HighlightCellRender terms={this.props.terms} text={'Through responding to and composing a wide range of texts and through the close study of texts, students develop knowledge, understanding and skills in order to think in ways that are imaginative, creative, interpretive and critical'} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>Life Skills outcomes</b>
                        <br/>
                        A student:
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>ENLS-12A</b><br/> 
                        responds to texts in ways that are imaginative and interpretive<br/><br/> 
                        <b>ENLS-13A</b><br/> 
                        engages critically with texts using personal experiences                        
                      </td>
                    </tr>
                  </table>
                  <br/><br/>
                  <table border="1">
                    <tr>
                      <td>
                        <b>Objective D</b>
                        <br/>
                        <HighlightCellRender terms={this.props.terms} text={'Through responding to and composing a wide range of texts and through the close study of texts, students develop knowledge, understanding and skills in order to express themselves and their relationships with others and their world'} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>Life Skills outcomes</b>
                        <br/>
                        A student:
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>ENLS-14A</b><br/> 
                        explores how the use of language affects personal roles and relationships with others<br/><br/> 
                        <b>ENLS-15A</b><br/> 
                        responds to and composes texts that explore personal, social and world issues<br/><br/> 
                        <b>ENLS-16A</b><br/> 
                        explores the ways cultural ideas and perspectives shape a range of spoken, written, visual and multimedia texts
                      </td>
                    </tr>
                  </table>
                  <br/><br/>
                  <table border="1">
                    <tr>
                      <td>
                        <b>Objective E</b>
                        <br/>
                        <HighlightCellRender terms={this.props.terms} text={'Through responding to and composing a wide range of texts and through the close study of texts, students develop knowledge, understanding and skills in order to learn and reflect on their learning through their study of English'} />                                                
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>Life Skills outcomes</b>
                        <br/>
                        A student:
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>ENLS-17A</b><br/> 
                        uses individual and collaborative skills in the learning process<br/><br/> 
                      </td>
                    </tr>
                  </table>
                  <br/><br/>
                  <p style={{height: '32px', fontSize: '18px', fontWeight: 'bold', textAlign: 'left', color: '#448'}}>
                    YEARS 7–10 LIFE SKILLS AND RELATED SYLLABUS OUTCOMES
                  </p>
                  <table border="1">
                    <tr>
                      <td colspan="2">
                        <b>Objective A</b>
                        <br/>
                        <HighlightCellRender terms={this.props.terms} text={'Through responding to and composing a wide range of texts and through the close study of texts, students develop knowledge, understanding and skills in order to communicate through speaking, listening, reading, writing, viewing and representing*'} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>Life Skills outcomes</b>
                        <br/>
                        A student:
                      </td>
                      <td>
                        <b>Related Stage 4/5 outcomes</b>
                        <br/>
                        A student:
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>ENLS-1A</b><br/> 
                        listens and responds in familiar contexts <br/><br/> 
                        <b>ENLS-2A</b><br/> 
                        communicates for a variety of purposes, audiences and contexts<br/><br/> 
                        <b>ENLS-3A</b><br/> 
                        selects and uses language to communicate according to purpose, audience and context<br/><br/> 
                        <b>ENLS-4A</b><br/> 
                        views and responds to a range of visual texts, media and multimedia<br/><br/> 
                        <b>ENLS-8A</b><br/> 
                        writes short texts for everyday purposes 
                      </td>
                      <td>
                        <b>EN4-1A</b><br/> 
                        responds to and composes texts for understanding, interpretation, critical analysis, imaginative expression and pleasure<br/><br/> 
                        <b>EN5-1A</b><br/> 
                        responds to and composes increasingly sophisticated and sustained texts for understanding, interpretation, critical analysis, imaginative expression and pleasure
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>ENLS-5A</b><br/> 
                        recognises and uses visual texts, media and multimedia for a variety of purposes, audiences and contexts<br/><br/> 
                        <b>ENLS-6A</b><br/> 
                        reads and responds to a range of written texts in familiar contexts<br/><br/> 
                        <b>ENLS-7A</b><br/> 
                        uses strategies to obtain meaning from and interpret a range of texts<br/><br/> 
                        <b>ENLS-9A</b><br/> 
                        composes texts for a variety of purposes and audiences
                      </td>
                      <td>
                        <b>EN4-2A</b><br/> 
                        effectively uses a widening range of processes, skills, strategies and knowledge for responding to and composing texts in different media and technologies<br/><br/> 
                        <b>EN5-2A</b><br/> 
                        effectively uses and critically assesses a wide range of processes, skills, strategies and knowledge for responding to and composing a wide range of texts in different media and technologies
                      </td>
                    </tr>
                  </table>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'*Some students with disability communicate through a variety of verbal or non-verbal communication systems or techniques. It is important to take account of the individual communication strategies used by these students within the context of the English K–10 Syllabus.'} />
                  </p>
                  <br/><br/>

                  <table border="1">
                    <tr>
                      <td colspan="2">
                        <b>Objective B</b>
                        <br/>
                        <HighlightCellRender terms={this.props.terms} text={'Through responding to and composing a wide range of texts and through the close study of texts, students develop knowledge, understanding and skills in order to use language to shape and make meaning according to purpose, audience and context'} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>Life Skills outcomes</b>
                        <br/>
                        A student:
                      </td>
                      <td>
                        <b>Related Stage 4/5 outcomes</b>
                        <br/>
                        A student:
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>ENLS-10B</b><br/> 
                        explores the ways in which language forms, features and structures of texts vary according to purpose, audience and context 
                      </td>
                      <td>
                        <b>EN4-3B</b><br/> 
                        uses and describes language forms, features and structures of texts appropriate to a range of purposes, audiences and contexts<br/><br/> 
                        <b>EN5-3B</b><br/> 
                        selects and uses language forms, features and structures of texts appropriate to a range of purposes, audiences and contexts, describing and explaining their effects on meaning
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>ENLS-11B</b><br/> 
                        composes, publishes and presents texts appropriate to purpose and audience in a range of contexts
                      </td>
                      <td>
                        <b>EN4-4B</b><br/> 
                        makes effective language choices to creatively shape meaning with accuracy, clarity and coherence<br/><br/> 
                        <b>EN5-4B</b><br/> 
                        effectively transfers knowledge, skills and understanding of language concepts into new and different contexts
                      </td>
                    </tr>
                  </table>
                  <br/><br/>

                  <table border="1">
                    <tr>
                      <td colspan="2">
                        <b>Objective C</b>
                        <br/>
                        <HighlightCellRender terms={this.props.terms} text={'Through responding to and composing a wide range of texts and through the close study of texts, students develop knowledge, understanding and skills in order to think in ways that are imaginative, creative, interpretive and critical'} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>Life Skills outcomes</b>
                        <br/>
                        A student:
                      </td>
                      <td>
                        <b>Related Stage 4/5 outcomes</b>
                        <br/>
                        A student:
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>ENLS-12C</b><br/> 
                        responds to texts in ways that are imaginative and interpretive<br/><br/> 
                        <b>ENLS-13C</b><br/> 
                        engages critically with texts using personal experiences
                      </td>
                      <td>
                        <b>EN4-5C</b><br/> 
                        thinks imaginatively, creatively, interpretively and critically about information, ideas and arguments to respond to and compose texts<br/><br/> 
                        <b>EN4-6C</b><br/> 
                        identifies and explains connections between and among texts<br/><br/> 
                        <b>EN5-5C</b><br/> 
                        thinks imaginatively, creatively, interpretively and critically about information and increasingly complex ideas and arguments to respond to and compose texts in a range of contexts<br/><br/> 
                        <b>EN5-6C</b><br/> 
                        investigates the relationships between and among texts
                      </td>
                    </tr>
                  </table>
                  <br/><br/>

                  <table border="1">
                    <tr>
                      <td colspan="2">
                        <b>Objective D</b>
                        <br/>
                        <HighlightCellRender terms={this.props.terms} text={'Through responding to and composing a wide range of texts and through the close study of texts, students develop knowledge, understanding and skills in order to express themselves and their relationships with others and their world'} />                        
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>Life Skills outcomes</b>
                        <br/>
                        A student:
                      </td>
                      <td>
                        <b>Related Stage 4/5 outcomes</b>
                        <br/>
                        A student:
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>ENLS-14D</b><br/> 
                        explores how the use of language affects personal roles and relationships with others <br/><br/> 
                        <b>ENLS-15D</b><br/> 
                        responds to and composes texts that explore personal, social and world issues
                      </td>
                      <td>
                        <b>EN4-7D</b><br/> 
                        demonstrates understanding of how texts can express aspects of their broadening world and their relationships within it<br/><br/> 
                        <b>EN5-7D</b><br/> 
                        understands and evaluates the diverse ways texts can represent personal and public worlds
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>ENLS-16D</b><br/> 
                        explores the ways cultural ideas and perspectives shape a range of spoken, written, visual and multimedia texts
                      </td>
                      <td>
                        <b>EN4-8D</b><br/> 
                        identifies, considers and appreciates cultural expression in texts<br/><br/> 
                        <b>EN5-8D</b><br/> 
                        questions, challenges and evaluates cultural assumptions in texts and their effects on meaning
                      </td>
                    </tr>
                  </table>
                  <br/><br/>

                  <table border="1">
                    <tr>
                      <td colspan="2">
                        <b>Objective E</b>
                        <br/>
                        <HighlightCellRender terms={this.props.terms} text={'Through responding to and composing a wide range of texts and through the close study of texts, students develop knowledge, understanding and skills in order to learn and reflect on their learning through their study of English'} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>Life Skills outcomes</b>
                        <br/>
                        A student:
                      </td>
                      <td>
                        <b>Related Stage 4/5 outcomes</b>
                        <br/>
                        A student:
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>ENLS-17E</b><br/> 
                        uses individual and collaborative skills in the learning process
                      </td>
                      <td>
                        <b>EN4-9E</b><br/> 
                        uses, reflects on and assesses their individual and collaborative skills for learning<br/><br/> 
                        <b>EN5-9E</b><br/> 
                        purposefully reflects on, assesses and adapts their individual and collaborative skills with increasing independence and effectiveness
                      </td>
                    </tr>
                  </table>

                  <br/><br/>
                  <p style={{height: '32px', fontSize: '18px', fontWeight: 'bold', textAlign: 'left', color: '#448'}}>
                    YEARS 7–10 LIFE SKILLS CONTENT
                  </p>
                  <p>
                  The Years 7–10 Life Skills content is suggested.
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'Content describes the intended learning for students as they work towards achieving one or more of the Life Skills outcomes. It provides the foundations for students to progress to the next stage of schooling or post-school opportunities.'}/>                    
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'Teachers will make decisions about the choice of outcomes and selection of content regarding the sequence, emphasis and any adjustments required based on the needs, strengths, goals, interests and prior learning of students. Examples provided in the content are suggestions only. Teachers may use the examples provided or use other examples to meet the particular needs of individual students.'}/>                    
                  </p>

                  <p style={{height: '32px', fontSize: '18px', fontWeight: 'bold', textAlign: 'left', color: '#448'}}>
                    TEXT SELECTIONS
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'Teaching and learning opportunities which draw from a diverse range of texts can assist students to broaden and develop their own language skills. Examples of spoken texts, print texts, visual texts, media, multimedia and digital texts can be used to address the English Years 7–10 Life Skills outcomes. Where appropriate, students should experience a range of texts drawn from:'}/>
                  <li>texts which are widely regarded as quality literature</li>
                  <li>a widely defined Australian literature, including texts that give insights into Aboriginal experiences in Australia</li>
                  <li>a wide range of literary texts from other countries and times, including poetry, drama scripts, prose fiction and picture books</li>
                  <li>texts written about intercultural experiences</li>
                  <li>texts that provide insights about the peoples and cultures of Asia</li>
                  <li>everyday and workplace texts</li>
                  <li>a wide range of cultural, social and gender perspectives, popular and youth cultures</li>
                  <li>texts that include aspects of environmental and social sustainability</li>
                  <li>nonfiction, picture books, graphic novels</li>
                  <li>an appropriate range of digital texts, including film, media and multimedia</li>
                  <li>Shakespearean drama.</li>
                  </p>
                  <p>
                  Refer to the Content section of this syllabus for further information about the organisation of content.                    
                  </p>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="tenth">
              <div style={{width: '100%', backgroundColor: '#fff'}}>
                  <div style={{height: '40px', fontSize: '24px', textAlign: 'center', backgroundColor: '#444', color: 'white'}}>
                    ASSESSMENT
                  </div>
                  <p style={{height: '32px', fontSize: '20px', fontWeight: 'bold', textAlign: 'left', color: '#448'}}>
                    STANDARDS
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'The NSW Education Standards Authority (NESA) K–10 Curriculum Framework is a standards-referenced framework that describes, through syllabuses and other documents, the expected learning outcomes for students.'}/>
                  </p>
                  <p style={{height: '32px', fontSize: '20px', fontWeight: 'bold', textAlign: 'left', color: '#448'}}>
                    ASSESSMENT
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'Assessment is an integral part of teaching and learning. Well-designed assessment is central to engaging students and should be closely aligned to the outcomes within a Stage. Effective assessment increases student engagement in their learning and leads to enhanced student outcomes.'}/>
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'Assessment for Learning, Assessment as Learning and Assessment of Learning are three approaches to assessment that play an important role in teaching and learning. The NESA Years K–10 syllabuses particularly promote Assessment for Learning as an essential component of good teaching.'}/>
                  </p>
                  <p>
                    <img width="75%" height="75%" src="http://localhost:3000/static/images/syllabus/english/image_005.png" />
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'Further advice on programming and appropriate assessment practice in relation to the English syllabus is provided on the NESA website. This support material provides general advice on assessment as well as strategies to assist teachers in planning education programs.'}/>
                  </p>

                  <p style={{height: '32px', fontSize: '20px', fontWeight: 'bold', textAlign: 'left', color: '#448'}}>
                    ASSESSMENT FOR STUDENTS WITH DISABILITY
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'Some students with disability will require adjustments to assessment practices in order to demonstrate what they know and can do in relation to syllabus outcomes and content. The type of adjustments and support will vary according to the particular needs of the student and the requirements of the activity. These may be:'}/>
                    <li>adjustments to the assessment process, for example scaffolded instructions, additional guidance provided, highlighted key words or phrases, the use of specific technology, extra time in an examination </li>
                    <li>adjustments to assessment activities, for example rephrasing questions, using simplified language, fewer questions or alternative formats for questions</li>
                    <li>alternative formats for responses, for example written point form instead of essays, scaffolded structured responses, short objective questions or multimedia presentations.</li>
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'It is a requirement under the Disability Standards for Education 2005 for schools to ensure that assessment tasks are accessible to students with disability. Schools are responsible for any decisions made at school level to offer adjustments to coursework, assessment activities and tasks, including in-school tests. Decisions regarding adjustments should be made in the context of collaborative curriculum planning.'}/>
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'Further examples of adjustments to assessment for students with disability and information on assessment of students undertaking Life Skills outcomes and content can be found in support materials for:'}/>
                    <li>English</li>
                    <li>Special Education</li>
                    <li>Life Skills.</li>
                  </p>

                  <p style={{height: '32px', fontSize: '20px', fontWeight: 'bold', textAlign: 'left', color: '#448'}}>
                    REPORTING
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'Reporting is the process of providing feedback to students, parents/carers and other teachers about student progress.'}/>
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'Teachers use assessment evidence to extend the process of Assessment for Learning into their Assessment of Learning. In a standards-referenced framework teachers make professional judgements about student achievement at key points in the learning cycle. These points may be at the end of a Year or Stage, when schools may wish to report differentially on the levels of knowledge, understanding and skills demonstrated by students.'}/>
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'Descriptions of student achievement provide schools with a useful tool to report consistent information about student achievement to students and parents/carers, and to the next teacher to help plan the future steps in the learning process.'}/> 
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'The A–E grade scale or equivalent provides a common language for reporting by describing observable and measurable features of student achievement at the end of a Stage, within the indicative hours of study. Teachers use the descriptions of the standards to make a professional, on-balance judgement, based on available assessment information, to match each student’s achievement to a description. Teachers use the Common Grade Scale (A–E) or equivalent to report student levels of achievement from Stage 1 to Stage 5.'}/> 
                  </p>
                  <p>
                  <HighlightCellRender terms={this.props.terms} text={'For students with disability, teachers may need to consider, in consultation with their school and sector, the most appropriate method of reporting student achievement. It may be deemed more appropriate for students with disability to be reported against outcomes or goals identified through the collaborative curriculum planning process. There is no requirement for schools to use the Common Grade Scale (A–E) or equivalent to report achievement of students undertaking Life Skills outcomes and content.'}/>
                  </p>
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
      </Tab.Container>
    ) 
  }
}
