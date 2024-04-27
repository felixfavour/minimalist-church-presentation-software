export const slideTypes = {
  song: 'song',
  hymn: 'hymn',
  bible: 'bible',
  text: 'text',
  media: 'media',
  sermon: 'sermon',
  carousel: 'carousel',
}

export const libraryTypes = {
  song: 'song',
  slide: 'slide',
}

export const quickActionsArr = [
  {
    icon: "i-bx-bible",
    name: "Display Bible",
    desc: "Select and open scriptures",
    action: "new-bible",
    // meta: bibleBooks.toString(),
    meta: "",
    bibleBookIndex: 1,
    type: slideTypes.bible,
  },
  {
    icon: "i-bx-search",
    name: "Search Bible",
    desc: "Find scriptures with familiar words",
    action: "new-search-bible",
    meta: "",
    unreleased: false,
    type: slideTypes.bible,
  },
  {
    icon: "i-bx-church",
    name: "Display Hymns",
    desc: "Find verses and chorus to all hymns",
    action: "new-hymn",
    meta: "",
    type: slideTypes.hymn,
  },
  {
    icon: "i-bx-music",
    name: "Display Song Lyrics",
    desc: "Find lyrics to any song, native too",
    action: "new-song",
    meta: "",
    type: slideTypes.song,
  },
  {
    icon: "i-bx-text",
    name: "Create Text Slide",
    desc: "Create slides with notes and more",
    action: "new-slide",
    meta: "",
    type: slideTypes.text,
  },
  {
    icon: "i-bx-image",
    name: "Add Media",
    desc: "Display video or image media",
    action: "new-media",
    meta: "",
    type: slideTypes.media,
    // type: slideTypes.text
  },
  {
    icon: "i-bx-save",
    name: "Add to Library",
    desc: "Save your favorite songs, slides",
    action: "new-library",
    meta: "save files images pictures videos songs documents",
    type: slideTypes.media,
    // type: slideTypes.text
  },
  {
    icon: "i-carbon-overlay",
    name: "Add Overlay",
    desc: "Place one-third of a slide over another",
    action: "new-overlay",
    meta: "",
    unreleased: true,
    // type: slideTypes.text
  },
  {
    icon: "i-ph-file-ppt",
    name: "Import Slides",
    desc: "Extract from other apps like PowerPoint",
    action: "new-transcribe",
    meta: "power point Google slides",
    unreleased: true,
    // type: slideTypes.text
  },
  {
    icon: "i-bx-carousel",
    name: "Add Slideshow/Carousel",
    desc: "Find scriptures with familiar words",
    action: "new-carousel",
    meta: "",
    unreleased: true,
    type: slideTypes.text,
  },
  {
    icon: "i-material-symbols-speech-to-text",
    name: "Transcribe Sermon",
    desc: "Start transcribing preacher sermons",
    action: "new-transcribe",
    meta: "",
    unreleased: true,
    // type: slideTypes.text
  },
  {
    icon: "i-bx-time",
    name: "Add Countdown Timer",
    desc: "Find scriptures with familiar words",
    action: "new-timer",
    meta: "",
    unreleased: true,
    type: slideTypes.text,
  },
]

export const slideLayoutTypes = {
  heading_sub: 'heading-and-subtitle',
  full_text: 'full-text',
  two_column: 'two-column',
  bible: 'bible',
}

export const backgroundTypes = {
  solid: 'solid',
  gradient: 'gradient',
  image: 'image',
  video: 'video'
}

export const backgroundFillTypes = {
  fit: 'Fit',
  crop: 'Crop',
  stretch: 'Stretch',
  center: 'Center',
}

export const bibleBooks = [
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy",
  "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel",
  "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra",
  "Nehemiah", "Esther", "Job", "Psalms", "Proverbs",
  "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah",
  "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel",
  "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk",
  "Zephaniah", "Haggai", "Zechariah", "Malachi",
  "Matthew", "Mark", "Luke", "John", "Acts of the Apostles",
  "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians",
  "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy",
  "2 Timothy", "Titus", "Philemon", "Hebrews", "James",
  "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude",
  "Revelation"
];

export const bibleVersions = [
  'KJV',
  // 'NKJV', 
  // 'NIV', 
  // 'AMP'
]

export const appFonts = [
  'Inter',
  'Roboto',
  'Raleway',
  'Bebas Neue',
  'Overpass',
  'Playfair Display',
  'Sedan',
  'Montserrat',
  'Jersey 25',
  'Nunito',
  'IBM Plex Sans',
  'Jost',
  'EB Garamond',
  'Dancing Script',
  'Slabo',
  'IBM Plex Serif',
  'Great Vibes',
  'Playball',
  'Saira Extra Condensed',
  'Lato'
]
