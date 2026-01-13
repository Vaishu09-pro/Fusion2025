import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CircuitBackground from '@/components/CircuitBackground';
import { BaseCrudService } from '@/integrations';
import { EventGallery } from '@/entities';
import { Image } from '@/components/ui/image';
import { Camera } from 'lucide-react';

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<EventGallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<EventGallery | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { items } = await BaseCrudService.getAll<EventGallery>('eventgallery');
        if (items && items.length > 0) {
          const sortedItems = items.sort((a, b) => {
            const orderA = a.displayOrder ?? 999;
            const orderB = b.displayOrder ?? 999;
            return orderA - orderB;
          });
          setGalleryItems(sortedItems);
        }
      } catch (error) {
        console.error('Error fetching gallery:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CircuitBackground />
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-8">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-7xl font-bold text-primary mb-6 font-heading">
              EVENT GALLERY
            </h1>
            <p className="text-xl text-foreground font-paragraph max-w-3xl mx-auto">
              Relive the moments from our incredible 24-hour hackathon. From intense coding sessions
              to triumphant celebrations, these images capture the spirit of innovation and
              collaboration.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="relative z-10 max-w-[120rem] mx-auto px-8 pb-24">
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
            />
          </div>
        ) : galleryItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <Camera className="w-24 h-24 text-primary/50 mx-auto mb-6" />
            <p className="text-2xl text-foreground font-paragraph">
              Gallery coming soon! Check back later for event photos.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item, index) => {
              const delay = index * 0.1;
              const isEven = index % 2 === 0;
              const offsetY = isEven ? 0 : 20;

              return (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 30 + offsetY }}
                  whileInView={{ opacity: 1, y: offsetY }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay }}
                  whileHover={{ scale: 1.05, y: offsetY - 10 }}
                  className="relative group cursor-pointer"
                  onClick={() => setSelectedImage(item)}
                  style={{ marginTop: `${offsetY}px` }}
                >
                  <div className="relative overflow-hidden border-2 border-primary/30 group-hover:border-primary transition-all">
                    {item.galleryImage && (
                      <Image
                        src={item.galleryImage}
                        alt={item.altText || item.caption || 'Event photo'}
                        className="w-full h-80 object-cover"
                      />
                    )}
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        {item.caption && (
                          <p className="text-lg font-bold text-primary mb-2 font-heading">
                            {item.caption}
                          </p>
                        )}
                        <div className="flex justify-between items-center text-sm text-foreground font-paragraph">
                          {item.photographer && (
                            <span>📷 {item.photographer}</span>
                          )}
                          {item.dateTaken && (
                            <span>
                              {new Date(item.dateTaken).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center p-8"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative max-w-6xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-foreground hover:text-primary text-4xl font-bold transition-colors"
            >
              ×
            </button>
            
            {selectedImage.galleryImage && (
              <Image
                src={selectedImage.galleryImage}
                alt={selectedImage.altText || selectedImage.caption || 'Event photo'}
                className="w-full max-h-[80vh] object-contain border-2 border-primary"
              />
            )}
            
            <div className="mt-6 bg-background/50 backdrop-blur-sm border-2 border-primary/30 p-6">
              {selectedImage.caption && (
                <h3 className="text-2xl font-bold text-primary mb-3 font-heading">
                  {selectedImage.caption}
                </h3>
              )}
              <div className="flex justify-between items-center text-foreground font-paragraph">
                {selectedImage.photographer && (
                  <span className="text-lg">📷 Photographer: {selectedImage.photographer}</span>
                )}
                {selectedImage.dateTaken && (
                  <span className="text-lg">
                    {new Date(selectedImage.dateTaken).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      <Footer />
    </div>
  );
}
