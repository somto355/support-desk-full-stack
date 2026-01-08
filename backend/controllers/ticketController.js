const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

// @desc        Get user tickets
// @route       GET /api/tickets
// @access      Private
const getTickets = asyncHandler(async(req, res) =>{
        // Get user using the id in the JWT

    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    const tickets = await Ticket.find({user: req.user.id})

    res.status(200).json(tickets)
})

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

// @desc        Get user tickets
// @route       GET /api/tickets
// @access      Private
const Tickets = asyncHandler(async(req, res) =>{
        // Get user using the id in the JWT

    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    const tickets = await Ticket.find({user: req.user.id})

    res.status(200).json(tickets)
})




const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

// @desc        Get user ticket
// @route       GET /api/tickets/:id
// @access      Private
const getTicket = asyncHandler(async(req, res) =>{
    // Get user using the id in the JWT

      const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.id)

    if(!ticket){
        res.status(404)
        throw new Error('Ticket not found')
    }

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('No Authorised')
    }
    res.status(200).json(ticket)
})
// @desc        Delite ticket
// @route       DELETE /api/tickets/:id
// @access      Private
const deleteTicket = asyncHandler(async(req, res) =>{
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.id)

    if(!ticket){
        res.status(404)
        throw new Error('Ticket not found')
    }

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('No Authorised')
    }

    await ticket.remove()

    res.status(200).json({success: true})
})



// @desc        Update ticket
// @route       PUT /api/tickets/:id
// @access      Private
const updateTicket = asyncHandler(async(req, res) =>{
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.id)

    if(!ticket){
        res.status(404)
        throw new Error('Ticket not found')
    }

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('No Authorised')
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json({success: true})
})



module.exports = {
    getTickets,
    getTicket,
    createTicket,
    updateTicket,
    deleteTicket
}

