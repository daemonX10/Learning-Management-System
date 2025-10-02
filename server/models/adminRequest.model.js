import mongoose from 'mongoose';

const adminRequestSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    reason: {
        type: String,
        required: [true, 'Reason for admin access is required'],
        minLength: [10, 'Reason must be at least 10 characters'],
        maxLength: [500, 'Reason cannot exceed 500 characters']
    },
    experience: {
        type: String,
        required: [true, 'Experience details are required'],
        minLength: [10, 'Experience must be at least 10 characters'],
        maxLength: [1000, 'Experience cannot exceed 1000 characters']
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    reviewedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reviewedAt: {
        type: Date
    },
    reviewNotes: {
        type: String,
        maxLength: [500, 'Review notes cannot exceed 500 characters']
    }
}, {
    timestamps: true
});

// Prevent duplicate requests from the same user
adminRequestSchema.index({ user: 1 }, { 
    unique: true,
    partialFilterExpression: { status: 'pending' }
});

export default mongoose.model('AdminRequest', adminRequestSchema);