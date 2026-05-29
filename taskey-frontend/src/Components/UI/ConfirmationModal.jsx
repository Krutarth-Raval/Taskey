import React from 'react';

function ConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    isDanger = false,
    isLoading = false
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-background/80 backdrop-blur-md transition-all duration-300">
            <div className="bg-card border-2 border-border p-6 md:p-8 rounded-3xl max-w-md w-full mx-4 shadow-2xl flex flex-col gap-6 relative select-none animate-in fade-in zoom-in-95 duration-200">
                {/* Warning Header */}
                <div className="flex flex-col items-center text-center gap-4">
                    <div className="flex flex-col gap-1">
                        <h3 className="font-heading text-xl md:text-2xl font-black uppercase tracking-tight text-text-primary">
                            {title}
                        </h3>
                    </div>
                </div>

                {/* Reassurance Message */}
                <div className="text-xs md:text-sm text-text-secondary leading-relaxed text-center">
                    {message}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 mt-2">
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className={`w-full py-3 rounded-xl font-bold text-xs md:text-sm tracking-wider uppercase transition-colors duration-300 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                            isDanger
                                ? 'bg-red-500 text-white hover:bg-red-600'
                                : 'bg-foreground text-background hover:scale-[1.02] active:scale-[0.98]'
                        }`}
                    >
                        {isLoading ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent"></div>
                        ) : confirmText}
                    </button>
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="w-full py-3 rounded-xl bg-transparent border border-border/60 hover:bg-border/20 text-text-primary font-bold text-xs md:text-sm tracking-wider uppercase transition-colors duration-300 disabled:opacity-50 cursor-pointer"
                    >
                        {cancelText}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationModal;
