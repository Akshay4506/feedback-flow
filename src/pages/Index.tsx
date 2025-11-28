import FeedbackForm from "@/components/FeedbackForm";
import FeedbackList from "@/components/FeedbackList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Feedback Portal
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Share your thoughts and see what others are saying
          </p>
        </div>

        <Tabs defaultValue="submit" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="submit">Submit Feedback</TabsTrigger>
            <TabsTrigger value="view">View Feedback</TabsTrigger>
          </TabsList>

          <TabsContent value="submit" className="flex justify-center">
            <FeedbackForm />
          </TabsContent>

          <TabsContent value="view" className="flex justify-center">
            <FeedbackList />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
