import { useEffect, useRef, useState } from "react";
import { createPeerConnection } from "../services/webrtc.service";

export default function useWebRTC(socket, localStream) {
  const peers = useRef({});
  const [remoteStreams, setRemoteStreams] = useState([]);

  useEffect(() => {
    if (!socket || !localStream) return;

    socket.onmessage = async ({ data }) => {
      const msg = JSON.parse(data);

      if (msg.offer) {
        const pc = createPeerConnection(addRemoteStream);
        peers.current[msg.from] = pc;

        localStream.getTracks().forEach((t) =>
          pc.addTrack(t, localStream)
        );

        await pc.setRemoteDescription(msg.offer);
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);

        socket.send(JSON.stringify({ answer, to: msg.from }));
      }

      if (msg.answer) {
        await peers.current[msg.from].setRemoteDescription(msg.answer);
      }

      if (msg.ice) {
        peers.current[msg.from]?.addIceCandidate(msg.ice);
      }
    };
  }, [socket, localStream]);

  function addRemoteStream(stream) {
    setRemoteStreams((prev) => [...prev, stream]);
  }

  return { remoteStreams };
}
