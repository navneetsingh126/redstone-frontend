import { CONFIG } from 'src/config-global';

import { StudyDestinationsView } from 'src/sections/study-destinations/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Study Destinations - ${CONFIG.appName}`}</title>

      <StudyDestinationsView />
    </>
  );
}
