import { CONFIG } from 'src/config-global';

import { CitiesView } from 'src/sections/cities/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Cities - ${CONFIG.appName}`}</title>

      <CitiesView />
    </>
  );
}
