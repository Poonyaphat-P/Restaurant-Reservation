import { z } from "zod";

export const reservationSchema = z.object({
    f_name: z.string().min(1, 'Firstname is required'),
    l_name: z.string().min(1, 'Lastname is required'),
    phone: z.string().min(1, 'Phone is required'),
    description: z.string().optional(),
    email: z.string().email('Invalid email address'),
    partySize: z.coerce.number().int().positive('Must be at least 1'),
    reservationDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
    reservationTime: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format'),
    status: z.enum(['pending', 'confirmed', 'cancelled'])
})

export const formSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
    message: z.string().min(1, 'Message is required')
})

export const createMenuSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().optional(),
    price: z.coerce.number().positive('Price must be a positive number'),
    categoryID: z.string().min(1, 'Category ID is required'),
    is_recommended: z.string().optional()
})

export const updateMenuSchema = z.object({
    id: z.string().min(1, 'ID is required'),
    name: z.string().min(1, 'Name is required'),
    description: z.string().optional(),
    price: z.coerce.number().positive('Price must be a positive number'),
    categoryID: z.string().min(1, 'Category ID is required'),
    is_recommended: z.string().optional()
})

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required')
})
    
