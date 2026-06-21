# YouTube Watch Page - Complete Responsive Component

A fully responsive YouTube-like video watching interface built with React, TypeScript, and TailwindCSS.

## 📁 Component Structure

```
youtube/
├── YouTubeWatch.tsx       # Main container component
├── VideoPlayer.tsx        # Video player with controls
├── VideoDetails.tsx       # Video title, stats, channel info
├── CommentsSection.tsx    # Comments with interaction
├── RecommendedVideos.tsx  # Sidebar with recommended videos
└── index.ts              # Barrel export
```

## 🚀 Quick Start

### Basic Usage

```tsx
import { YouTubeWatch } from '@/components/youtube';

export default function WatchPage() {
  return <YouTubeWatch />;
}
```

### With Router Integration

```tsx
// In your router configuration
{
  path: '/watch/:videoId',
  component: () => import('@/components/youtube').then(m => ({ default: m.YouTubeWatch }))
}
```

## 📱 Responsive Design

The component is fully responsive with breakpoints:
- **Mobile** (< 768px): Full width layout, stacked comments and recommendations
- **Tablet** (768px - 1024px): Video with sidebar on larger screens
- **Desktop** (> 1024px): Full featured layout with sidebar navigation

## 🎨 Features

### ✅ Video Player
- Play/Pause controls
- Progress bar with hover preview
- Timeline scrubbing
- Volume control
- Fullscreen button
- Settings menu

### ✅ Video Details
- Title, view count, upload date
- Like/Dislike functionality
- Share button
- Channel information with avatar
- Subscribe button with notification bell
- Video description with "Show more"
- Video tags

### ✅ Comments Section
- Add comment functionality
- Like/Dislike comments
- Reply tracking
- Comment sorting (Top comments)
- Load more comments button
- User avatars with initials

### ✅ Recommended Videos
- Thumbnail with duration badge
- Video metadata (views, upload time)
- Hover effects
- Mobile-optimized layout

### ✅ Navigation
- Sticky top navigation bar
- Sidebar toggle (mobile/tablet)
- Search bar
- Notifications
- User avatar menu

## 🎯 Customization

### Change Logo/Channel Name

In `YouTubeWatch.tsx`:
```tsx
<h1 className="text-2xl font-bold text-red-600">VidTube</h1>
```
Replace `VidTube` with your channel/app name, or add an image logo:
```tsx
<img src="/your-logo.svg" alt="Logo" className="h-8 w-auto" />
```

### Customize Colors

The component uses TailwindCSS colors. Key colors used:
- **Primary Red**: For YouTube branding (`text-red-600`, `bg-red-600`)
- **Dark Mode**: `dark:bg-neutral-950`, `dark:text-white`

Modify any color classes to match your brand:
```tsx
// Change like button color
<ThumbsUp className="w-5 h-5 text-blue-600" />
```

### Connect Real Data

Update component props to accept real data:

```tsx
interface YouTubeWatchProps {
  videoId: string;
  video: {
    title: string;
    viewCount: number;
    likeCount: number;
    // ... other fields
  };
}

export default function YouTubeWatch({ video }: YouTubeWatchProps) {
  // Use props instead of hardcoded values
}
```

### Add Video Player Library

Replace the mock video player with a real player (HLS.js, Plyr, or similar):

```tsx
// In VideoPlayer.tsx
import HLS from 'hls.js';

useEffect(() => {
  const video = document.getElementById('video-element');
  const hls = new HLS();
  hls.loadSource(videoUrl);
  hls.attachMedia(video);
}, [videoUrl]);
```

## 🎭 Dark Mode

The component includes full dark mode support using Tailwind's `dark:` prefix. Enable it globally in your app:

```tsx
<div className="dark">
  <YouTubeWatch />
</div>
```

## 📦 Dependencies

All dependencies are already in your `package.json`:
- `react` - UI library
- `react-dom` - DOM rendering
- `tailwindcss` - Styling
- `lucide-react` - Icons
- `typescript` - Type safety

## 🔧 State Management

The component uses React hooks for local state:
- `useState` - Sidebar toggle, play/pause, like/dislike
- Can integrate with Zustand for global state (already installed)

Example with Zustand:
```tsx
import { create } from 'zustand';

const useVideoStore = create((set) => ({
  isPlaying: false,
  setIsPlaying: (playing) => set({ isPlaying: playing }),
}));
```

## 📊 Performance Tips

1. **Lazy Load Recommended Videos**: Implement infinite scroll
2. **Memoize Components**: Use `React.memo()` for comments list
3. **Optimize Images**: Use next-gen formats with proper lazy loading
4. **Code Splitting**: Load comments/recommendations on demand

```tsx
const CommentsSection = React.lazy(() => import('./CommentsSection'));

<Suspense fallback={<div>Loading...</div>}>
  <CommentsSection />
</Suspense>
```

## 🎬 Testing

```tsx
import { render, screen } from '@testing-library/react';
import { YouTubeWatch } from '@/components/youtube';

describe('YouTubeWatch', () => {
  it('renders video player', () => {
    render(<YouTubeWatch />);
    expect(screen.getByText(/How to Build/i)).toBeInTheDocument();
  });
});
```

## 📝 Next Steps

1. ✅ Component structure created
2. 🔄 Connect to real API/database for video data
3. 🎥 Integrate real video player (HLS.js, Plyr, Video.js)
4. 💬 Connect comments to backend
5. 🔔 Implement real notifications
6. 🎨 Customize branding and colors
7. 📱 Add PWA support for mobile
8. 🧪 Add comprehensive testing

## 📄 License

Built for your project - feel free to customize and extend!
