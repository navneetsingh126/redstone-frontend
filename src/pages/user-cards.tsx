import { CONFIG } from 'src/config-global';

import { UserCardsView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`User Cards - ${CONFIG.appName}`}</title>

      <UserCardsView />
    </>
  );
}
