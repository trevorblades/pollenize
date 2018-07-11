import {Position, Message, Source} from './models';

export const candidateOptions = {
  include: [
    'parties',
    'bios',
    'captions',
    {
      model: Position,
      include: [Source, Message]
    }
  ],
  order: [[Position, 'id']]
};
