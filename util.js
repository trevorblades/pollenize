import {Position, Message, Source} from './models';

export const candidateOptions = {
  include: {
    model: Position,
    include: [Source, Message]
  },
  order: [[Position, 'id']]
};
