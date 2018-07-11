import {Position, Message, Source} from './models';

export const candidateOptions = {
  include: [
    'parties',
    'bios',
    {
      model: Position,
      include: [Source, Message]
    }
  ],
  order: [[Position, 'id']]
};
