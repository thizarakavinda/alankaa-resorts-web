import { Check, X } from 'lucide-react';

const comparisonRows = [
  { label: 'Floor Area', values: ['75 sq m', '55 sq m', '50 sq m'] },
  { label: 'Jacuzzi', values: [true, true, false] },
  { label: 'Private Balcony', values: [true, true, false] },
  { label: 'Mountain View', values: [true, true, false] },
  { label: 'Garden View', values: [false, false, true] },
  { label: 'Views (Province)', values: ['5 Provs', 'Mountain', 'Garden'] },
  { label: 'Breakfast (BB)', values: [true, true, true] },
  { label: 'Lunch/Dinner', values: [true, true, true] },
  { label: 'AC & Fan', values: [true, true, true] },
  { label: 'Hot Water', values: [true, true, true] },
  { label: 'Availability', values: ['10 Suites', '6 Suites', '6 Suites'] },
];

const RoomsComparisonTable = () => {
  return (
    <section className="bg-[var(--clr-obsidian)] px-[24px] py-[60px] lg:px-[80px] lg:py-[110px]">
      <p className="font-['Jost'] text-[10px] text-[var(--clr-gold)] uppercase tracking-[0.4em] mb-2">COMPARE SUITES</p>
      <h2 className="font-['Cormorant'] text-[clamp(36px,4vw,56px)] text-[var(--clr-ivory)] font-light mb-12">
        Find your perfect suite.
      </h2>

      <div className="w-full overflow-x-auto" data-aos="fade-up" data-aos-delay="200" data-aos-once="true">
        <table className="w-full min-w-[800px] border-collapse border border-[rgba(184,150,90,0.1)] rounded-[2px] overflow-hidden">
          <thead>
            <tr className="bg-[var(--clr-charcoal)]">
              <th className="text-left font-['Jost'] text-[10px] text-[var(--clr-fog)] uppercase p-[20px_32px] font-normal w-[25%] sticky left-0 bg-[var(--clr-charcoal)] z-10">FEATURE</th>
              <th className="font-['Jost'] text-[10px] text-[var(--clr-gold)] uppercase p-[20px_32px] font-normal w-[25%] text-center">
                SUNRISE SUITE
                <p className="font-['DM_Sans'] text-[12px] text-[var(--clr-smoke)] mt-1 normal-case">US$230+</p>
              </th>
              <th className="font-['Jost'] text-[10px] text-[var(--clr-gold)] uppercase p-[20px_32px] font-normal w-[25%] text-center bg-[rgba(184,150,90,0.06)] border-l border-r border-[rgba(184,150,90,0.2)]">
                SUNSET SUITE
                <p className="font-['DM_Sans'] text-[12px] text-[var(--clr-smoke)] mt-1 normal-case">US$160+</p>
              </th>
              <th className="font-['Jost'] text-[10px] text-[var(--clr-gold)] uppercase p-[20px_32px] font-normal w-[25%] text-center">
                GARDEN SUITE
                <p className="font-['DM_Sans'] text-[12px] text-[var(--clr-smoke)] mt-1 normal-case">US$130+</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-[rgba(255,255,255,0.01)]' : 'bg-transparent'}>
                <td
                  className="p-[16px_32px] font-['DM_Sans'] text-[14px] text-[var(--clr-smoke)] border-b border-[rgba(255,255,255,0.04)] sticky left-0 z-10"
                  style={{ backgroundColor: 'var(--clr-obsidian)' }}
                >
                  {row.label}
                </td>
                <td className="p-[16px_32px] border-b border-[rgba(255,255,255,0.04)] text-center font-['DM_Sans'] text-[14px] text-[var(--clr-cream)]">
                  {typeof row.values[0] === 'boolean'
                    ? (row.values[0] ? <Check size={16} color="var(--clr-gold)" className="mx-auto" /> : <X size={16} color="var(--clr-fog)" opacity={0.4} className="mx-auto" />)
                    : row.values[0]}
                </td>
                <td className="p-[16px_32px] border-b border-[rgba(255,255,255,0.04)] text-center font-['DM_Sans'] text-[14px] text-[var(--clr-cream)] bg-[rgba(184,150,90,0.06)] border-l border-r border-[rgba(184,150,90,0.2)]">
                  {typeof row.values[1] === 'boolean'
                    ? (row.values[1] ? <Check size={16} color="var(--clr-gold)" className="mx-auto" /> : <X size={16} color="var(--clr-fog)" opacity={0.4} className="mx-auto" />)
                    : row.values[1]}
                </td>
                <td className="p-[16px_32px] border-b border-[rgba(255,255,255,0.04)] text-center font-['DM_Sans'] text-[14px] text-[var(--clr-cream)]">
                  {typeof row.values[2] === 'boolean'
                    ? (row.values[2] ? <Check size={16} color="var(--clr-gold)" className="mx-auto" /> : <X size={16} color="var(--clr-fog)" opacity={0.4} className="mx-auto" />)
                    : row.values[2]}
                </td>
              </tr>
            ))}
            <tr className="bg-[var(--clr-charcoal)] border-t border-[rgba(184,150,90,0.2)]">
              <td className="p-[20px_32px] font-['DM_Sans'] font-medium text-[14px] text-[var(--clr-cream)] sticky left-0 bg-[var(--clr-charcoal)] z-10">Starting From</td>
              <td className="p-[20px_32px] text-center">
                <p className="font-['Cormorant'] text-[28px] text-[var(--clr-gold)] leading-none">US$230+</p>
                <p className="font-['DM_Sans'] text-[11px] text-[var(--clr-fog)] mb-4">+taxes</p>
                <button className="bg-[var(--clr-gold)] text-[var(--clr-void)] font-['Jost'] text-[10px] uppercase px-[20px] py-[8px] hover:bg-[var(--clr-gold-light)] transition-colors">Book Now</button>
              </td>
              <td className="p-[20px_32px] text-center bg-[rgba(184,150,90,0.06)] border-l border-r border-[rgba(184,150,90,0.2)]">
                <p className="font-['Cormorant'] text-[28px] text-[var(--clr-gold)] leading-none">US$160+</p>
                <p className="font-['DM_Sans'] text-[11px] text-[var(--clr-fog)] mb-4">+taxes</p>
                <button className="bg-[var(--clr-gold)] text-[var(--clr-void)] font-['Jost'] text-[10px] uppercase px-[20px] py-[8px] hover:bg-[var(--clr-gold-light)] transition-colors">Book Now</button>
              </td>
              <td className="p-[20px_32px] text-center">
                <p className="font-['Cormorant'] text-[28px] text-[var(--clr-gold)] leading-none">US$130+</p>
                <p className="font-['DM_Sans'] text-[11px] text-[var(--clr-fog)] mb-4">+taxes</p>
                <button className="bg-[var(--clr-gold)] text-[var(--clr-void)] font-['Jost'] text-[10px] uppercase px-[20px] py-[8px] hover:bg-[var(--clr-gold-light)] transition-colors">Book Now</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default RoomsComparisonTable;