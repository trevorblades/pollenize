import map from 'lodash/map';
import {Election} from '../models';

export async function getOwnedElectionIds(user) {
  let organization;
  if (user) {
    organization = await user.getOrganization({
      include: {
        model: Election,
        attributes: ['id']
      }
    });
  }

  return organization ? map(organization.elections, 'id') : [];
}
