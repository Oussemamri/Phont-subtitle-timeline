# Phont Subtitle Timeline

A Next.js application for displaying and manipulating subtitles with an interactive timeline interface. This project provides an easy way to visualize, edit, and control subtitle display in video content.

## 🚀 Features

- **Interactive Timeline**: Visual representation of subtitle timing
- **Real-time Subtitle Display**: See subtitles as they would appear in video
- **Animation Controls**: Play, pause, and control subtitle animation
- **Responsive Design**: Works on various screen sizes and devices

## 📋 Prerequisites

- Node.js 14.x or higher
- npm, yarn, pnpm, or bun package manager

## 🔧 Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/phont-subtitle-timeline.git
cd phont-subtitle-timeline
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

## 🏃‍♂️ Getting Started

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 💻 Usage Guide

### Basic Usage

1. The application loads with a default set of subtitles
2. The timeline at the bottom shows the subtitle segments
3. Use the controls to play/pause the subtitle animation
4. Click on specific parts of the timeline to jump to different subtitles

### Advanced Features

- **Hover Interaction**: Hover over timeline segments to preview subtitles
- **Keyboard Controls**: Use arrow keys for navigation between subtitles

## 🧩 Components

The project consists of several key components:

### SubtitleTimeline

The main timeline component that visualizes subtitle timing. It displays subtitle segments as blocks on a horizontal timeline.

```tsx
<SubtitleTimeline 
  subtitles={subtitlesArray} 
  currentTime={timeInSeconds}
  onTimeChange={handleTimeChange} 
/>
```

### SubtitleDisplay

Displays the current subtitle text with proper formatting and animations.

```tsx
<SubtitleDisplay 
  subtitles={subtitlesArray}
  currentTime={timeInSeconds}
  animate={isAnimating} 
/>
```

### TimelineControls

Provides playback controls for the subtitle animation.

```tsx
<TimelineControls 
  isPlaying={isPlaying}
  onPlayPause={togglePlayPause}
  onReset={resetTimeline}
/>
```

## 🔧 Configuration

Custom subtitle data can be provided in the following format:

```typescript
interface Subtitle {
  id: number;
  startTime: number;  // in seconds
  endTime: number;    // in seconds
  text: string;
}
```

## 🛠️ Technologies Used

- **Next.js**: React framework for the application
- **React**: UI library
- **TypeScript**: Type-safe JavaScript
- **CSS Modules**: For component styling
- **Geist Font**: Modern typography from Vercel

## 🧪 Running Tests

```bash
npm test
# or
yarn test
# or
pnpm test
# or
bun test
```

## 🔄 Deployment

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Other Deployment Options

- **Docker**: Container configuration is available in the project
- **Static Export**: Use `next export` for static site deployment
- **Custom Server**: Instructions for deploying to your own Node.js server

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## Check quality
run lint
npm run lint
## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Acknowledgements

- Next.js team for the amazing framework
- Vercel for Geist font and deployment platform
- All contributors who have helped shape this project
