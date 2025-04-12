use serde::{Deserialize, Serialize};
use tauri::{command, State};
use std::sync::{Arc, Mutex};
use std::thread;
use base64::{Engine as _, engine::general_purpose};
use image::{ImageBuffer, Rgba};
use lazy_static::lazy_static;

// NDI sender will be stored in a global static variable
lazy_static! {
    static ref NDI_SENDER: Mutex<Option<ndi::Sender>> = Mutex::new(None);
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct NdiSource {
    name: String,
    url_address: String,
}

pub struct NdiState {
    sources: Vec<NdiSource>,
    active_source: Option<String>,
    is_enabled: bool,
}

impl NdiState {
    pub fn new() -> Self {
        NdiState {
            sources: Vec::new(),
            active_source: None,
            is_enabled: false,
        }
    }
}

// Command to find NDI sources
#[command]
pub fn find_ndi_sources(ndi_state: State<'_, Arc<Mutex<NdiState>>>) -> Result<Vec<NdiSource>, String> {
    // Initialize NDI if not already done
    if let Err(e) = ndi::initialize() {
        return Err(format!("Failed to initialize NDI: {}", e));
    }
    
    // Find NDI sources
    let find_result = ndi::find_sources_wait(1000);
    match find_result {
        Ok(sources) => {
            let mut ndi_sources = Vec::new();
            for source in sources {
                ndi_sources.push(NdiSource {
                    name: source.name().to_string(),
                    url_address: source.address().unwrap_or_default().to_string(),
                });
            }
            
            // Update the state
            let mut state = ndi_state.lock().map_err(|_| "Failed to lock NDI state".to_string())?;
            state.sources = ndi_sources.clone();
            
            Ok(ndi_sources)
        },
        Err(e) => Err(format!("Failed to find NDI sources: {}", e)),
    }
}

// Command to start NDI output
#[command]
pub fn start_ndi_output(
    source_name: String,
    ndi_state: State<'_, Arc<Mutex<NdiState>>>
) -> Result<bool, String> {
    println!("Starting NDI output with name: {}", source_name);
    
    // Initialize NDI if not already done
    if let Err(e) = ndi::initialize() {
        return Err(format!("Failed to initialize NDI: {}", e));
    }
    
    // Create an NDI sender
    let sender_result = ndi::SenderBuilder::new()
        .ndi_name(&source_name)
        .build();
    
    match sender_result {
        Ok(sender) => {
            // Store the sender in our global variable
            let mut ndi_sender = NDI_SENDER.lock().map_err(|_| "Failed to lock NDI sender".to_string())?;
            *ndi_sender = Some(sender);
            
            // Update the state
            let mut state = ndi_state.lock().map_err(|_| "Failed to lock NDI state".to_string())?;
            state.active_source = Some(source_name);
            state.is_enabled = true;
            
            Ok(true)
        },
        Err(e) => Err(format!("Failed to create NDI sender: {}", e)),
    }
}

// Command to stop NDI output
#[command]
pub fn stop_ndi_output(ndi_state: State<'_, Arc<Mutex<NdiState>>>) -> Result<bool, String> {
    println!("Stopping NDI output");
    
    // Clear the NDI sender
    let mut ndi_sender = NDI_SENDER.lock().map_err(|_| "Failed to lock NDI sender".to_string())?;
    *ndi_sender = None;
    
    // Update the state
    let mut state = ndi_state.lock().map_err(|_| "Failed to lock NDI state".to_string())?;
    state.active_source = None;
    state.is_enabled = false;
    
    Ok(true)
}

// Command to send a frame to NDI
#[command]
pub fn send_frame_to_ndi(
    frame_data: String, // Base64 encoded image data
    ndi_state: State<'_, Arc<Mutex<NdiState>>>
) -> Result<bool, String> {
    // Check if NDI is enabled
    let state = ndi_state.lock().map_err(|_| "Failed to lock NDI state".to_string())?;
    if !state.is_enabled {
        return Ok(false);
    }
    
    // Process in a separate thread to avoid blocking the main thread
    thread::spawn(move || {
        // Remove the data URL prefix if present
        let base64_data = if frame_data.starts_with("data:image/") {
            let comma_index = frame_data.find(',').unwrap_or(0);
            if comma_index > 0 {
                &frame_data[comma_index + 1..]
            } else {
                &frame_data
            }
        } else {
            &frame_data
        };
        
        // Decode base64 data
        match general_purpose::STANDARD.decode(base64_data) {
            Ok(decoded) => {
                // Convert to image
                match image::load_from_memory(&decoded) {
                    Ok(img) => {
                        // Convert to RGBA
                        let rgba_img = img.to_rgba8();
                        let width = rgba_img.width() as i32;
                        let height = rgba_img.height() as i32;
                        
                        // Create NDI video frame
                        let mut video_frame = ndi::VideoFrame::new_rgba(width, height, &rgba_img);
                        
                        // Send the frame
                        let ndi_sender = NDI_SENDER.lock().unwrap();
                        if let Some(sender) = &*ndi_sender {
                            if let Err(e) = sender.send_video(&mut video_frame) {
                                eprintln!("Failed to send NDI video frame: {}", e);
                            } else {
                                println!("Sent NDI frame: {}x{}", width, height);
                            }
                        }
                    },
                    Err(e) => eprintln!("Failed to load image from memory: {}", e),
                }
            },
            Err(e) => eprintln!("Failed to decode base64 data: {}", e),
        }
    });
    
    Ok(true)
}
