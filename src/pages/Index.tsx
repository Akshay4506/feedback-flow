import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, List } from "lucide-react";
import FeedbackForm from "@/components/FeedbackForm";
import FeedbackList from "@/components/FeedbackList";

const Index = () => {
  const [activeTab, setActiveTab] = useState("submit");

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <header className="py-16 px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent animate-fade-in">
          Feedback System
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up">
          Share your thoughts and help us improve. Your feedback matters!
        </p>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-16">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 shadow-elegant">
            <TabsTrigger value="submit" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Submit Feedback
            </TabsTrigger>
            <TabsTrigger value="view" className="flex items-center gap-2">
              <List className="w-4 h-4" />
              View All
            </TabsTrigger>
          </TabsList>

          <TabsContent value="submit" className="flex justify-center animate-fade-in">
            <FeedbackForm />
          </TabsContent>

          <TabsContent value="view" className="flex justify-center animate-fade-in">
            <FeedbackList />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-sm text-muted-foreground border-t">
        <p>Powered by Lovable Cloud • Built with React & Supabase</p>
      </footer>
    </div>
  );
};

export default Index;
