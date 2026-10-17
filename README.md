# YouTube Clone Web Application 🎥

A pixel-perfect, responsive YouTube clone built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS**.

---

## 🌟 Key Features

### 1. 🎬 Watch Page & Custom Video Player
- Custom HTML5 Video Player with video streaming from high-speed Google Cloud public sample storage.
- Interactive playback controls: Play/Pause, Seek Bar with progress gradient, +10s / -10s skip, Volume slider with mute toggle.
- Keyboard shortcuts:
  - `Space` or `k`: Play / Pause
  - `f`: Fullscreen toggle
  - `m`: Mute / Unmute
  - `Left / Right Arrow`: Seek 5s backward / forward
- Speed selector (0.5x, 0.75x, 1x Normal, 1.25x, 1.5x, 2x) & Picture-in-Picture (PiP).
- Autoplay next video on completion.

### 2. ⚡ YouTube Shorts Experience
- Dedicated vertical 9:16 Shorts feed with smooth scrolling & looping.
- Floating action column: Like, Dislike, Comments counter, Share modal, and rotating audio disc.
- Keyboard arrow up/down navigation between Shorts.

### 3. 💬 Interactive Comments & Community
- Add comments in real-time with automatic timestamps.
- Like/Unlike individual comments with reactive counts.
- LocalStorage persistence for user comments.

### 4. 🧭 Search & Discovery
- Header search bar with trending suggestion popover and clear button.
- Voice Search mock with real animated listening state.
- Category pills filter bar with smooth horizontal scrolling.
- Full filter engine matching video titles, categories, channels, and tags.

### 5. 🎨 YouTube Dark / Light Theme
- Authentic YouTube Dark Mode (`#0f0f0f`) and Light Mode (`#ffffff`) toggle.
- Preserved across sessions in LocalStorage.

### 6. 📤 Video Creator / Upload Studio
- Click "+ Create" to upload and publish custom videos directly into the home feed.
- Support for custom titles, descriptions, categories, thumbnail URLs, and video URLs (with quick presets).

### 7. 📚 Library & Personal Features
- **Watch History**: Tracks watched videos with "Clear all watch history" button.
- **Liked Videos**: Dedicated playlist with quick "Play all".
- **Watch Later**: Save videos with 1-click bookmarks.
- **Subscriptions**: Follow and manage subscribed creators with active indicators.

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run the development server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for production
```bash
npm run build
```

---

## 🛠 Tech Stack
- **Framework:** React 19 + TypeScript
- **Bundler:** Vite 8
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Icons:** Lucide React
- **Video Storage:** Google Cloud Storage GTV public samples
