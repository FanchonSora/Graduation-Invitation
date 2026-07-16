import type { MetadataRoute } from 'next'
import AppData from '~/package.json'
export default function manifest(): MetadataRoute.Manifest {
  return {
    display: 'standalone',
    icons: [
      {
        sizes: 'any',
        src: '/icon.jpg',
        type: 'image/jpeg',
      },
    ],
    name: 'Graduation Ceremony',
    description: AppData.description,
    start_url: '/',
    theme_color: '#181423',
  }
}
