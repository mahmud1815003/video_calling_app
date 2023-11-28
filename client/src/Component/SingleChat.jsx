import React, { useEffect } from "react";
import {
  Avatar,
  Box,
  ListItemButton,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useAddFriendMutation, useSingleFriendMutation } from "../redux/api/auth";
import { grey } from "@mui/material/colors";

const SingleChat = ({fr}) => {
    const {email} = useSelector(state => state.auth);
    const friendEmail = fr['friend1'] == email ? fr['friend2'] : fr['friend1'];
    const [singleFriend,{data, isLoading, isSuccess, error}] = useSingleFriendMutation();
    useEffect(() => {
      singleFriend({
        email: friendEmail,
      })
    }, []);
  return (
    <ListItemButton>
      {data && <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          borderBottom: 1,
          width: "100%",
          pb: 2,
        }}
      >
        <Avatar alt={`${data.name}`} src="broken.png" variant="circular" />
        <Box>
          <Typography>{data.name}</Typography>
          <Typography sx={{ fontSize: "10px", color: grey[500] }}>{data.email}</Typography>
        </Box>
      </Box>}
    </ListItemButton>
  );
};

export default SingleChat;
