import Foundation

// MARK: - Dive Recording

struct Dive: Identifiable, Hashable {
    let id: Int
    let location: String
    let date: String
    let duration: String
    let depth: Int
    let fileSize: String

    static let samples: [Dive] = [
        Dive(id: 1, location: "Coral Bay",   date: "May 18, 2026", duration: "04:32", depth: 12, fileSize: "1.2 GB"),
        Dive(id: 2, location: "Blue Hole",   date: "May 15, 2026", duration: "07:15", depth: 24, fileSize: "2.1 GB"),
        Dive(id: 3, location: "Reef Point",  date: "May 12, 2026", duration: "03:48", depth: 8,  fileSize: "890 MB"),
        Dive(id: 4, location: "Deep Wall",   date: "May 10, 2026", duration: "11:22", depth: 31, fileSize: "3.4 GB"),
        Dive(id: 5, location: "Turtle Cove", date: "May 8, 2026",  duration: "05:56", depth: 15, fileSize: "1.7 GB"),
        Dive(id: 6, location: "Manta Point", date: "May 5, 2026",  duration: "08:44", depth: 19, fileSize: "2.5 GB"),
    ]
}

// MARK: - Pre-dive System Check

struct SystemCheck: Identifiable {
    let id: String
    let label: String
    var value: String
    var status: CheckStatus

    enum CheckStatus {
        case checking, ready, warning
    }

    static func defaultChecks() -> [SystemCheck] {
        [
            SystemCheck(id: "battery",       label: "Battery",          value: "87%",         status: .checking),
            SystemCheck(id: "storage",       label: "Storage",          value: "64 GB free",  status: .checking),
            SystemCheck(id: "brightness",    label: "Brightness",       value: "Locked",      status: .checking),
            SystemCheck(id: "gesture",       label: "Gesture Tracking", value: "Active",      status: .checking),
            SystemCheck(id: "seal",          label: "Waterproof Seal",  value: "Confirmed",   status: .checking),
            SystemCheck(id: "temperature",   label: "Temperature",      value: "24°C",        status: .checking),
            SystemCheck(id: "stabilization", label: "Stabilization",    value: "Enabled",     status: .checking),
        ]
    }
}

// MARK: - Gesture Calibration Step

struct GestureStep: Identifiable {
    let id: Int
    let gesture: GestureKind
    let label: String
    let action: String
    let symbol: String

    enum GestureKind: String {
        case openHand = "open"
        case fist     = "fist"
        case ok       = "ok"
    }

    static let steps: [GestureStep] = [
        GestureStep(id: 0, gesture: .openHand, label: "Open Hand",   action: "Start Recording", symbol: "hand.raised"),
        GestureStep(id: 1, gesture: .fist,     label: "Closed Fist", action: "Stop Recording",  symbol: "hand.raised.fingers.spread"),
        GestureStep(id: 2, gesture: .ok,       label: "OK Gesture",  action: "Lock Controls",   symbol: "hand.thumbsup"),
    ]
}
