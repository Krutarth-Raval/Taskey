import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import api from '../../api/axios';
import toast from 'react-hot-toast';

function CreateTask({ onTaskCreated }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);
        try {
            await api.post('/tasks', { title, description, status: 'pending', date: new Date().toISOString().split('T')[0] });
            toast.success("Task created successfully");
            setTitle('');
            setDescription('');
            if (onTaskCreated) {
                onTaskCreated();
            }
        } catch (error) {
            toast.error("Failed to create task");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="w-full mt-10 md:mt-16">
            <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-6">Create New Task</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 md:gap-8">
                <div>
                    <input
                        type="text"
                        placeholder="Task Title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-transparent border-b-2 border-border focus:border-foreground py-4 text-3xl md:text-5xl font-black transition-colors outline-none text-text-primary placeholder:text-border disabled:opacity-50"
                        required
                        disabled={isSubmitting}
                    />
                </div>
                <div>
                    <textarea
                        placeholder="What needs to be done?"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="2"
                        className="w-full bg-transparent border-b-2 border-border focus:border-foreground py-4 text-xl md:text-2xl transition-colors outline-none resize-none text-text-primary placeholder:text-border font-medium disabled:opacity-50"
                        required
                        disabled={isSubmitting}
                    ></textarea>
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-3 mt-4 text-foreground font-bold text-xl md:text-2xl hover:opacity-70 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity group w-fit"
                >
                    <div className="p-3 bg-foreground text-background rounded-full group-hover:rotate-90 transition-transform duration-300">
                        <Plus className="w-6 h-6 md:w-8 md:h-8" />
                    </div>
                    {isSubmitting ? 'Adding...' : 'Add Task'}
                </button>
            </form>
        </div>
    )
}

export default CreateTask;
