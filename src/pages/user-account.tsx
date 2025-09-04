import { CONFIG } from 'src/config-global';

import { UserAccountView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`User Account - ${CONFIG.appName}`}</title>

      <UserAccountView />
    </>
  );
}
