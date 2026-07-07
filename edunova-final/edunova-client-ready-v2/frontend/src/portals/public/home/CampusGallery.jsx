import { Link } from 'react-router-dom'
import { ArrowRight, Image as ImageIcon } from 'lucide-react'
import { cmsApi } from '../../../api/cmsApi'
import { useFetch } from '../../../components/useFetch'
import FadeIn from '../../../components/FadeIn'

const fallbackImages = [
  { id: 'campus', image: '/Campus.jpeg', caption: 'EduNova Campus' },
  { id: 'building', image: '/building.jpeg', caption: 'School Building' },
  { id: 'exterior', image: '/exterior.jpeg', caption: 'Campus Exterior' },
  { id: 'students', image: '/fstudent.jpeg', caption: 'Students at EduNova' },
  { id: 'edunova', image: '/EduNova.jpeg', caption: 'EduNova Global Academy' },
  { id: 'campus-life', image: '/Campus.jpeg', caption: 'Campus Life' },
  { id: 'learning', image: '/fstudent.jpeg', caption: 'Digital Learning' },
  { id: 'infrastructure', image: '/building.jpeg', caption: 'Modern Infrastructure' },
]

// Explicit bento layout for exactly 8 tiles on a 4-col grid (3 rows, 12 cells
// total: one 2x2 + four 1x1 + one 2x1 + two 1x1 = 12 — no gaps, unlike the
// previous index-based col-span/row-span which left holes at the bottom-right).
const LAYOUT = [
  'md:col-span-2 md:row-span-2 aspect-square md:aspect-auto', // 0 — big feature, top-left
  'aspect-square',                                             // 1
  'aspect-square',                                             // 2
  'aspect-square',                                             // 3
  'aspect-square',                                             // 4
  'md:col-span-2 aspect-square md:aspect-[2/1]',                // 5 — wide banner, row 3
  'aspect-square',                                             // 6
  'aspect-square',                                             // 7
]

export default function CampusGallery() {
  const { data: albums, loading } = useFetch(cmsApi.getGalleryAlbums, [])

  const previewImages = (albums || [])
    .flatMap((album) => album.images || [])
    .slice(0, 8)

  const imagesToShow = previewImages.length > 0 ? previewImages : fallbackImages

  return (
    <section className="bg-white">
      <div className="section">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <FadeIn>
            <div>
              <p className="inline-flex items-center gap-2 font-subheading font-semibold text-accent uppercase text-sm mb-3 bg-accent/10 px-4 py-2 rounded-full">
                <ImageIcon size={15} /> Campus Gallery
              </p>

              <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-3">
                Explore Life at EduNova
              </h2>

              <p className="font-body text-text-secondary max-w-2xl leading-relaxed">
                A glimpse of our smart classrooms, modern infrastructure, student
                activities, digital learning spaces, and vibrant academy campus.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 font-subheading font-bold text-accent hover:text-primary transition-colors"
            >
              View All Gallery <ArrowRight size={18} />
            </Link>
          </FadeIn>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={`bg-gray-100 rounded-2xl animate-pulse ${LAYOUT[i]}`}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-3 gap-4">
            {imagesToShow.map((img, index) => (
              <FadeIn key={img.id || index} delay={index * 40} className={LAYOUT[index]}>
                <div className="group relative w-full h-full overflow-hidden rounded-2xl shadow-md border border-gray-100">
                  <img
                    src={img.image}
                    alt={img.caption || 'EduNova Campus Gallery'}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="font-subheading font-bold text-white text-sm md:text-base drop-shadow">
                      {img.caption || 'EduNova Campus'}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}