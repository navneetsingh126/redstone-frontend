import { CONFIG } from 'src/config-global';

import { UserProfileView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`User Profile - ${CONFIG.appName}`}</title>

      <UserProfileView />
    </>
  );
}
