import React from 'react'
import Typography from '@material-ui/core/Typography'
import FavoriteIcon from '@material-ui/icons/Favorite'

export default function Copyright() {
    return (
        <div>
          <Typography variant="body2" color="textSecondary" align="center">
              Made with <FavoriteIcon /> by the folks at NRRD
          </Typography>
        </div>
    )
}