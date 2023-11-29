import { Avatar, Box, Button, darken } from "@mui/material";
import { orange } from "@mui/material/colors";
import React, { useEffect, useRef, useState } from "react";
import VideoChatIcon from "@mui/icons-material/VideoChat";
import { useDispatch } from "react-redux";
import { setVideoCall } from "../redux/slice/global";
import Peer from "simple-peer";
import io from "socket.io-client";

const socket = io.connect(import.meta.env.VITE_APP_API);

const ChatHero = () => {
  const dispatch = useDispatch();
  const [me, setMe] = useState("");
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((str) => {
        setStream(str);
        myVideo.current.srcObject = str;
      })
      .catch((error) => console.log(error));

    socket.connect();
    socket.on("me", (data) => {
      setMe(data);
    });

    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });
  }, []);

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: name,
      });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("answerCall", {
        signal: data,
        to: caller,
      });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    peer.signal(callerSignal);
    connectionRef.current = peer;
  };
  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destry();
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
      }}
    >
      <Box sx={{ fontSize: "80px" }}>
        <VideoChatIcon fontSize="inherit" />
      </Box>
      <Button
        sx={{
          bgcolor: orange[800],
          "&:hover": { backgroundColor: darken(orange[800], 0.3) },
          "&:disabled": { backgroundColor: darken(orange[800], 0.4) },
        }}
        // disabled
        variant="contained"
      >
        Start a Video Call
      </Button>
    </Box>
  );
};

export default ChatHero;
