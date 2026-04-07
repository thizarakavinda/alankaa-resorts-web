import { AnimatePresence } from 'framer-motion';
import SuiteCard from './SuiteCard';
import { suites } from '../../data/roomsData';

interface SuitesListProps {
  activeFilter: string;
}

const SuitesList = ({ activeFilter }: SuitesListProps) => {
  const filteredSuites = suites.filter(suite => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'sunrise') return suite.id === 1;
    if (activeFilter === 'sunset') return suite.id === 2;
    if (activeFilter === 'garden') return suite.id === 3;
    return true;
  });

  return (
    <section className="bg-[var(--clr-void)]">
      <AnimatePresence>
        {filteredSuites.map((suite) => (
          <SuiteCard key={suite.id} suite={suite} />
        ))}
      </AnimatePresence>
    </section>
  );
};

export default SuitesList;