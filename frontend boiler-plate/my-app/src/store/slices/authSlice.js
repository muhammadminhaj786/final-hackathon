import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseUrl } from "../../config";

const initialState = {
    loading: false,
    error: null,
    data: {}
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginAction.pending, (state, action) => {
          console.log("pending");
          state.loading = true;
        });
        builder.addCase(loginAction.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          state.data = action.payload.data;
        });
        builder.addCase(loginAction.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload.message;
          state.data = {};
          console.log("rejected",action.payload.message);
        });
      },
})

export const loginAction = createAsyncThunk(
    "auth/login",
    async ({values,navigate}, { rejectWithValue }) => {
      const response = await axios.post(
        `${BaseUrl}/api/login`,
        values
      );
  
      if (response.data.status) {
        if(response.data.status==true){
          console.log('successfuly login')
          console.log(response.data)
  
          localStorage.setItem("accessToken",response.data.token)
          localStorage.setItem("userType",response.data.data.user_type)
          localStorage.setItem("ID",response.data.data._id)
          window.location.reload()
      }else{
          alert(response.message)
          return rejectWithValue(response.data)
      }
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    }
  );

  
  export default authSlice.reducer;