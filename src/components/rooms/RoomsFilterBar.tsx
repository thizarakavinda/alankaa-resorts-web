import { motion } from 'framer-motion';

interface RoomsFilterBarProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  availableCount: number;
}

const filters = [
  { id: 'all', label: 'All Suites' },
  { id: 'sunrise', label: 'Sunrise Suite' },
  { id: 'sunset', label: 'Sunset Suite' },
  { id: 'garden', label: 'Garden Suite' },
];

const RoomsFilterBar = ({ activeFilter, setActiveFilter, availableCount }: RoomsFilterBarProps) => {
  return (
    <section className="sticky top-[72px] z-[100] bg-[rgba(8,8,8,0.95)] backdrop-blur-[10px] px-[80px] py-[20px] border-b border-[rgba(184,150,90,0.12)] flex justify-between items-center flex-wrap gap-4">
      <div className="flex gap-[12px] flex-wrap">
        {filters.map(filter => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`relative font-['Jost'] text-[11px] uppercase tracking-[0.12em] px-[24px] py-[8px] rounded-[2px] transition-colors duration-300 ${
              activeFilter === filter.id
                ? 'bg-[var(--clr-gold)] text-[var(--clr-void)]'
                : 'bg-transparent border border-[rgba(184,150,90,0.25)] text-[var(--clr-smoke)] hover:border-[var(--clr-gold)] hover:text-[var(--clr-gold)]'
            }`}
          >
            {activeFilter === filter.id && (
              <motion.div
                layoutId="activeFilterIndicator"
                className="absolute inset-0 bg-[var(--clr-gold)] -z-10 rounded-[2px]"
              />
            )}
            {filter.label}
          </button>
        ))}
      </div>

      <div>
        <p className="font-['Jost'] text-[10px] text-[var(--clr-fog)] uppercase tracking-[0.2em]">
          {availableCount} SUITES AVAILABLE
        </p>
      </div>
    </section>
  );
};

export default RoomsFilterBar;