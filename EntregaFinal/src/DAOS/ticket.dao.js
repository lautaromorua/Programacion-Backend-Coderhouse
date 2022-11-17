import { Ticket } from "../models/ticket.model.js";

const newTicket = async (ticket) => {
    const newDoc = await Ticket.create(ticket)
}

export const ticketDao = {
    newTicket
}