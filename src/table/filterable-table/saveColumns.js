// @flow

import apiFetch, { addSessionAuthorization } from '/apifetch';

export default async function saveColumns(
  pref: string,
  columns: string[],
): Promise<mixed> {
  const request = addSessionAuthorization({
    url: '/prefs/' + pref,
    method: 'post',
    params: { pref_value: columns },
  });
  await apiFetch(request);
}
