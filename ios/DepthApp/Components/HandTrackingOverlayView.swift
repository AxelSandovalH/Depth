import SwiftUI

struct HandTrackingOverlayView: View {
    let gesture: GestureStep.GestureKind
    let isCalibrating: Bool
    let confidence: Double

    @State private var scanLineY: CGFloat = 0
    @State private var pulse = false

    var accentColor: Color { confidence > 80 ? .green : .depthCyan }

    var body: some View {
        GeometryReader { geo in
            let w = min(geo.size.width * 0.55, 240.0)
            let h = w * 1.35

            ZStack {
                // Scanning frame
                RoundedRectangle(cornerRadius: 20, style: .continuous)
                    .stroke(accentColor.opacity(0.35), lineWidth: 1)
                    .frame(width: w, height: h)
                    .overlay(cornerMarkers(w: w, h: h))

                // Scan line
                if isCalibrating {
                    Rectangle()
                        .fill(
                            LinearGradient(
                                colors: [.clear, accentColor.opacity(0.6), .clear],
                                startPoint: .leading,
                                endPoint: .trailing
                            )
                        )
                        .frame(width: w - 16, height: 1)
                        .offset(y: scanLineY - h / 2)
                        .frame(width: w, height: h, alignment: .top)
                        .clipShape(RoundedRectangle(cornerRadius: 20, style: .continuous))
                }

                // Hand SVG outline
                handShape(gesture: gesture, color: accentColor)
                    .frame(width: w * 0.65, height: h * 0.65)

                // Confidence badge
                if isCalibrating {
                    Text(String(format: "%.0f%% DETECTED", confidence))
                        .font(.depthMono(10))
                        .foregroundColor(accentColor)
                        .padding(.horizontal, 12)
                        .padding(.vertical, 5)
                        .glassCapsule()
                        .offset(y: h / 2 + 20)
                }
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            .onAppear { startScanAnimation(h: h) }
            .onChange(of: isCalibrating) { _, new in
                if new { startScanAnimation(h: h) }
            }
        }
        .allowsHitTesting(false)
    }

    // MARK: - Corner markers

    private func cornerMarkers(w: CGFloat, h: CGFloat) -> some View {
        let len: CGFloat = 16
        return ZStack {
            // TL
            Path { p in p.move(to: CGPoint(x: -w/2, y: -h/2 + len)); p.addLine(to: CGPoint(x: -w/2, y: -h/2)); p.addLine(to: CGPoint(x: -w/2 + len, y: -h/2)) }
                .stroke(accentColor.opacity(0.7), lineWidth: 2)
            // TR
            Path { p in p.move(to: CGPoint(x: w/2 - len, y: -h/2)); p.addLine(to: CGPoint(x: w/2, y: -h/2)); p.addLine(to: CGPoint(x: w/2, y: -h/2 + len)) }
                .stroke(accentColor.opacity(0.7), lineWidth: 2)
            // BL
            Path { p in p.move(to: CGPoint(x: -w/2, y: h/2 - len)); p.addLine(to: CGPoint(x: -w/2, y: h/2)); p.addLine(to: CGPoint(x: -w/2 + len, y: h/2)) }
                .stroke(accentColor.opacity(0.7), lineWidth: 2)
            // BR
            Path { p in p.move(to: CGPoint(x: w/2 - len, y: h/2 - len)); p.addLine(to: CGPoint(x: w/2, y: h/2)); p.addLine(to: CGPoint(x: w/2 - len, y: h/2)) }
                .stroke(accentColor.opacity(0.7), lineWidth: 2)
        }
    }

    // MARK: - Hand shape

    @ViewBuilder
    private func handShape(gesture: GestureStep.GestureKind, color: Color) -> some View {
        let opacity = isCalibrating ? 0.8 : 0.4

        switch gesture {
        case .openHand:
            Canvas { ctx, size in
                let s = size
                ctx.stroke(
                    openHandPath(in: s),
                    with: .color(color.opacity(opacity)),
                    style: StrokeStyle(lineWidth: 1, dash: [4, 2])
                )
            }
        case .fist:
            Canvas { ctx, size in
                ctx.stroke(
                    fistPath(in: size),
                    with: .color(color.opacity(opacity)),
                    style: StrokeStyle(lineWidth: 1, dash: [4, 2])
                )
            }
        case .ok:
            Canvas { ctx, size in
                ctx.stroke(
                    okPath(in: size),
                    with: .color(color.opacity(opacity)),
                    style: StrokeStyle(lineWidth: 1, dash: [4, 2])
                )
            }
        }
    }

    private func openHandPath(in s: CGSize) -> Path {
        Path { p in
            let cx = s.width / 2
            // Palm
            p.addEllipse(in: CGRect(x: cx - s.width*0.28, y: s.height*0.53, width: s.width*0.56, height: s.height*0.39))
            // Fingers
            p.move(to: CGPoint(x: cx, y: s.height*0.53));          p.addLine(to: CGPoint(x: cx, y: s.height*0.10))
            p.move(to: CGPoint(x: cx - s.width*0.15, y: s.height*0.48)); p.addLine(to: CGPoint(x: cx - s.width*0.25, y: s.height*0.14))
            p.move(to: CGPoint(x: cx + s.width*0.15, y: s.height*0.48)); p.addLine(to: CGPoint(x: cx + s.width*0.25, y: s.height*0.14))
            p.move(to: CGPoint(x: cx - s.width*0.28, y: s.height*0.60)); p.addLine(to: CGPoint(x: cx - s.width*0.46, y: s.height*0.30))
            p.move(to: CGPoint(x: cx + s.width*0.28, y: s.height*0.60)); p.addLine(to: CGPoint(x: cx + s.width*0.46, y: s.height*0.30))
        }
    }

    private func fistPath(in s: CGSize) -> Path {
        Path { p in
            let cx = s.width / 2
            p.addEllipse(in: CGRect(x: cx - s.width*0.32, y: s.height*0.22, width: s.width*0.64, height: s.height*0.56))
            p.move(to: CGPoint(x: cx - s.width*0.32, y: s.height*0.40))
            p.addQuadCurve(to: CGPoint(x: cx - s.width*0.35, y: s.height*0.24),
                           control: CGPoint(x: cx - s.width*0.46, y: s.height*0.30))
        }
    }

    private func okPath(in s: CGSize) -> Path {
        Path { p in
            let cx = s.width / 2
            // Palm
            p.addEllipse(in: CGRect(x: cx - s.width*0.25, y: s.height*0.57, width: s.width*0.50, height: s.height*0.34))
            // OK circle (thumb + index pinch)
            p.addEllipse(in: CGRect(x: cx - s.width*0.30, y: s.height*0.22, width: s.width*0.28, height: s.height*0.22))
            // Extended fingers
            p.move(to: CGPoint(x: cx + s.width*0.05, y: s.height*0.50)); p.addLine(to: CGPoint(x: cx + s.width*0.10, y: s.height*0.10))
            p.move(to: CGPoint(x: cx + s.width*0.18, y: s.height*0.52)); p.addLine(to: CGPoint(x: cx + s.width*0.30, y: s.height*0.14))
            p.move(to: CGPoint(x: cx + s.width*0.28, y: s.height*0.58)); p.addLine(to: CGPoint(x: cx + s.width*0.46, y: s.height*0.26))
        }
    }

    // MARK: - Scan animation

    private func startScanAnimation(h: CGFloat) {
        guard isCalibrating else { return }
        withAnimation(.linear(duration: 1.6).repeatForever(autoreverses: false)) {
            scanLineY = h
        }
    }
}
