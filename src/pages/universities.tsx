import { CONFIG } from 'src/config-global';

import { UniversitiesView } from 'src/sections/universities/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Universities - ${CONFIG.appName}`}</title>

      <UniversitiesView />
    </>
  );
}
