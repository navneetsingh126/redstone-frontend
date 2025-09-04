import { useParams } from 'react-router-dom';

import { CONFIG } from 'src/config-global';

import { UniversityDetail } from 'src/sections/universities/university-detail';

export default function Page() {
  const { universityId } = useParams<{ universityId: string }>();

  return (
    <>
      <title>{`University Details - ${CONFIG.appName}`}</title>
      <UniversityDetail universityId={universityId || '1'} />
    </>
  );
}
