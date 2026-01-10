export default function useScreenShare(streamRef, setSharing) {
  let originalTrack = null;

  async function startScreenShare() {
    if (!streamRef?.current) return;

    const screenStream =
      await navigator.mediaDevices.getDisplayMedia({ video: true });

    const screenTrack = screenStream.getVideoTracks()[0];
    originalTrack = streamRef.current.getVideoTracks()[0];

    streamRef.current.removeTrack(originalTrack);
    streamRef.current.addTrack(screenTrack);

    setSharing(true);

    screenTrack.onended = stopScreenShare;
  }

  function stopScreenShare() {
    if (!streamRef?.current || !originalTrack) return;

    streamRef.current.getVideoTracks().forEach((t) => t.stop());
    streamRef.current.addTrack(originalTrack);

    setSharing(false);
  }

  return { startScreenShare, stopScreenShare };
}
