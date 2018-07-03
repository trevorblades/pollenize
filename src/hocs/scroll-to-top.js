import lifecycle from 'recompose/lifecycle';
import {scrollToTop} from '../util';

export default lifecycle({componentDidMount: scrollToTop});
