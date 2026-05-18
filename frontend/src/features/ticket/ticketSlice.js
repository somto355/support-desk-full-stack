import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ticketService from './ticketService'

// Initial state
const initialState = {
  tickets: [],
  ticket: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new ticket
export const createTicket = createAsyncThunk(
  'tickets/create',
  async (ticketData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await ticketService.createTicket(ticketData, token)
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user tickets
export const getTickets = createAsyncThunk(
  'tickets/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await ticketService.getTickets(token)
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get single ticket
export const getTicket = createAsyncThunk(
  'tickets/get',
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await ticketService.getTicket(ticketId, token)
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Close ticket
export const closeTicket = createAsyncThunk(
  'tickets/close',
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await ticketService.closeTicket(ticketId, token)
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Slice
export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder

      // CREATE TICKET
      .addCase(createTicket.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.tickets.push(action.payload)
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      // GET ALL TICKETS
      .addCase(getTickets.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.tickets = action.payload
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      // GET SINGLE TICKET
      .addCase(getTicket.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTicket.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.ticket = action.payload
      })
      .addCase(getTicket.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      // CLOSE TICKET
      .addCase(closeTicket.pending, (state) => {
        state.isLoading = true
      })
      .addCase(closeTicket.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true

        state.tickets = state.tickets.map((ticket) => {
          if (ticket._id === action.payload._id) {
            return { ...ticket, status: 'closed' }
          }
          return ticket
        })
      })
      .addCase(closeTicket.rejected, (state, action) => {
        state.isLoading = false
        state.isError
        = true
        state.message = action.payload
      })
  },
})

export const { reset } = ticketSlice.actions
export default ticketSlice.reducer