import { withStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";

const styles = theme => ({
    root: {
    }
});

function StatusLine(props) { return <Typography variant='caption'>{props.text}</Typography>; }
export default withStyles(styles)(StatusLine);
