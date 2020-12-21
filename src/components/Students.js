/**
 * Copyright (c)
 * All rights reserved. developer.martinhwang@gmail.com
 *
 * Filename: Students.js
 *
 * Key Options:
 * - retrieve the students data using AJAX from public API
 * - add tags as array to the students array
 *
 * Revision History:
 * - 18 Oct 2020, Martin Hwang <developer.martinhwang@gmail.com> : Created
 */
import React, { Component, Fragment } from 'react'
//components
import List from './List'
class Students extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            students: [],
        }
    }
    componentDidMount() {
        // to retrive the students data from public API using AJAX
        fetch("https://api.hatchways.io/assessment/students")
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                students: result.students
              });
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
    }

    render() {
        const { error, isLoaded, students, tags } = this.state
        // add tags arry to each student element in students array
        students.forEach(student => student.tags = [])

        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
              <Fragment>
                {/* Created List tag to populate the each student element in students array */}
                <List students={students} tags={tags}/>
              </Fragment>
            )
        }
    }
}
export default Students
