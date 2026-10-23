import type {Metadata} from 'next';
import ProductionAcceptance from '@/components/ProductionAcceptance';

export const metadata: Metadata = {
  title: 'Production Browser Acceptance',
  description: 'Interactive production browser acceptance checklist for LUXOR PHARAOH DAY.',
  robots: {index:false, follow:false},
};

export default function ProductionQA(){
  return <main className="wrap page"><ProductionAcceptance/></main>;
}
