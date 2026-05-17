import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

function MainLayout({ children, hideFooter = false }) {
    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Navbar />

            <main className="flex-1">
                {children}
            </main>

            {!hideFooter && <Footer />}
        </div>
    );
}

export default MainLayout;