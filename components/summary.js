// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import SummaryContext from './summaryContext';

const styles = theme => ({
    root: {
    }
});

function Summary(props) {
    return (
        <SummaryContext.Consumer>
            {summary => (
                <div>
                    <Typography variant="caption">{summary["query_time"]}</Typography>
                    {summary["size_of_rsfa"] && <Typography variant="body1">Found {summary["size_of_rsfa"]} entries, here are the first 10 of them:</Typography>}
                    {summary["first10"] && <ul>
                        {summary["first10"].map(i => (
                            <li key={i._id}><Typography variant="body2">{i.pattern}: {i.avgtxt}</Typography></li>
                        ))}
                    </ul>}
                </div>

            )}
        </SummaryContext.Consumer>
    );
}

// Summary.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(Summary);
