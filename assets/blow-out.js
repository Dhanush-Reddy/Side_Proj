(function (window) {
    const BLOW_VOLUME_THRESHOLD = 0.15;
    const HOLD_DURATION_MS = 150;

    let audioContext;
    let meter;
    let mediaStreamSource;
    let microphoneStream;
    let monitorRaf;
    let callback;
    let active = false;
    let thresholdStart;

    function cleanup() {
        if (monitorRaf) {
            cancelAnimationFrame(monitorRaf);
            monitorRaf = null;
        }
        if (meter && typeof meter.shutdown === 'function') {
            meter.shutdown();
        }
        if (mediaStreamSource) {
            try {
                mediaStreamSource.disconnect();
            } catch (err) {
                // ignore disconnect errors
            }
        }
        if (microphoneStream) {
            microphoneStream.getTracks().forEach(function (track) {
                track.stop();
            });
        }

        meter = null;
        mediaStreamSource = null;
        microphoneStream = null;
        thresholdStart = null;
        active = false;
    }

    function handleBlowDetected() {
        cleanup();
        if (typeof callback === 'function') {
            callback();
            callback = null;
        }
    }

    function monitorVolume() {
        if (!active || !meter) {
            return;
        }

        if (meter.volume >= BLOW_VOLUME_THRESHOLD) {
            if (!thresholdStart) {
                thresholdStart = performance.now();
            } else if (performance.now() - thresholdStart >= HOLD_DURATION_MS) {
                handleBlowDetected();
                return;
            }
        } else {
            thresholdStart = null;
        }

        monitorRaf = requestAnimationFrame(monitorVolume);
    }

    function setupStream(stream) {
        microphoneStream = stream;
        mediaStreamSource = audioContext.createMediaStreamSource(stream);
        meter = createAudioMeter(audioContext);
        mediaStreamSource.connect(meter);
        active = true;
        monitorVolume();
    }

    function startCandleBlowListener(onBlow) {
        callback = onBlow;

        if (active) {
            return Promise.resolve();
        }

        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            return Promise.reject(new Error('Microphone access is not supported in this browser.'));
        }

        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!window.AudioContext) {
            return Promise.reject(new Error('Web Audio API is not available in this browser.'));
        }

        if (!audioContext) {
            audioContext = new AudioContext();
        }

        if (audioContext.state === 'suspended') {
            audioContext.resume().catch(function () {
                // resume can fail silently on some browsers
            });
        }

        const constraints = {
            audio: {
                echoCancellation: false,
                noiseSuppression: false,
                autoGainControl: false
            }
        };

        return navigator.mediaDevices.getUserMedia(constraints)
            .then(function (stream) {
                setupStream(stream);
            })
            .catch(function (error) {
                cleanup();
                throw error;
            });
    }

    function stopCandleBlowListener() {
        cleanup();
    }

    window.startCandleBlowListener = startCandleBlowListener;
    window.stopCandleBlowListener = stopCandleBlowListener;
})(window);
