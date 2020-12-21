/**
 * Copyright (c)
 * All rights reserved. developer.martinhwang@gmail.com
 *
 * Filename: class-components/List.js
 *
 * Key Options:
 * - function to calculate an average score
 * - display list of student after filtering by student's name
 * - add tag element as array to the student's list
 * - display list of student after filtering by tag
 * - accordion function to display each test score
 *
 * Revision History:
 * - 18 Oct 2020, Martin Hwang <developer.martinhwang@gmail.com> : Created
 */
import React, { Component, Fragment } from 'react'
//components
import SearchBar from './SearchBar'
//material-ui core
import withStyles from '@material-ui/core/styles/withStyles'
import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import Typography from "@material-ui/core/Typography"
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
//material-ui icons
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
//CSS styles for the current component
const styles = () => ({
  studentUl: {
    color: "black",
    background: "white",
    height: "25em",
    overflowY: "auto",
    padding: "0",
    listStyleType: "none",
    border: "1px solid gray",
    borderRadius: "10px",
    // hide scrollbar
    scrollbarWidth: "none", /* firefox */
    '&::-webkit-scrollbar': {
      display: "none" /* safari and chrome */
    },
    '& li ': {
      borderBottom: "1px solid #eee7e7"
    },
    '&:hover': {
      scrollbarWidth: "auto",/* firefox  when hover show scrollbar*/
    }
  },
  accordionSummaryAvatar: {
    border: "1px solid gray",
    height: "6em",
    width: "6em",
  },
  accordionDetailAvatar: {
    height: "6em",
    width: "6em",
    background: "none",
    border: "none",
    "& svg": {
      display: "none"
    }
  },
  name: {
    fontWeight: "bold"
  },
  tag:{
    display: "inline",
    color: "#514f4f",
    marginRight: "0.5em",
    '& span': {
      background: "lightgray",
      padding: "0.3em",
      borderRadius: "5px",
      fontSize: "0.8em"
    }
  },
  form: {
    '& input': {
      border: "none",
      borderBottom: "1.5px solid black",
      paddingBottom: "0.5em",
      maxWidth: "10em",
    }
  },
})
class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
          students: [],
          accordionExpanded: [],
        };
    }
    componentDidMount() {
      this.setState({
        students: this.props.students,
        // create accordionExpanded Array to change expandedIcon in AccordionSummary Tag
        accordionExpanded: this.props.students.map(student => { return student.accordionExpanded = false})
      })
    }
    // filter the list of students by their full name
    searchByName() {
      let input, filter, ul, li, h4, txtValue
      input = document.querySelector('#name-input')
      filter = input.value.toLowerCase()
      ul = document.querySelector('#studentUl')
      li = ul.getElementsByTagName("li")
      for(const l of li){
        h4 = l.getElementsByTagName('h4')[0]
        txtValue = h4.textContent || h4.innerText
        if (txtValue.toLowerCase().indexOf(filter) > -1) {
          l.style.display = ""
        } else {
          l.style.display = "none"
        }
      }
    }
    // fitler the list of students by the tag
    searchByTag () {
      let input, filter, ul, li, txtValue
      input = document.querySelector('#tag-input')
      filter = input.value.toLowerCase()
      ul = document.querySelector('#studentUl')
      li = ul.getElementsByTagName("li")
      for(const l of li){
        txtValue = l.innerHTML
        if (txtValue.toLowerCase().indexOf(filter) > -1) {
          l.style.display = ""
        } else {
          l.style.display = "none"
        }
      }
    }
    // add tag to the object of students array
    addTagInput (index) {
      return (e) => {
        e.preventDefault()
        let input, students
        input = document.getElementsByClassName("add-tag-input")
        students = this.state.students
        for (const e of input) {
          if(e.value !==""){
            // using index# push tag in tags array of accurate student element
            students[index].tags.push(e.value)
            this.setState({students: students})
          }
          e.value = ''
        }
        // console.log(this.state.students[index].tags)
      }
    }
    // when accordion expanded expandIcon is changed with boolean value in accordionExpanded Array
    handleAccordionChange (index) {
      // in material ui accordion API onChange function pass two parameters: event, the expanded state of accordion
      return (event, expanded) => {
          let accordionExpanded = this.state.accordionExpanded
        // if accordion in each li is expanded expanded, second parameter in onChange function returns true
        // if not expanded returns false
        if (expanded) {
          accordionExpanded[index] = expanded // return true and update boolean value in proper index
          this.setState({accordionExpanded: accordionExpanded})
        }else {
          accordionExpanded[index] = expanded // return false and update boolean value in proper index
          this.setState({accordionExpanded: accordionExpanded})
        }
      }
    }
    // function to average grades
    getAverage(arr) {
        let average = 0
        let sum = arr.reduce((previous, current) => parseInt(current) + parseInt(previous))
        average = sum / arr.length
        return average
    }

    render() {
      const { classes } = this.props
      const { students } = this.state
      return (
        <Fragment>
          <ul className={classes.studentUl} id="studentUl">
            <SearchBar id="name-input" placeholder="Search by name" onKeyUp={this.searchByName} fullWidth={true}/>
            <SearchBar id="tag-input" placeholder="Search by tags" onKeyUp={this.searchByTag} fullWidth={true}/>
            {/* map function pass value of each element in array and index#, array optionally */}
            {students.map((student, index, array) => (
              <li key={student}>
                <Accordion  onChange={this.handleAccordionChange(index)}>
                  <AccordionSummary
                    expandIcon={this.state.accordionExpanded[index]?<RemoveIcon/>:<AddIcon/>}
                    aria-controls="panel1-content"
                    id="panel1a-header"
                  >
                    <Box display="flex">
                      <Box margin="1em">
                        <Avatar alt="student" src={student.pic} className={classes.accordionSummaryAvatar} />
                      </Box>
                      <Box textAlign="left" margin="1em 0 0 1em">
                        <Typography variant="h4" className={classes.name}>{student.firstName} {student.lastName}</Typography>
                        <Box color="#6c6c6c" marginLeft="0.5em">
                          <Typography variant="body1">Email: {student.email}</Typography>
                          <Typography variant="body1">Company: {student.company}</Typography>
                          <Typography variant="body1">Skill: {student.skill}</Typography>
                          <Typography variant="body1">Average: {this.getAverage(student.grades)}%</Typography>
                        </Box>
                      </Box>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box display="flex">
                      <Box margin="1em">
                        <Avatar className={classes.accordionDetailAvatar} />
                      </Box>
                      <Box textAlign="left" margin="0 0 0 1em">
                        <Box color="#6c6c6c" marginLeft="0.5em">
                          {student.grades.map((test, index) => {
                          return <Typography variant="body1" align="left">Test {[index+1]}: <Box display="inline" marginLeft="1em"/>{test}%</Typography>})}
                        </Box>
                        <Box color="#6c6c6c" margin="0.5em 0 0.5em 0.5em" >
                          {student.tags.map(tag => {
                            return <Box className={classes.tag}><Typography variant="body" className="tag">{tag}</Typography></Box>
                          })}
                        </Box>
                        <Box color="#6c6c6c" marginLeft="0.5em">
                          <Box className={classes.form}>
                            {/* to push tag to accurate element in addTagInput() function pass index as parameter */}
                            <form onSubmit={this.addTagInput(index)}>
                              <input
                                  type="text"
                                  className="add-tag-input"
                                  placeholder="Add a tag"
                              />
                            </form>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </li>
            ))}
          </ul>
        </Fragment>
      );
    }
}
export default withStyles(styles)(List);
