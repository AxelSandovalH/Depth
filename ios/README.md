# Depth — SwiftUI iOS App

## Setup en Xcode

### 1. Crear el proyecto en Xcode

1. Abrir Xcode → **Create New Project**
2. Seleccionar **iOS → App**
3. Configurar:
   - **Product Name:** DepthApp
   - **Bundle Identifier:** com.depth.app
   - **Interface:** SwiftUI
   - **Language:** Swift
4. Guardar en cualquier carpeta temporal

### 2. Agregar los archivos Swift

1. En el Project Navigator (izquierda), click derecho en la carpeta `DepthApp`
2. **Add Files to "DepthApp"...**
3. Navegar a la carpeta `ios/DepthApp/` del repo
4. Seleccionar todas las carpetas y archivos:
   - `DepthApp.swift`
   - `ContentView.swift`
   - `Theme/`
   - `Models/`
   - `Managers/`
   - `Views/`
   - `Components/`
5. Asegurarse de que **"Copy items if needed"** esté marcado
6. Hacer click en **Add**
7. **Eliminar** el `ContentView.swift` original que Xcode crea automáticamente

### 3. Configurar Info.plist

Agregar estas claves al `Info.plist` (o en Target → Info):

```
NSCameraUsageDescription        → "DEPTH needs camera access for underwater recording"
NSMicrophoneUsageDescription    → "DEPTH needs microphone access to record audio"
NSPhotoLibraryAddUsageDescription → "DEPTH saves your dive recordings to Photos"
```

### 4. Configurar el Target

En **Target → General:**
- Minimum iOS version: **17.0**
- Device: **iPhone** only

En **Target → Signing & Capabilities:**
- Agregar tu Apple Developer account
- Bundle ID: `com.depth.app` (o el que prefieras)

### 5. Build & Run

- Conectar iPhone
- Seleccionar el device en el toolbar de Xcode
- `Cmd + R` para compilar y ejecutar

---

## Estructura del proyecto

```
DepthApp/
├── DepthApp.swift              → Entry point (keep awake + brightness)
├── ContentView.swift           → Navigation coordinator
│
├── Theme/
│   └── DepthTheme.swift        → Colores, glassmorphism, fonts
│
├── Models/
│   └── Models.swift            → Dive, SystemCheck, GestureStep
│
├── Managers/
│   ├── CameraManager.swift     → AVFoundation (capture + recording)
│   └── GestureManager.swift    → Vision Framework (gesture detection)
│
├── Components/
│   ├── CameraPreviewView.swift     → Live camera UIViewRepresentable
│   ├── UnderwaterParticlesView.swift → Ambient particle animation
│   ├── HandTrackingOverlayView.swift → Scanning frame + hand skeleton
│   └── GestureFeedbackView.swift    → Gesture detected overlay
│
└── Views/
    ├── HomeView.swift           → Landing screen
    ├── PreparationView.swift    → Pre-dive checklist
    ├── CalibrationView.swift    → Gesture training flow
    ├── RecordingView.swift      → Core recording screen
    ├── GalleryView.swift        → Dive recordings grid
    └── VideoPreviewView.swift   → Playback + export
```

## Paleta de colores

| Token | Hex |
|---|---|
| Background | `#040B14` |
| Cyan accent | `#4FD1FF` |
| Green ready | `#34D399` |
| Amber locked | `#FBBF24` |
| Red recording | `red` |

## Features implementadas

- [x] Navegación completa entre pantallas
- [x] Camera preview (AVFoundation)
- [x] Grabación de video a Photos
- [x] Keep screen awake (`isIdleTimerDisabled`)
- [x] Brightness locked a máximo
- [x] Sistema de checks pre-dive animados
- [x] Calibración de gestos (flujo de 3 pasos)
- [x] Gesture recognition con Vision Framework
- [x] Timer de grabación en vivo
- [x] Control de linterna
- [x] Lock de controles
- [x] Galería con thumbnails
- [x] Reproductor de video con scrubber
- [x] Panel de exportación (Save to Photos, AirDrop, Share)
- [x] Partículas underwater animadas
- [x] Glassmorphism UI

## Próximos pasos

- [ ] Conectar GestureManager al live video feed
- [ ] Hold-to-confirm gesture (2s hold antes de activar)
- [ ] Thumbnails reales de los videos grabados
- [ ] Settings screen
- [ ] Onboarding flow
