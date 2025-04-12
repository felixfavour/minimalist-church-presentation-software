fn main() {
  // Tell cargo to look for the NDI SDK in the standard installation location
  println!("cargo:rustc-link-search=native=/Library/NDI SDK for Apple/lib/macOS");
  
  // Link against the NDI library
  println!("cargo:rustc-link-lib=dylib=ndi");
  
  // Run the standard Tauri build process
  tauri_build::build()
}
