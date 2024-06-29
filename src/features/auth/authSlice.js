import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail, 
  signOut 
} from 'firebase/auth';
import { auth } from '../../firebase';

const initialState = {
  user: null,
  status: 'idle',
  error: null,
};

export const signup = createAsyncThunk('auth/signup', async ({ email, password }) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return userCredential.user;
});

export const signin = createAsyncThunk('auth/signin', async ({ email, password }) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
});

export const resetPassword = createAsyncThunk('auth/resetPassword', async (email) => {
  await sendPasswordResetEmail(auth, email);
});

export const signout = createAsyncThunk('auth/signout', async () => {
  await signOut(auth);
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'succeeded';
      })
      .addCase(signup.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'succeeded';
      })
      .addCase(signin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(resetPassword.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(signout.fulfilled, (state) => {
        state.user = null;
        state.status = 'succeeded';
      })
      .addCase(signout.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signout.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
