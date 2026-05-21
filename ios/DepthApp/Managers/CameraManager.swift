import AVFoundation
import SwiftUI

final class CameraManager: NSObject, ObservableObject {
    let session = AVCaptureSession()

    @Published var isRecording = false
    @Published var recordingTime: TimeInterval = 0

    /// Called on every video frame — wire this to GestureManager.process(sampleBuffer:)
    var onFrame: ((CMSampleBuffer) -> Void)?

    private var movieOutput: AVCaptureMovieFileOutput?
    private var frameOutput: AVCaptureVideoDataOutput?
    private let frameQueue = DispatchQueue(label: "depth.gesture.frames", qos: .userInteractive)
    private var timer: Timer?

    override init() {
        super.init()
        configure()
    }

    // MARK: - Session setup

    private func configure() {
        session.beginConfiguration()
        // 1080p allows both MovieFileOutput + VideoDataOutput on all supported iPhones
        session.sessionPreset = .hd1920x1080

        guard
            let device = AVCaptureDevice.default(.builtInWideAngleCamera, for: .video, position: .back),
            let videoInput = try? AVCaptureDeviceInput(device: device),
            session.canAddInput(videoInput)
        else { session.commitConfiguration(); return }

        session.addInput(videoInput)

        if let micDevice = AVCaptureDevice.default(for: .audio),
           let audioInput = try? AVCaptureDeviceInput(device: micDevice),
           session.canAddInput(audioInput) {
            session.addInput(audioInput)
        }

        // Movie recording output
        let movie = AVCaptureMovieFileOutput()
        if session.canAddOutput(movie) {
            session.addOutput(movie)
            self.movieOutput = movie
        }

        // Frame output for gesture recognition (discards late frames to stay real-time)
        let frame = AVCaptureVideoDataOutput()
        frame.videoSettings = [kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA]
        frame.alwaysDiscardsLateVideoFrames = true
        if session.canAddOutput(frame) {
            session.addOutput(frame)
            frame.setSampleBufferDelegate(self, queue: frameQueue)
            self.frameOutput = frame
        }

        session.commitConfiguration()
    }

    func startSession() {
        guard !session.isRunning else { return }
        DispatchQueue.global(qos: .userInitiated).async { [weak self] in
            self?.session.startRunning()
        }
    }

    func stopSession() {
        guard session.isRunning else { return }
        session.stopRunning()
    }

    // MARK: - Recording

    func startRecording() {
        guard let output = movieOutput, !output.isRecording else { return }

        let fileName = "depth_\(Int(Date().timeIntervalSince1970)).mov"
        let url = FileManager.default.temporaryDirectory.appendingPathComponent(fileName)

        output.startRecording(to: url, recordingDelegate: self)

        DispatchQueue.main.async { [weak self] in
            self?.isRecording = true
            self?.recordingTime = 0
            self?.timer = Timer.scheduledTimer(withTimeInterval: 1, repeats: true) { [weak self] _ in
                self?.recordingTime += 1
            }
        }
    }

    func stopRecording() {
        movieOutput?.stopRecording()
        timer?.invalidate()
        timer = nil
        DispatchQueue.main.async { [weak self] in
            self?.isRecording = false
        }
    }

    // MARK: - Torch

    func setTorch(_ on: Bool) {
        guard let device = AVCaptureDevice.default(for: .video), device.hasTorch else { return }
        try? device.lockForConfiguration()
        device.torchMode = on ? .on : .off
        device.unlockForConfiguration()
    }
}

// MARK: - AVCaptureFileOutputRecordingDelegate

extension CameraManager: AVCaptureFileOutputRecordingDelegate {
    func fileOutput(_ output: AVCaptureFileOutput,
                    didFinishRecordingTo outputFileURL: URL,
                    from connections: [AVCaptureConnection],
                    error: Error?) {
        guard error == nil else { return }
        UISaveVideoAtPathToSavedPhotosAlbum(outputFileURL.path, nil, nil, nil)
    }
}

// MARK: - AVCaptureVideoDataOutputSampleBufferDelegate

extension CameraManager: AVCaptureVideoDataOutputSampleBufferDelegate {
    func captureOutput(_ output: AVCaptureOutput,
                       didOutput sampleBuffer: CMSampleBuffer,
                       from connection: AVCaptureConnection) {
        onFrame?(sampleBuffer)
    }
}
