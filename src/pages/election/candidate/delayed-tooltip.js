import Tooltip from '@material-ui/core/Tooltip';
import withProps from 'recompose/withProps';

const DelayedTooltip = withProps({enterDelay: 500})(Tooltip);

export default DelayedTooltip;
