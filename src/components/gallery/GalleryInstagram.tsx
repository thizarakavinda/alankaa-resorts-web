import { Heart } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';

const instaPosts = [
  { id: 1, src: "https://images.unsplash.com/photo-1542314831-c6a4d27d66f6?auto=format&fit=crop&q=80", likes: "1.2k" },
  { id: 2, src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80", likes: "842" },
  { id: 3, src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80", likes: "2.1k" },
  { id: 4, src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80", likes: "956" },
  { id: 5, src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80", likes: "3.4k" },
  { id: 6, src: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80", likes: "1.8k" },
];

const GalleryInstagram = () => {
  return (
    <section className="bg-void px-6 py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto">

        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="font-cormorant text-3xl md:text-4xl text-ivory mb-2">Follow Our Journey</h2>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="block font-dmSans text-[14px] text-gold hover:text-mist transition-colors duration-300">
            @alankaa_resorts
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-4 mb-16">
          {instaPosts.map((post, i) => (
            <motion.a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative aspect-square w-full bg-charcoal overflow-hidden group rounded-[2px]"
            >
              <img
                src={post.src}
                alt="Instagram post"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-[rgba(184,150,90,0.8)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-void">
                <FaInstagram className="w-8 h-8 mb-3" />
                <div className="flex items-center gap-2 font-dmSans text-[13px] font-medium">
                  <Heart className="w-4 h-4" fill="currentColor" strokeWidth={0} /> {post.likes}
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="text-center">
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <button className="px-10 py-4 border border-[rgba(184,150,90,0.6)] text-gold font-dmSans text-[12px] uppercase tracking-widest hover:bg-gold hover:text-void transition-colors duration-300">
              Follow on Instagram
            </button>
          </a>
        </div>

      </div>
    </section>
  );
};

export default GalleryInstagram;
