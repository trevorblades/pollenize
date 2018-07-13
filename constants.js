import {Position, Message, Source} from './models';

export const CANDIDATE_OPTIONS = {
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
