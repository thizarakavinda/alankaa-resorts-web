type GalleryFilterProps = {
  categories: string[];
  activeTab: string;
  onChange: (category: string) => void;
  totalImages: number;
};

const GalleryFilter = ({ categories, activeTab, onChange, totalImages }: GalleryFilterProps) => {

  return (
    <section className="bg-obsidian px-6 py-6 md:px-20 md:py-8 sticky top-[72px] z-50 border-b border-[rgba(255,255,255,0.02)] shadow-sm">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        {/* pills btns */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 md:gap-3 w-full">
          {categories.map((cat) => {
            const isActive = activeTab === cat;
            return (
              <button
                key={cat}
                onClick={() => onChange(cat)}
                className={`px-5 py-2 rounded-full font-dmSans text-[13px] duration-300 transition-colors border ${isActive
                    ? 'bg-gold border-gold text-void'
                    : 'bg-transparent border-[rgba(184,150,90,0.2)] text-smoke hover:border-gold hover:text-gold'
                  }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* right info */}
        <div className="flex-shrink-0">
          <span className="font-jost text-[11px] text-fog uppercase tracking-[0.1em]">
            {totalImages} images
          </span>
        </div>

      </div>
    </section>
  );
};

export default GalleryFilter;
