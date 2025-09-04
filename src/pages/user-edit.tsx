import { CONFIG } from 'src/config-global';

import { UserEditView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Edit User - ${CONFIG.appName}`}</title>

      <UserEditView />
    </>
  );
}
