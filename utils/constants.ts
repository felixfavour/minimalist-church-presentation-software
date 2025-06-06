import { BibleVersion, QuickAction } from "~/types"

export const slideTypes = {
  song: 'song',
  hymn: 'hymn',
  bible: 'bible',
  text: 'text',
  media: 'media',
  countdown: 'countdown',
  // sermon: 'sermon',
  // carousel: 'carousel',
}

export const libraryTypes = {
  song: 'song',
  slide: 'slide',
}

export const appWideActions = {
  liveTransfer: 'live-transfer',
  newBible: 'new-bible',
  newHymn: 'new-hymn',
  newSong: 'new-song',
  newSlide: 'new-slide',
  newMedia: 'new-media',
  newLibrary: 'new-library',
  newAlert: 'new-alert',
  addSong: 'add-song',
  removeAlert: 'remove-alert',
  newCountdown: 'new-countdown',
  newSearchBible: 'new-search-bible',
  goLive: 'go-live',
  openSettings: 'open-settings',
  newActiveSlide: 'new-active-slide',
  deleteSlide: 'delete-slide',
  showChangelog: 'show-changelog',
  refreshSlides: 'refresh-slides',
  startCountdown: 'start-countdown',
  restartCountdown: 'restart-countdown',
  stopCountdown: 'stop-countdown',
  mediaSeek: 'media-seek',
  appLoading: 'app-loading',
  gotoVerse: 'goto-verse',
  deleteScheduleSlides: 'delete-schedule-slides',
  selectedSchedule: 'selected-schedule',
  openScheduleModal: 'open-schedule-modal',
  toggleDarkMode: 'toggle-dark-mode',
  joinCommunity: 'join-community',
  openInviteModal: 'open-invite-modal',
  liveSlideIdTransfer: 'live-slide-id-transfer',
  liveActiveSlidesTransfer: 'live-active-slides-transfer',
  liveSettingsTransfer: 'live-settings-transfer',
  quickActionsFocus: 'quick-actions-focus',
  uploadOfflineSlides: 'upload-offline-slides',
  batchUpdateSlides: 'batch-update-slides',
  openShortcutsModal: 'open-shortcuts'
}

export const quickActionsArr: QuickAction[] = [
  {
    icon: "i-bx-bible",
    name: "Display Bible",
    desc: "Select and open scriptures",
    action: appWideActions.newBible,
    // meta: bibleBooks.toString(),
    meta: "",
    bibleBookIndex: "1",
    type: slideTypes.bible,
  },
  {
    icon: "i-bx-church",
    name: "Display Hymns",
    desc: "Find verses and chorus to all hymns",
    action: appWideActions.newHymn,
    meta: "",
    type: slideTypes.hymn,
  },
  {
    icon: "i-bx-music",
    name: "Display Song Lyrics",
    desc: "Find lyrics to any song, native too",
    action: appWideActions.newSong,
    meta: "",
    type: slideTypes.song,
  },
  {
    icon: "i-bx-text",
    name: "Create Text Slide",
    desc: "Create slides with notes and more",
    action: appWideActions.newSlide,
    meta: "",
    type: slideTypes.text,
  },
  {
    icon: "i-bx-image",
    name: "Add Media",
    desc: "Display image, video or audio media",
    action: appWideActions.newMedia,
    meta: "",
    type: slideTypes.media,
    // type: slideTypes.text
  },
  {
    icon: "i-bx-library",
    name: "My Library",
    desc: "Save your favorite songs, slides",
    action: appWideActions.newLibrary,
    meta: "save files images pictures videos songs documents",
    type: slideTypes.media,
    // type: slideTypes.text
  },
  {
    icon: "i-bx-bell",
    name: "Add Banners/Alert",
    desc: "Notify your audience without disruption",
    action: appWideActions.newAlert,
    meta: "",
    // unreleased: true,
    // type: slideTypes.text
  },
  {
    icon: "i-lucide-music-2",
    name: "Add Song",
    desc: "Save songs to your personal library",
    action: appWideActions.addSong,
    meta: "",
    // unreleased: true,
    // type: slideTypes.text
  },
  {
    icon: "i-bx-trash",
    name: "Remove Alert",
    desc: "Remove current alert",
    action: appWideActions.removeAlert,
    searchableOnly: true,
    meta: "trash alert remove banner",
    // unreleased: true,
    // type: slideTypes.text
  },
  {
    icon: "i-bx-time",
    name: "Add Countdown Timer",
    desc: "Engage your church with countdown",
    action: appWideActions.newCountdown,
    meta: "",
    type: slideTypes.countdown,
    // unreleased: true,
  },
  {
    icon: "i-bx-search",
    name: "Search Whole Bible",
    desc: "Find scriptures with familiar words",
    action: appWideActions.newSearchBible,
    meta: "",
    unreleased: false,
    type: slideTypes.bible,
  },
  {
    icon: "i-bx-cog",
    name: "Open App Settings",
    desc: "Customize account, profile, slide, bible settings",
    action: appWideActions.openSettings,
    meta: "app payment bible slide profile settings",
    // unreleased: true,
    // type: slideTypes.text
  },
  {
    icon: "i-bx-calendar-plus",
    name: "Create New Schedule",
    desc: "Start a whole new service project",
    action: appWideActions.openScheduleModal,
    meta: "new schedule service fresh start",
    // unreleased: true,
    // type: slideTypes.text
  },
  {
    icon: "i-bx-moon",
    name: "Toggle Dark Mode",
    desc: "Switch between light and dark theme",
    action: appWideActions.toggleDarkMode,
    meta: "toggle dark light mode app settings theme",
    searchableOnly: true,
    // unreleased: true,
    // type: slideTypes.text
  },
  {
    icon: "i-bx-user-plus",
    name: "Invite to Workspace",
    desc: "Invite teammates to your workspace",
    action: appWideActions.openInviteModal,
    meta: "teammates share link invite workspace",
    searchableOnly: true,
    // unreleased: true,
    // type: slideTypes.text
  },
  {
    icon: "i-bxs-keyboard",
    name: "Shortcuts & Hotkeys",
    desc: "Open shortcuts and hotkeys modal",
    action: appWideActions.openShortcutsModal,
    meta: "shortcut Cmd Ctrl hotkey keyboard mouse",
    searchableOnly: true,
    // unreleased: true,
    // type: slideTypes.text
  },
  {
    icon: "i-ph-file-ppt",
    name: "Import Slides",
    desc: "Extract from other apps like PowerPoint",
    action: "new-ppt",
    meta: "power point Google slides",
    // unreleased: true,
    // type: slideTypes.text
  },
  // {
  //   icon: "i-bx-carousel",
  //   name: "Add Slideshow/Carousel",
  //   desc: "Find scriptures with familiar words",
  //   action: "new-carousel",
  //   meta: "",
  //   unreleased: true,
  //   type: slideTypes.text,
  // },
  // {
  //   icon: "i-material-symbols-speech-to-text",
  //   name: "Transcribe Sermon",
  //   desc: "Start transcribing preacher sermons",
  //   action: "new-transcribe",
  //   meta: "",
  //   unreleased: true,
  //   // type: slideTypes.text
  // },
  // {
  //   icon: "i-carbon-overlay",
  //   name: "Add Overlay",
  //   desc: "Place one-third of a slide over another",
  //   action: "new-overlay",
  //   meta: "",
  //   unreleased: true,
  //   // type: slideTypes.text
  // },
]

export const slideLayoutTypes = {
  heading_sub: 'heading-and-subtitle',
  full_text: 'full-text',
  two_column: 'two-column',
  bible: 'bible',
  countdown: 'countdown',
  empty: 'empty',
}

export const backgroundTypes = {
  solid: 'solid',
  gradient: 'gradient',
  image: 'image',
  video: 'video'
}

export const backgroundFillTypes = {
  fit: 'Fit',
  stretch: 'Stretch',
  crop: 'Crop',
  cropTop: 'Crop (Top)',
  cropBottom: 'Crop (Bottom)',
  // center: 'Center',
}

export const lineSpacingTypes = {
  single: 'single',
  normal: 'normal', // default
  double: 'double',
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
  'NKJV',
  'NIV',
  'AMP',
  'NLT',
]

export const bibleVersionObjects: BibleVersion[] = [
  {
    id: "KJV",
    name: "King James Version",
    isDownloaded: false,
    copyrightContent:
      "Scripture taken from the King James Version. Public Domain",
  },
  {
    id: "ASV",
    name: "American Standard Version",
    isDownloaded: false,
    copyrightContent:
      "Scripture taken from the American Standard Version. Public Domain",
  },
  {
    id: "YLT",
    name: "Young's Literal Translation",
    isDownloaded: false,
    copyrightContent:
      "Scripture taken from the Young's Literal Translation. Public Domain",
  },
  {
    id: "WEB",
    name: "World English Bible",
    isDownloaded: false,
    copyrightContent:
      "Scripture taken from the World English Bible. Public Domain",
  },
  {
    id: "NKJV",
    name: "New King James Version",
    isDownloaded: false,
    copyrightContent:
      "Scripture taken from the New King James Version®. Copyright © 1982 by Thomas Nelson. All rights reserved.",
  },
  {
    id: "NIV",
    name: "New International Version",
    isDownloaded: false,
    copyrightContent:
      "Scriptures taken from the Holy Bible, New International Version®, NIV®. Copyright © 1973, 1978, 1984, 2011 by Biblica, Inc.™ All rights reserved worldwide.",
  },
  {
    id: "AMP",
    name: "Amplified Bible",
    isDownloaded: false,
    copyrightContent:
      "All Scripture quotations, unless otherwise indicated, are taken from the Amplified Bible, Copyright © 2015 by The Lockman Foundation.",
  },
  {
    id: "NLT",
    name: "New Living Translation",
    isDownloaded: false,
    copyrightContent:
      "Scripture quotations marked (NLT) are taken from the Holy Bible, New Living Translation, copyright ©1996, 2004, 2015 by Tyndale House Foundation.",
  },
  // { id: 'TPT', name: 'The Passion Translation', isDownloaded: false, copyrightContent: '' },
  // { id: 'GNT', name: 'Good News Translation', isDownloaded: false, copyrightContent: '' },
  {
    id: "CEV",
    name: "Contemporary English Version",
    isDownloaded: false,
    copyrightContent:
      "Scripture quotations marked (CEV) are from the Contemporary English Version Copyright © 1991, 1992, 1995 by American Bible Society.",
  },
  {
    id: "MSG",
    name: "The Message",
    isDownloaded: false,
    copyrightContent:
      "Scripture taken from THE MESSAGE. Copyright © 1993, 1994, 1995, 1996, 2000, 2001, 2002.",
  },
  {
    id: "NASB",
    name: "New American Standard Bible",
    isDownloaded: false,
    copyrightContent:
      "Scripture quotations taken from the (NASB®) New American Standard Bible®, Copyright © 1960, 1971 by The Lockman Foundation",
  },
  {
    id: "TPT",
    name: "The Passion Translation",
    isDownloaded: false,
    copyrightContent:
      "Scripture quotations marked TPT are from The Passion Translation®. Copyright © 2017, 2018, 2020 by Passion & Fire Ministries, Inc.",
  },
]

export const appFonts = [
  'Inter',
  'Roboto',
  'Raleway',
  'Bebas Neue',
  'Overpass',
  'Jost',
  'Playfair Display',
  'Sedan',
  'Montserrat',
  'Jersey 25',
  'Nunito',
  'IBM Plex Sans',
  'EB Garamond',
  'Dancing Script',
  'Slabo',
  'IBM Plex Serif',
  'Great Vibes',
  'Playball',
  'Saira Extra Condensed',
  'Lato'
]

export const churchesArr = [
  "Other Church (not included)",
  "Redeemed Christian Church of God (RCCG)",
  "Living Faith Church Worldwide (Winners' Chapel)",
  "Deeper Christian Life Ministry (DCLM)",
  "Christ Embassy (CE)",
  "Mountain of Fire and Miracles Ministries (MFM)",
  "Catholic Church",
  "Anglican Church",
  "House on the Rock (HOTR)",
  "Daystar Christian Centre (DCC)",
  "The Apostolic Church (TAC)",
  "The Salvation Army Nigeria",
  "Mountain of Salvation Prayer Ministry",
  "Christ Apostolic Church (CAC)",
  "Methodist Church",
  "Presbyterian Church",
  "The Church of Jesus Christ of Latter-day Saints",
  "Christian Reformed Church",
  "The Foursquare Gospel Church (FGC)",
  "Cherubim and Seraphim Movement Church",
  "Celestial Church of Christ",
  "Mountain of Glory Ministry",
  "Christ Apostolic Church (Worldwide)",
  "The Lord's Chosen Charismatic Revival Movement",
  "Salvation Ministries",
  "Global Impact Church",
  "The Fountain of Life Church",
  "Assemblies of God (AG)",
  "Harvesters International Christian Centre",
  "Household of God Church",
  "The Word Bible Church",
  "Omega Fire Ministries",
  "Gloryland Church",
  "United Methodist Church",
  "Rivers of Living Waters Ministries",
  "Grace Family International Church",
  "Commonwealth of Zion Assembly (COZA)",
  "Christian Pentecostal Mission (CPM)",
  "Faith Tabernacle Church",
  "Rhema Chapel International Churches",
  "Jesus Embassy International",
  "Dominion City Church",
  "House of Grace",
  "Liberty Christian Centre",
  "The Redeemed Evangelical Mission (TREM)",
  "Royal House of Grace",
  "Lighthouse Chapel International",
  "Jesus Dominion International",
  "Green Pastures Christian Centre",
  "Holy Ghost Christian Centre",
  "Salem International Christian Centre",
  "Christ LivingSpring Apostolic Ministry (CLAM)",
  "Faithway Baptist Church",
  "Full Gospel Business Men's Fellowship International (FGBMFI)",
  "Restoration Chapel International",
  "Word of Life Bible Church",
  "Fountain of Wisdom Ministries",
  "Shepherd's House Assembly International",
  "Trinity Church",
  "The Elevation Church",
  "Christ Power and Authority Church",
  "Lifehouse Pentecostal Assembly",
  "Faith Clinic International Church",
  "Jesus Sanctuary Evangelical Church",
  "Word of Faith Christian Centre",
  "The New Covenant Church",
  "Kingdom Life Gospel Outreach Church",
  "The New Testament Assembly",
  "Kingdom Embassy International Church",
  "Faith City Church",
  "All Nations Baptist Church",
  "Fountain of Mercy Christian Church",
  "Grace Covenant Assembly",
  "The Apostolic Faith Church",
  "St. Andrews Anglican Church",
  "St. Joseph Catholic Church",
  "Covenant Cathedral International Church",
  "Word of Life Bible Church",
  "Latter Rain Assembly",
  "Celebration Church International (CCI)",
  "Praise Chapel International (PCI)",
  "Christ International Church (CIC)",
  "Grace Family Chapel International",
  "Royal Connections Assembly",
  "New Wine Church",
  "Glorious Light International Church",
  "House of Praise International Church",
  "Redemption Tabernacle Christian Centre",
  "Global Harvest Church",
  "Dunamis International Gospel Centre",
  "Believers Loveworld",
  "Pentecostal Fellowship of Nigeria (PFN)",
  "Life Foundation Church",
]
