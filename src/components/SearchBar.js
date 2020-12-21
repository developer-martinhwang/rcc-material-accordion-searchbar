/**
 * Copyright (c) 
 * All rights reserved.
 *
 * Filename: SearchBar.js
 *
 * Key Options:
 * - created SearchBar tag to reuse this tag for several input tag 
 * - this tag has three property:id, placeholder, onKeyUp
 * Revision History:
 * - 18 Oct 2020, Martin Hwang <developer.martinhwang@gmail.com> : Created
 */
import React, { Component, Fragment } from 'react'
//material-ui core
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import withStyles from '@material-ui/core/styles/withStyles'
//CSS styles for the current component
const styles = () => ({
  textField : {
    '& label': {
      padding: "0.5em"
    },
    '& input': {
      padding: "0.5em"
    }
  }
})
class SearchBar extends Component {
  render() {
    const { classes } = this.props
        return (
            <Fragment>
              <Box className={classes.textField}>
                <TextField id={this.props.id} placeholder={this.props.placeholder} onKeyUp={this.props.onKeyUp} fullWidth={this.props.fullWidth} />
              </Box>
            </Fragment>
        )
    }
}

export default withStyles(styles)(SearchBar);