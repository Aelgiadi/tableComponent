// @flow

import apiFetch, { addSessionAuthorization } from '/apifetch';

export default async function savePins(
  pref: string,
  pins: string[],
): Promise<mixed> {
  const request = addSessionAuthorization({
    url: '/prefs/' + pref,
    method: 'post',
    params: { pref_value: pins },
  });
  await apiFetch(request);
}
