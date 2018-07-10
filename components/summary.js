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
                    <ul>
                        {summary.map(i => (
                            <li key={i._id}><Typography variant="body2">{i._id}: {i.duration}</Typography></li>
                        ))}
                    </ul>
                </div>

            )}
        </SummaryContext.Consumer>
    );
}

// Summary.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(Summary);
