import ignore from './ignore';

export default (process.env.NODE_ENV === 'development' ? console.warn : ignore);
