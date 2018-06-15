import {handleActions} from 'redux-actions';
import {loop, Cmd} from 'redux-loop';
import {load, success, failure} from '../actions/election';

const elections = [
  {
    id: 'quebec-2018',
    title: 'Québec 2018',
    topics: [
      {
        id: 'economy',
        title: 'Economy'
      },
      {
        id: 'environment',
        title: 'Environment'
      },
      {
        id: 'aboriginal-affairs',
        title: 'Aboriginal Affairs'
      },
      {
        id: 'pipelines',
        title: 'Pipelines'
      },
      {
        id: 'justice',
        title: 'Justice'
      },
      {
        id: 'healthcare',
        title: 'Healthcare'
      }
    ],
    candidates: [
      {
        name: 'Justin Trudeau',
        positions: {
          economy: {
            en: {
              text:
                'A Liberal government would work to offer more benefits for Canadian families, readjust tax brackets in favour of the middle class, and overhaul the Canadian Revenue Agency(CRA). They would also make investments into clean energy technology and green innovation in sectors across the economy.',
              sources: [
                'www.liberal.ca/fairness/',
                'https://www.liberal.ca/get-the-facts-economy/'
              ]
            }
          },
          environment: {
            en: {
              text:
                "The Liberal Party promises to improve the protection of Canada's marine areas, land, and wildlife. They would adjust national park admission fees to encourage families and new Canadians to visit them.",
              sources: [
                'www.liberal.ca/realchange/preserving-and-promoting-our-national-parks/',
                'www.liberal.ca/realchange/restoring-credibility-in-environmental-assessments/'
              ]
            }
          }
        }
      }
    ]
  }
];

function fetchElection(id) {
  return elections.find(election => election.id === id);
}

const defaultState = {
  loading: false,
  error: null,
  data: null
};

export default handleActions(
  {
    [load]: (state, {payload}) =>
      loop(
        {
          ...state,
          loading: true
        },
        Cmd.run(fetchElection, {
          successActionCreator: success,
          failActionCreator: failure,
          args: [payload]
        })
      ),
    [success]: (state, {payload}) => ({
      ...state,
      loading: false,
      error: null,
      data: payload
    }),
    [failure]: (state, {payload}) => ({
      ...state,
      loading: false,
      error: payload
    })
  },
  defaultState
);
