import SwiftUI
import AVFoundation

@main
struct DepthApp: App {
    init() {
        UIApplication.shared.isIdleTimerDisabled = true
        UIScreen.main.brightness = 1.0
    }

    var body: some Scene {
        WindowGroup {
            ContentView()
                .preferredColorScheme(.dark)
                .statusBarHidden(true)
        }
    }
}
