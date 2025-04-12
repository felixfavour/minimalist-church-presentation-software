// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod ndi;

use std::sync::{Arc, Mutex};
use ndi::{NdiState, find_ndi_sources, start_ndi_output, stop_ndi_output, send_frame_to_ndi};

fn main() {
  let ndi_state = Arc::new(Mutex::new(NdiState::new()));

  tauri::Builder::default()
    .manage(ndi_state)
    .invoke_handler(tauri::generate_handler![
      find_ndi_sources,
      start_ndi_output,
      stop_ndi_output,
      send_frame_to_ndi
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
